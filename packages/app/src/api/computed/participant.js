import { sortAsc } from "@src/util.js";
import { components } from "../components.js";

const DEFAULT_NAME = "(Participant)";

export function getParticipantData(source) {
	const participants = getParticipants(source);
	const participantsById = getParticipantsById(participants);
	return {
		...source,
		participants,
		participantsById,
	};
}

function getParticipants(source) {
	const { root } = source;
	return [...Object.values(root.entities)]
		.map((entity) => getParticipant(entity, source))
		.filter((participant) => participant)
		.sort(sortAsc("displayName"));
}

function getParticipant(entity, source) {
	const { org } = source;
	const { meta, person } = entity;
	if (!person) {
		return;
	}
	const { id } = entity.$jazz;
	const { location = "" } = person;
	const { description: notes } = meta;
	const { nickname: alias = "" } = person;
	const fullName = meta.name || DEFAULT_NAME;
	const displayName = alias || `Just ${fullName}`;
	const url = `${org.url}participants/${id}/`;
	/*
	const attendsCount = store
		.getEntity(id, components.attends)
		?.get(components.count);
	const organizesCount = store
		.getEntity(id, components.organizes)
		?.get(components.count);
	*/
	return {
		id,
		alias,
		displayName,
		fullName,
		location,
		notes,
		attendsCount: 0,
		organizesCount: 0,
		url,
	};
}

function getParticipantsById(participants) {
	const entries = participants.map((p) => [p.id, p]);
	return new Map(entries);
}
