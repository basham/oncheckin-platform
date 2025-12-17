import { createEvent } from "@src/api.js";
import { todayDate } from "@src/util.js";

export async function get() {
	const h1 = "New event";
	const date = todayDate();
	const template = { h1, date };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const formData = await request.formData();
	const name = formData.get("name");
	const date = formData.get("date");
	const { url: redirect } = await createEvent(org.id, { name, date });
	return { redirect };
}
