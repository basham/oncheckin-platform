import { isFuture, isToday } from "date-fns";

export function compute(source) {
	const { events } = source;
	return events
		.filter(({ dateObj }) => isToday(dateObj) || isFuture(dateObj))
		.reverse();
}
