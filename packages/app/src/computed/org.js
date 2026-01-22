const DEFAULT_NAME = "(Organization)";
const PATH = "orgs";

export function compute(source) {
	const { root } = source;
	const { id } = root.$jazz;
	const { name = DEFAULT_NAME } = root.meta;
	const url = `/${PATH}/${id}/`;
	const openUrl = `${url}open/`;
	const inviteCode = self.btoa(JSON.stringify({ id, name }));
	const shareUrl = `${self.location.origin}/?join=${inviteCode}`;
	return {
		id,
		inviteCode,
		name,
		openUrl,
		shareUrl,
		url,
	};
}
