<script>
	import { BrowserPasskeyAuth, JazzBrowserContextManager } from "jazz-tools/browser";
	import { onMount } from "svelte";
	import { Account } from "@src/api-jazz";

	let auth = null;

	onMount(async () => {
		const contextManager = new JazzBrowserContextManager();
		await contextManager.createContext({
			sync: {
				peer: "ws://127.0.0.1:4200",
				when: "always",
			},
			AccountSchema: Account
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
			signUp: () => _auth.signUp(""),
			logIn: () => _auth.logIn(),
			logOut: () => context.logOut(),
			get state() { return authSecretStorage.isAuthenticated; }
		};
		auth = out;
		const unsubscribe = authSecretStorage.onUpdate(() => {
			auth = out;
		});
		return unsubscribe;
	});
</script>

<button class="button button--primary" type="button" onclick={auth.signUp}>Sign up</button>
<button class="button button--primary" type="button" onclick={auth.logIn}>Log in</button>
<button class="button button--primary" type="button" onclick={auth.logOut}>Log out</button>
{auth?.state}
