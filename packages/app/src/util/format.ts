export function pluralize(count, singular, plural = `${singular}s`) {
	return count === 1 ? singular : plural;
}

export function todayDate() {
	const now = new Date();
	now.setHours(0, 0, 0);
	return now.toJSON().split("T")[0];
}
