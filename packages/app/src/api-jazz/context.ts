import { KvStoreContext } from "jazz-tools";
import { JazzBrowserContextManager } from "jazz-tools/browser";
import { IdbKvStore } from "./idb-kv-store.ts";
import { installShim } from "./local-storage-shim.ts";
import { Account } from "./schema.ts";

let manager: JazzBrowserContextManager<typeof Account> | undefined;

export async function getContext() {
	if (!manager) {
		// Install localStorage shim, because it is required for Jazz sessions.
		await installShim();
		// Use IndexedDB for "jazz-logged-in-secret".
		const store = new IdbKvStore();
		KvStoreContext.getInstance().initialize(store);
		// Set up context.
		manager = new JazzBrowserContextManager();
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
