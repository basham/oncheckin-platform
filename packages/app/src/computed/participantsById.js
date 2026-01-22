export function compute(source) {
	const { participants } = source;
	const entries = participants.map((p) => [p.id, p]);
	return new Map(entries);
}
