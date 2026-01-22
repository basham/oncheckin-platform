import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org, event } = data;
	const h1 = event.name;
	const { checkInsByEventId } = await getProjection(org.id);
	const checkIns = checkInsByEventId.get(event.id);
	const hares = checkIns.filter(({ host }) => host);
	const runners = checkIns.filter(({ host }) => !host);
	const template = { h1, hares, runners };
	return { template };
}
