import { getProjection } from "@src/computed";
import { schemaVersion, Entity } from "@src/core";
import { todayDate } from "@src/util/format.js";

export async function get() {
	const h1 = "New event";
	const date = todayDate();
	const template = { h1, date };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const { root } = await getProjection(org.id);
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
