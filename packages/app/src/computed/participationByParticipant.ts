import { isAfter, subYears } from "date-fns";
import { getOrCreate } from "@src/util/collections.js";

const ATTENDS_INDEX = 0;
const ORGANIZES_INDEX = 1;

export function compute(source) {
	const { checkInsByEventId, events } = source;
	const oneYearAgo = subYears(new Date(), 1);
	const latestEvents = events.filter((event) =>
		isAfter(event.dateObj, oneYearAgo),
	);
	const latestCheckIns = latestEvents
		.map((event) => checkInsByEventId.get(event.id))
		.flat();
	return latestCheckIns.reduce((map, checkIn) => {
		const { host, participantId } = checkIn;
		const stats = getOrCreate(map, participantId, () => [0, 0]);
		const attendsCount = stats[ATTENDS_INDEX] + 1;
		const organizesCount = stats[ORGANIZES_INDEX] + (host ? 1 : 0);
		map.set(participantId, [attendsCount, organizesCount]);
		return map;
	}, new Map());
}
