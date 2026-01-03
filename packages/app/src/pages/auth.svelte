<script>
	import { onMount } from "svelte";
	import { createPasskeyAuth } from "@src/api-jazz/auth.ts";

	let auth = null;

	onMount(async () => {
		auth = await createPasskeyAuth();
	});

	async function handleAuth(fn) {
		if (!auth) {
			return;
		}
		await fn();
		window.location = "?auth";
	}

	async function signUp() {
		handleAuth(() => auth.signUp(""));
	}

	async function logIn() {
		handleAuth(() => auth.logIn());
	}
</script>

<div class="u-m-top-6">
	<button class="button button--primary" type="button" onclick={signUp}>
		Sign up
	</button>
	<button class="button button--primary" type="button" onclick={logIn}>
		Log in with passkey
	</button>
</div>
