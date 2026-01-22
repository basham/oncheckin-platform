export function compute(source) {
	const { checkInsByParticipantId } = source;
	const entries = [...checkInsByParticipantId.values()]
		.flat()
		.map((checkIn) => [checkIn.id, checkIn]);
	return new Map(entries);
}
