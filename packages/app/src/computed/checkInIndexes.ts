import { type Entity } from "@src/core";
import { getOrCreate } from "@src/util";

export function compute(source) {
	const { root } = source;
	const byCheckInId = new Map();
	const byEventId = new Map();
	const byParticipantId = new Map();

	for (const entity of [...Object.values(root.entities)] as Entity[]) {
		if (entity.$isLoaded && entity.link && entity.link.$isLoaded && entity.checkin) {
			const { id: checkInId } = entity.$jazz;
			const { id: personId } = entity.link.from.$jazz;
			const { id: eventId } = entity.link.to.$jazz;
			byCheckInId.set(checkInId, entity);
			getOrCreate(byEventId, eventId, () => new Map())
				.set(personId, checkInId);
			getOrCreate(byParticipantId, personId, () => new Map())
				.set(eventId, checkInId);
		}
	}

	return { byCheckInId, byEventId, byParticipantId };
}
