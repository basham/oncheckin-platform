import { getOrCreate, setMapFromObject } from "@src/util.js";
import { components } from "./components.js";
import { loadStore } from "./entity.js";
import { createYMap } from "./store.js";

export async function createCheckIn(orgId, participantId, eventId, values) {
	const store = await loadStore(orgId);
	store.createEntity(participantId, eventId);
	return await setCheckIn(orgId, participantId, eventId, values);
}

export async function createEvent(orgId, values) {
	const store = await loadStore(orgId);
	const entity = store.createEntity();
	return await setEvent(orgId, entity.id, values);
}

export async function createOrg(name) {
	const store = await loadStore();
	store.createEntity(components.org);
	await renameOrg(store.id, name);
	return await getOrg(store.id);
}

export async function createParticipant(orgId, values) {
	const store = await loadStore(orgId);
	const entity = store.createEntity();
	return await setParticipant(orgId, entity.id, values);
}

export async function deleteOrg(id) {
	const { clearData } = await loadStore(id);
	await clearData();
}

export async function deleteCheckIn(orgId, participantId, eventId) {
	const store = await loadStore(orgId);
	store.deleteEntity(participantId, eventId);
}

export async function getOrg(id) {
	const store = await loadStore(id);
	const entity = store.getEntity(components.org);
	if (!entity) {
		return;
	}
	const name = entity.get(components.org)?.name || "(Organization)";
	const url = `/orgs/${id}/`;
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

export async function importOrg(data) {
	const store = await loadStore();
	const origin = "importer";
	const didImport = new Promise((resolve) => {
		store.doc.on("afterTransaction", (transaction) => {
			if (transaction.origin === origin) {
				store.doc.off("afterTransaction", this);
				resolve(transaction);
			}
		});
	});
	store.doc.transact(() => {
		for (const [key, values] of Object.entries(data)) {
			const entity = getOrCreate(store.data, key, createYMap);
			setMapFromObject(entity, values);
		}
	}, origin);
	await didImport;
	await store.save();
	return await getOrg(store.id);
}

export async function renameOrg(orgId, name) {
	const store = await loadStore(orgId);
	const entity = store.getEntity(components.org);
	if (!entity) {
		return;
	}
	entity.set(components.org, { name });
}

export async function setCheckIn(
	orgId,
	participantId,
	eventId,
	{ organizes = false },
) {
	const store = await loadStore(orgId);
	const entity = store.getEntity(participantId, eventId);
	if (!entity) {
		return;
	}
	store.doc.transact(() => {
		const source = participantId;
		const target = eventId;
		entity.set(components.rel, { source, target });
		entity.set(components.attends);
		if (organizes) {
			entity.set(components.organizes);
		} else {
			entity.delete(components.organizes);
		}
	});
}

export async function setEvent(orgId, id, { name, date }) {
	const store = await loadStore(orgId);
	const entity = store.getEntity(id);
	if (!entity) {
		return;
	}
	entity.set(components.event, { name, date });
	const url = `/orgs/${orgId}/events/${id}/`;
	return { id, url };
}

export async function setEventCount(orgId, { date, value }) {
	const store = await loadStore(orgId);
	const entity = store.getEntity(components.org, components.event);
	if (!entity) {
		return;
	}
	entity.set(components.count, { date, value });
}

export async function setParticipant(orgId, id, value) {
	const store = await loadStore(orgId);
	const entity = store.getEntity(id);
	if (!entity) {
		return;
	}
	store.doc.transact(() => {
		if (value.personName?.trim()) {
			const { location, notes, personName: name } = value;
			entity.set(components.person, { location, name, notes });
		}
		if (value.memberName?.trim()) {
			const { memberName: name } = value;
			entity.set(components.member, { name });
		} else {
			entity.delete(components.member);
		}
	});
	const url = `/orgs/${orgId}/participants/${id}/`;
	return { id, url };
}
