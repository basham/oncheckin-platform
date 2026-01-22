import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org } = data;
	const { json } = await getProjection(org.id);
	return { json, download: true };
}
