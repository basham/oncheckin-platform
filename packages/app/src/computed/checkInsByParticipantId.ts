import { isAfter, isBefore, parseISO, sub } from "date-fns";
import { sortAsc } from "@src/util/collections.js";
import { components } from "@src/api/components.js";

const INVALID_DATE = new Date(NaN);
const READY_FOR_NAME_COUNT = 6;
const RETURNERS_TIME_PERIOD = { months: 2 };

export function compute(source) {
	const { participants } = source;
	const entries = participants.map((p) => [
		p.id,
		getParticipantCheckIns(source, p),
	]);
	return new Map(entries);
}

function getParticipantCheckIns(source, participant) {
	const { checkInIndexes: indexes, eventsById } = source;
	const eventIds = indexes.byParticipantId.get(participant.id);

	if (!eventIds?.size) {
		return [];
	}

	let attendsCount = getInitAttendsCount(
		source,
		eventIds,
		eventsById,
		participant,
	);
	let organizesCount = getInitOrganizesCount(
		source,
		eventIds,
		eventsById,
		participant,
		indexes,
	);
	let lastEvent = null;

	return [...eventIds]
		.map((eid) => eventsById.get(eid))
		.sort(sortAsc(({ count }) => count))
		.map((event) => {
			const id = source.encodeId(participant.id, event.id);
			const entity = indexes.byCheckInId.get(id);
			const host = entity.has(components.organizes);
			attendsCount += 1;
			organizesCount += host ? 1 : 0;
			const runCount = attendsCount;
			const hostCount = organizesCount;
			const url = `${event.url}check-ins/${participant.id}/edit/`;
			const specialRunCount = isSpecial(runCount);
			const specialHostCount = host && isSpecial(hostCount);
			const readyForNaming =
				runCount >= READY_FOR_NAME_COUNT && !participant.alias;
			const returnersCutoffDate = sub(event.dateObj, RETURNERS_TIME_PERIOD);
			const specialLastEventDate = lastEvent
				? isBefore(lastEvent.dateObj, returnersCutoffDate)
				: false;
			const checkIn = {
				id,
				event,
				eventId: event.id,
				participant,
				participantId: participant.id,
				host,
				hostCount,
				url,
				readyForNaming,
				runCount,
				specialHostCount,
				specialRunCount,
				specialLastEventDate,
				lastEvent,
			};
			lastEvent = event;
			return checkIn;
		})
		.reverse();
}

function getInitAttendsCount(source, eventIds, eventsById, participant) {
	const entity = source.getEntity(participant.id, components.attends);
	if (!entity) {
		return 0;
	}
	const count = entity.get(components.count);
	const date = count.date ? parseISO(count.date) : INVALID_DATE;
	const countAfter = [...eventIds]
		.map((eid) => eventsById.get(eid))
		.filter(({ dateObj }) => isAfter(dateObj, date)).length;
	return count.value + countAfter - eventIds.size;
}

function getInitOrganizesCount(
	source,
	eventIds,
	eventsById,
	participant,
	indexes,
) {
	const entity = source.getEntity(participant.id, components.organizes);
	if (!entity) {
		return 0;
	}
	const organizes = [...eventIds].filter((eid) => {
		const checkInId = source.encodeId(participant.id, eid);
		return indexes.byCheckInId.get(checkInId).has(components.organizes);
	});
	const count = entity.get(components.count);
	const date = count.date ? parseISO(count.date) : INVALID_DATE;
	const countAfter = organizes
		.map((eid) => eventsById.get(eid))
		.filter(({ dateObj }) => isAfter(dateObj, date)).length;
	return count.value + countAfter - organizes.length;
}

function isSpecial(value) {
	return value > 0 && /(0|5|69)$/.test(value);
}
