<script>
	import { h1, org } from '@src/data.js';
	import Layout from '@src/pages/orgs/$org/layout.svelte';
	import QRCode from '@src/lib/qr-code.svelte';
	import Toast from '@src/lib/toast.svelte';

	let toast = $state();

	function copyShareLink(event) {
		const text = document.getElementById('invite-code-input');
		text.select();
		document.execCommand('copy');
		event.target.focus();
		toast.dispatch('Copied invite code');
	}
</script>

<Layout>
	<h1>{h1}</h1>
	<p class="u-m-top-4">
		Invite others to collaborate in this organization as editors. (There is no
		read-only mode.) Either copy and share the invite code, or ask others scan
		the QR&nbsp;code.
	</p>
	<div class="card u-m-top-6 u-flex u-flex-wrap u-gap-2">
		<input
			aria-label="Share link"
			class="input invite-code-input"
			id="invite-code-input"
			readonly
			type="text"
			value={org.inviteCode}
		/>
		<button class="button button--primary" onclick={copyShareLink}>
			Copy invite code
		</button>
	</div>
	<div class="card u-m-top-6">
		<QRCode code={org.inviteCode} />
	</div>
	<Toast bind:this={toast} />
</Layout>

<style>
	.invite-code-input {
		flex-basis: 10rem;
		flex-grow: 1;
		max-width: none;
	}
</style>
