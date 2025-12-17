import { setEvent } from "@src/api.js";

export async function get({ data }) {
	const { event } = data;
	const h1 = event.name;
	const h2 = "Edit event";
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { org, event } = data;
	const formData = await request.formData();
	const name = formData.get("name");
	const date = formData.get("date");
	const { url: redirect } = await setEvent(org.id, event.id, {
		name,
		date,
	});
	return { redirect };
}
