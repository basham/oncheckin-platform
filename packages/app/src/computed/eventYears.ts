export function compute(source) {
	const { eventsByYear } = source;
	return [...eventsByYear.keys()].sort().reverse();
}
