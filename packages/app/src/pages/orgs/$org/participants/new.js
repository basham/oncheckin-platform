import { Store } from "@src/computed/store.js";
import { schemaVersion, Entity } from "@src/core";

export async function get() {
	const h1 = "New hasher";
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const { root } = await Store(org.id);
	const formData = await request.formData();
	const name = formData.get("fullName");
	const nickname = formData.get("alias");
	const person = Entity.create({
		meta: {
			name,
			schemaVersion,
		},
		person: {
			nickname,
		},
	});
	root.entities.$jazz.set(person.$jazz.id, person);
	const redirect = `orgs/${root.$jazz.id}/participants/${person.$jazz.id}/`;
	return { redirect };
}
