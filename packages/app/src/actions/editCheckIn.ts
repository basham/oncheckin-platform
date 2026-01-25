import { getProjection } from "@src/computed";

export async function editCheckIn(props) {
	const { clubId, eventId, personId, role } = props;
	const { checkInIndexes } = await getProjection(clubId);
	const checkInId = checkInIndexes.byEventId.get(eventId).get(personId);
	const checkIn = checkInIndexes.byCheckInId.get(checkInId);
	checkIn.checkin.$jazz.set("role", role);
	return checkIn;
}
