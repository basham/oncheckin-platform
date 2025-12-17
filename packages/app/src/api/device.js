import { getOrCreate } from "@src/util.js";
import { cache, createId, createYMap, createLocalStore } from "./store.js";

export async function addAccount(id) {
	const db = await getDeviceDB();
	db.accounts.set(id, true);
}

export async function getCurrentAccountId() {
	const { current } = await getDevice();
	return current;
}

export async function getDeviceDB() {
	const id = "device";
	//return getOrCreate(cache, id, async () => {
	const store = await createLocalStore(id);
	const { doc } = store;
	const data = doc.getMap("data");
	getOrCreate(data, "id", createId);
	const rows = ["accounts"].map((key) => [
		key,
		getOrCreate(data, key, createYMap),
	]);
	const rowsEntries = Object.fromEntries(rows);
	return { ...store, ...rowsEntries, data };
	//})
}

export async function getDevice() {
	const db = await getDeviceDB();

	if (!db) {
		return;
	}

	const id = db.data.get("id") || null;
	const type = "device";
	const version = 1;
	const name = db.data.get("name") || null;
	const current = db.data.get("current") || null;
	const accounts = [...db.accounts.keys()];
	const state = !name && !current && !accounts.length ? "inactive" : "active";
	return { id, type, version, state, name, current, accounts };
}

export async function renameDevice(name) {
	const db = await getDeviceDB();
	db.data.set("name", name);
}

export async function setCurrentAccount(id) {
	const db = await getDeviceDB();
	if (id) {
		db.data.set("current", id);
	} else {
		db.data.delete("current");
	}
}
