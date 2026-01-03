<script>
	import { onMount } from "svelte";
	import { createPasskeyAuth } from "@src/api-jazz/auth.ts";
	import { getInstallStatus } from "@src/util.js";
	import Layout from "./layout.svelte";

	const { isInstalled } = getInstallStatus();
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

<Layout>
	{#if !isInstalled}
		<div class="card u-m-top-6">
			<p>
				<a href="/install">Install this app</a> before logging in for the best experience.
			</p>
		</div>
	{/if}
	<div class="u-m-top-6">
		<button class="button button--primary" type="button" onclick={logIn}>
			Log in with passkey
		</button>
	</div>
	<div class="u-m-top-6">
		<button class="button" type="button" onclick={signUp}> Sign up </button>
	</div>
</Layout>
