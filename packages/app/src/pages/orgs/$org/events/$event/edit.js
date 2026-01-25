import { editEvent } from "@src/actions";

export async function get({ data }) {
	const { event } = data;
	const h1 = event.name;
	const h2 = "Edit event";
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const { id: eventId } = data.event;
	const formData = await request.formData();
	const name = formData.get("name");
	const startsAt = formData.get("date");
	const props = { clubId, eventId, name, startsAt };
	const { url: redirect } = await editEvent(props);
	return { redirect };
}
