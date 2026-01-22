import { format, isAfter, parseISO } from "date-fns";
import { sortDesc } from "@src/util/collections.js";
import { components } from "@src/api/components.js";

const DEFAULT_NAME = "(Event)";
const INVALID_DATE = new Date(NaN);
const PATH = "events";

export function compute(source) {
	const { root } = source;
	const events = [...Object.values(root.entities)]
		.map((entity) => getEvent(source, entity))
		.filter((event) => event);
	const eventCount = getEventCount(source, events);
	return events.sort(sortDesc("dateObj")).map((event, i) => {
		const count = eventCount - i;
		return { ...event, count };
	});
}

function getEvent(source, entity) {
	const { org } = source;
	const { event } = entity;
	if (!event) {
		return;
	}
	const { startsAt: date } = event;
	if (!date) {
		return;
	}
	const { id } = entity.$jazz;
	const dateObj = parseISO(date);
	const displayDate = format(dateObj, "PP");
	const displayDateMedium = format(dateObj, "E, MMM d");
	const displayDateLong = format(dateObj, "E, PP");
	const year = format(dateObj, "y");
	const name = entity.meta.name.trim() || DEFAULT_NAME;
	const url = `${org.url}${PATH}/${id}/`;
	return {
		id,
		date,
		dateObj,
		displayDate,
		displayDateMedium,
		displayDateLong,
		name,
		url,
		year,
	};
}

function getEventCount(source, events) {
	return events.length;
	const entity = store.getEntity(components.org, components.event);
	if (!entity) {
		return events.length;
	}
	const count = entity.get(components.count);
	const date = count.date ? parseISO(count.date) : INVALID_DATE;
	const countAfter = events.filter(({ dateObj }) =>
		isAfter(dateObj, date),
	).length;
	return count.value + countAfter;
}
