import { sortAsc } from "@src/util/collections.js";
import { encodeCheckInId } from "@src/util/ids.js";

export function compute(source) {
	const { checkInIndexes, checkInsById, eventsById } = source;
	const entries: any = [...eventsById.keys()].map((eid) => {
		const pidSet = checkInIndexes.byEventId.get(eid) || new Set();
		const pids = [...pidSet.values()]
			.map((pid) => encodeCheckInId(pid, eid))
			.map((id) => checkInsById.get(id))
			.sort(sortAsc((checkIn) => checkIn.participant.displayName));
		return [eid, pids];
	});
	return new Map(entries);
}
