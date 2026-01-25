export function compute(source) {
	const { events } = source;
	const entries = events.map((e) => [e.id, e]);
	return new Map(entries);
}
