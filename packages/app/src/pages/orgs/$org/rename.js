import { Store } from "@src/computed/store.js";

export async function get() {
	const h1 = "Rename organization";
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const { root } = await Store(org.id);
	const formData = await request.formData();
	const name = formData.get("name");
	root.meta.$jazz.set("name", name);
	const redirect = `${org.url}settings`;
	return { redirect };
}
