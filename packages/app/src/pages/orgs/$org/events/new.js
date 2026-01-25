import { createEvent } from "@src/actions";
import { todayDate } from "@src/util/format.js";

export async function get() {
	const h1 = "New event";
	const date = todayDate();
	const template = { h1, date };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const formData = await request.formData();
	const name = formData.get("name");
	const startsAt = formData.get("date");
	const { url: redirect } = await createEvent({ clubId, name, startsAt });
	return { redirect };
}
