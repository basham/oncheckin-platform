import { editCheckIn } from "@src/actions";
import { deleteCheckIn } from "@src/api.js";
import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org, event, participant } = data;
	const h1 = event.name;
	const h2 = "Edit check-in";
	const { checkInIndexes, checkInsById } = await getProjection(org.id);
	const id = checkInIndexes.byEventId.get(event.id).get(participant.id);
	const checkIn = checkInsById.get(id);
	const template = { h1, h2, checkIn };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const { id: eventId } = data.event;
	const { id: personId } = data.participant;
	const formData = await request.formData();
	const action = formData.get("action");
	if (action === "edit") {
		const role = formData.get("host") ? "organizer" : "participant";
		const props = { clubId, eventId, personId, role };
		await editCheckIn(props);
	}
	if (action === "delete") {
		const props = { clubId, eventId, personId };
		await deleteCheckIn(props);
	}
	const { url: redirect } = data.event;
	return { redirect };
}
