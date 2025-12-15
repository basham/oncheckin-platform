<script>
	import Layout from '@src/pages/layout.svelte';
</script>

<Layout>
	<form autocomplete="off" method="post">
		<div class="u-m-top-6">
			<label for="inviteCodeInput">Invite code</label>
			<br />
			<input class="input" id="inviteCodeInput" name="code" type="text" />
		</div>
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">Join</button>
		</div>
		<div class="u-m-top-6">
			<a href="/orgs/">Back to organizations</a>
		</div>
	</form>
</Layout>
