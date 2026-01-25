export function compute(source) {
	const { checkInsByParticipantId } = source;
	const entries: any = [...checkInsByParticipantId.values()]
		.flat()
		.map((checkIn) => [checkIn.id, checkIn]);
	return new Map(entries);
}
