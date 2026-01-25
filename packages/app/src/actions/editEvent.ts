import { getProjection } from "@src/computed";
import { Entity } from "@src/core";

export async function editEvent(props) {
	const { clubId, eventId, name, startsAt } = props;
	const entity = await Entity.load(eventId, {
		resolve: {
			meta: true,
			event: true,
		},
	});
	if (entity.$isLoaded) {
		entity.meta.$jazz.set("name", name);
		entity.event.$jazz.set("startsAt", startsAt);
	}
	const projection = await getProjection(clubId);
	return projection.eventsById.get(eventId);
}
