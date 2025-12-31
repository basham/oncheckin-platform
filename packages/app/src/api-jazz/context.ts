import { JazzBrowserContextManager } from "jazz-tools/browser";
import { Account } from "./schema.ts";

export async function createContextManager() {
	const contextManager = new JazzBrowserContextManager();
	await contextManager.createContext({
		AccountSchema: Account,
		defaultProfileName: "New User",
		guestMode: false,
		sync: {
			peer: "ws://127.0.0.1:4200",
			when: "always",
		}
	});
	return contextManager;
}
