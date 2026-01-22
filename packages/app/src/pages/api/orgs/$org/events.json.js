import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org } = data;
	const { events: json } = await getProjection(org.id);
	return { json };
}
