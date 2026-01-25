import { getProjection } from "@src/computed";
import { schemaVersion, Entity } from "@src/core";

export async function createEvent(props) {
	const { clubId, name, startsAt } = props;
	const event = Entity.create({
		meta: {
			name,
			schemaVersion,
		},
		event: {
			startsAt,
		},
	});
	const { id: eventId } = event.$jazz;
	const projection = await getProjection(clubId);
	projection.root.entities.$jazz.set(eventId, event);
	return projection.eventsById.get(eventId);
}
