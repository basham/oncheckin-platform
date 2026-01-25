import { getProjection } from "@src/computed";
import { schemaVersion, Entity } from "@src/core";

export async function createCheckIn(props) {
	const { clubId, eventId, personId, role } = props;
	const event = await Entity.load(eventId);
	const person = await Entity.load(personId);
	if (!event.$isLoaded || !person.$isLoaded) {
		return;
	}
	const checkIn = Entity.create({
		meta: {
			schemaVersion,
		},
		link: {
			from: person,
			to: event,
		},
		checkin: {
			role,
		},
	});
	const { id: checkInId } = checkIn.$jazz;
	const projection = await getProjection(clubId);
	projection.root.entities.$jazz.set(checkInId, checkIn);
	return projection.eventsById.get(eventId);
}
