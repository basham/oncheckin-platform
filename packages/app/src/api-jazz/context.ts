import { JazzBrowserContextManager } from "jazz-tools/browser";
import { initIdbKvStore } from "./idb-kv-store.ts";
import { installLocalStorageShim } from "./local-storage-shim.ts";
import { Account } from "./schema.ts";

let manager: JazzBrowserContextManager<typeof Account> | undefined;

type ContextOptions = { forceUpdate?: boolean };

export async function getContext(options: ContextOptions = {}) {
	const initiate = !manager;
	if (initiate) {
		await installLocalStorageShim();
		initIdbKvStore();
		manager = new JazzBrowserContextManager();
	}
	if (initiate || options.forceUpdate) {
		await updateContext();
	}
	return {
		get isAuthenticated() {
			return manager?.getAuthSecretStorage().isAuthenticated;
		},
		async logOut() {
			this.value?.logOut();
			await updateContext();
		},
		get me() {
			return this.value?.me;
		},
		get value() {
			return manager?.getCurrentValue();
		},
	};
}

export async function updateContext() {
	if (!manager) {
		return;
	}
	await manager.createContext({
		AccountSchema: Account,
		defaultProfileName: "New User",
		sync: {
			peer: "ws://127.0.0.1:4200",
			when: "always",
		},
	});
}
