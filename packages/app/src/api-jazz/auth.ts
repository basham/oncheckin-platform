import {
	BrowserPasskeyAuth,
	JazzBrowserContextManager,
} from "jazz-tools/browser";
import { APP_NAME } from "@src/constants.js";
import { initIdbKvStore } from "./idb-kv-store.ts";

export async function createPasskeyAuth() {
	initIdbKvStore();
	const contextManager = new JazzBrowserContextManager();
	await contextManager.createContext({
		sync: {
			when: "never",
		},
	});
	const context = contextManager.getCurrentValue();
	if (!context) {
		throw new Error("Failed to create Jazz context");
	}
	const authSecretStorage = contextManager.getAuthSecretStorage();
	return new BrowserPasskeyAuth(
		context.node.crypto,
		context.authenticate,
		authSecretStorage,
		APP_NAME,
	);
}
