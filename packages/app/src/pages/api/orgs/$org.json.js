import { Store } from "@src/computed/store.js";

export async function get({ data }) {
	const { org } = data;
	const { json } = await Store(org.id);
	return { json, download: true };
}
