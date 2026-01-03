import { clear, del, entries, set } from "idb-keyval";

class LocalStorageShim {
	private data;

	constructor(initialData: any) {
		this.data = new Map(initialData);
	}

	getItem(key: string) {
		return this.data.get(key);
	}

	setItem(key: string, value: string) {
		this.data.set(key, value);
		set(key, value);
	}

	removeItem(key: string) {
		this.data.delete(key);
		del(key);
	}

	clear() {
		this.data.clear();
		clear();
	}
}

export async function installShim() {
	const saved = await entries();
	(globalThis as any).localStorage = new LocalStorageShim(saved);
}
