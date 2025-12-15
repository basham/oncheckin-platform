import { getOrCreate } from '@src/util.js';
import { cache, createId, createYMap, createRemoteStore } from './store.js';

export async function addOrg(accountId, orgId) {
	const account = await getAccountDB(accountId);
	account.orgs.set(orgId, true);
}

export async function createAccount(id = createId()) {
	return await getAccount(id);
}

export async function removeOrg(accountId, orgId) {
	const account = await getAccountDB(accountId);
	account.orgs.delete(orgId);
}

export async function getAccountDB(id = createId()) {
	//return getOrCreate(cache, `account:${id}`, async () => {
	const store = await createRemoteStore(id);
	const { doc } = store;
	const data = doc.getMap('data');
	const rows = ['orgs'].map((key) => [key, getOrCreate(data, key, createYMap)]);
	const rowsEntries = Object.fromEntries(rows);
	return { ...store, ...rowsEntries, data };
	//})
}

export async function getAccount(id) {
	if (!id) {
		return;
	}

	const db = await getAccountDB(id);

	if (!db) {
		return;
	}

	const type = 'account';
	const version = 1;
	const name = db.data.get('name');
	const orgs = [...db.orgs.keys()];
	const url = `/accounts/${id}/`;
	return { id: db.id, type, version, name, orgs, url };
}

export async function hasOrg(accountId, orgId) {
	const { orgs } = await getAccountDB(accountId);
	return orgs.has(orgId);
}

export async function renameAccount(id, name) {
	const db = await getAccountDB(id);
	db.data.set('name', name);
}
