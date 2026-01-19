import { Store } from "@src/api/computed/store.js";
import { schemaVersion, Entity } from "@src/api-jazz";
import { todayDate } from "@src/util.js";

export async function get() {
	const h1 = "New event";
	const date = todayDate();
	const template = { h1, date };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const { root } = await Store(org.id);
	const formData = await request.formData();
	const name = formData.get("name");
	const date = formData.get("date");
	const event = Entity.create({
		meta: {
			name,
			schemaVersion,
		},
		event: {
			startsAt: date,
		},
	});
	root.entities.$jazz.set(event.$jazz.id, event);
	const redirect = `orgs/${root.$jazz.id}/event/${event.$jazz.id}/`;
	return { redirect };
}
