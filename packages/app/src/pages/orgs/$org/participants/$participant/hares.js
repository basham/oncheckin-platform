import { getProjection } from "@src/computed";
import { getOrCreate } from "@src/util/collections.js";

export async function get({ data }) {
	const { org, participant } = data;
	const h1 = participant.displayName;
	const { checkInsByParticipantId } = await getProjection(org.id);
	const checkIns = checkInsByParticipantId.get(participant.id);
	const checkInsByYearMap = checkIns
		.filter(({ host }) => host)
		.reduce((yearMap, checkIn) => {
			const { year } = checkIn.event;
			const values = getOrCreate(yearMap, year, () => []);
			yearMap.set(year, [...values, checkIn]);
			return yearMap;
		}, new Map());
	const checkInsByYear = [...checkInsByYearMap];
	const template = { h1, checkInsByYear };
	return { template };
}
