import { clear, del, get, set } from "idb-keyval";
import { KvStore } from "jazz-tools";

export class IdbKvStore implements KvStore {
	constructor() {}

	async get(key: string) {
		return await get(key);
	}

	async set(key: string, value: string) {
		await set(key, value);
	}

	async delete(key: string) {
		await del(key);
	}

	async clearAll() {
		await clear();
	}
}
