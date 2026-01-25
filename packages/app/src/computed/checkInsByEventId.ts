import { sortAsc } from "@src/util/collections.js";

export function compute(source) {
	const { checkInIndexes, checkInsById, eventsById } = source;
	const entries: any = [...eventsById.keys()].map((eventId) => {
		const idSet = checkInIndexes.byEventId.get(eventId) || new Set();
		const ids = [...idSet.values()]
			.map((id) => checkInsById.get(id))
			.sort(sortAsc((checkIn) => checkIn.participant.displayName));
		return [eventId, ids];
	});
	return new Map(entries);
}
