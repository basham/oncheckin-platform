import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org, event } = data;
	const h1 = event.name;
	const h2 = "Checkpoint";
	const { checkInsByEventId } = await getProjection(org.id);
	const checkIns = checkInsByEventId.get(event.id);
	const runners = checkIns.filter(({ host }) => !host);
	const template = { h1, h2, runners };
	return { template };
}
