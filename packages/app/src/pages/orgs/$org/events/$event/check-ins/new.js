import { createCheckIn, createPerson } from "@src/actions";
import { getProjection } from "@src/computed";

export async function get({ data }) {
	const { org, event } = data;
	const h1 = event.name;
	const h2 = "New check-in";
	const {
		participants: allParticipants,
		checkInsByEventId,
		checkInsByParticipantId,
	} = await getProjection(org.id);
	const checkIns = checkInsByEventId
		.get(event.id)
		.map((checkIn) => [checkIn.participant.id, checkIn]);
	const checkInsMap = new Map(checkIns);
	const participants = allParticipants.map((p) => {
		const checkIn = checkInsMap.get(p.id);
		const checkedIn = !!checkIn;
		const latestCheckIn = checkInsByParticipantId.get(p.id)[0];
		return {
			...p,
			checkIn,
			checkedIn,
			latestCheckIn,
		};
	});
	const template = { h1, h2, participants };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const { id: eventId } = data.event;
	const formData = await request.formData();
	const checkInType = formData.get("checkInType");
	let personId = formData.get("selectedParticipant");
	if (checkInType === "new-participant") {
		const name = formData.get("fullName");
		const nickname = formData.get("alias");
		const props = { clubId, name, nickname };
		const person = await createPerson(props);
		personId = person.id;
	}
	const organizer = formData.get("host");
	const role = organizer ? "organizer" : "participant";
	const props = { clubId, eventId, personId, role };
	const { url: redirect } = await createCheckIn(props);
	return { redirect };
}
