import { Store } from "@src/computed/store.js";

export async function get({ data }) {
	const { org } = data;
	const h1 = "Settings";
	const { orgEvent } = await Store(org.id);
	const template = { h1, orgEvent };
	return { template };
}
