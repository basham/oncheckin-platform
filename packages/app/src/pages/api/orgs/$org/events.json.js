import { Store } from "@src/computed/store.js";

export async function get({ data }) {
	const { org } = data;
	const { events: json } = await Store(org.id);
	return { json };
}
