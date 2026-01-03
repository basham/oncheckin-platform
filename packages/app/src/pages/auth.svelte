<script>
	import { KvStoreContext } from "jazz-tools";
	import {
		BrowserPasskeyAuth,
		JazzBrowserContextManager,
	} from "jazz-tools/browser";
	import { onMount } from "svelte";
	import { IdbKvStore } from "@src/api-jazz";

	const authChannel = new BroadcastChannel("jazz-auth-sync");
	const authChanged = () => authChannel.postMessage({ type: "AUTH_CHANGED" });
	let auth = null;

	onMount(async () => {
		// Use IndexedDB for "jazz-logged-in-secret".
		const store = new IdbKvStore();
		KvStoreContext.getInstance().initialize(store);
		const contextManager = new JazzBrowserContextManager();
		await contextManager.createContext({
			sync: {
				when: "never",
			},
		});
		const context = contextManager.getCurrentValue();
		const authSecretStorage = contextManager.getAuthSecretStorage();
		const appName = "OnCheckIn";
		const _auth = new BrowserPasskeyAuth(
			context.node.crypto,
			context.authenticate,
			authSecretStorage,
			appName,
		);
		const out = {
			signUp: async () => {
				await _auth.signUp("");
				authChanged();
				window.location = "/orgs";
			},
			logIn: async () => {
				await _auth.logIn();
				authChanged();
				window.location = "/orgs";
			},
			logOut: () => {
				context.logOut();
				authChanged();
			},
			get state() {
				return authSecretStorage.isAuthenticated;
			},
		};
		auth = out;
		const unsubscribe = authSecretStorage.onUpdate(() => {
			auth = out;
		});
		return unsubscribe;
	});
</script>

<div class="u-m-top-6">
	<button class="button button--primary" type="button" onclick={auth.signUp}
		>Sign up</button
	>
	<button class="button button--primary" type="button" onclick={auth.logIn}
		>Log in with passkey</button
	>
</div>
