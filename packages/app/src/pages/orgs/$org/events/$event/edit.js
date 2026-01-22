import { Entity } from "@src/core";

export async function get({ data }) {
	const { event } = data;
	const h1 = event.name;
	const h2 = "Edit event";
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { event } = data;
	const formData = await request.formData();
	const name = formData.get("name");
	const date = formData.get("date");
	const entity = await Entity.load(event.id, {
		resolve: {
			meta: true,
			event: true,
		}
	});
	entity.meta.$jazz.set("name", name);
	entity.event.$jazz.set("startsAt", date);
	const { url: redirect } = event;
	return { redirect };
}
