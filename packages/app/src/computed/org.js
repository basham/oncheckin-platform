import { components } from "@src/api/components.js";

const DEFAULT_NAME = "(Organization)";
const PATH = "orgs";

export function getOrgData(source) {
	const json = getJSON(source);
	const org = getOrg(source);
	const orgEvent = getOrgEvent(source);
	return {
		...source,
		json,
		org,
		orgEvent,
	};
}

function getJSON(source) {
	return source.root.toJSON();
}

function getOrg(source) {
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

function getOrgEvent(source) {
	const count = {
		date: "2025-01-01",
		value: 0
	}
	return { count };
	//return store.getEntity(components.org, components.event)?.value;
}
