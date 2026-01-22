import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org } = data;
	const h1 = "Settings";
	const { orgEvent } = await getProjection(org.id);
	const template = { h1, orgEvent };
	return { template };
}
