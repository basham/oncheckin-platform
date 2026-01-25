import { deleteCoValues } from "jazz-tools";
import { getProjection } from "@src/computed";
import { Entity } from "@src/core";

export async function deleteCheckIn(props) {
	const { clubId, eventId, personId } = props;
	const { checkInIndexes } = await getProjection(clubId);
	const checkInId = checkInIndexes.byEventId.get(eventId).get(personId);
	await deleteCoValues(Entity, checkInId, {
		resolve: {
			meta: true,
			checkin: true,
			link: true,
		}
	});
	const { root } = await getProjection(clubId);
	root.entities.$jazz.delete(checkInId);
}
