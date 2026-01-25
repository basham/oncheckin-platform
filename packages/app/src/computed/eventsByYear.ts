import { getOrCreate } from "@src/util/collections.js";

export function compute(source) {
	const { events } = source;
	return events.reduce((map, event) => {
		const { year } = event;
		const yearEvents = getOrCreate(map, year, () => []);
		yearEvents.unshift(event);
		return map;
	}, new Map());
}
