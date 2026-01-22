export function compute(source) {
	const { root } = source;
	const byCheckInId = new Map();
	const byEventId = new Map();
	const byParticipantId = new Map();

	for (const entity of [...Object.values(root.entities)]) {
		/*
		if (entity.has(components.rel) && entity.has(components.attends)) {
			const { source: pid, target: eid } = entity.get(components.rel);
			byCheckInId.set(entity.id, entity);
			getOrCreate(byEventId, eid, () => new Set()).add(pid);
			getOrCreate(byParticipantId, pid, () => new Set()).add(eid);
		}
		*/
	}

	return { byCheckInId, byEventId, byParticipantId };
}
