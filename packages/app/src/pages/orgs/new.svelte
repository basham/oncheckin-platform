<script>
	import Layout from '@src/pages/layout.svelte';
</script>

<Layout>
	<form autocomplete="off" method="post">
		<div class="u-m-top-6">
			<label for="orgNameInput">Organization name</label>
			<br />
			<input class="input" id="orgNameInput" name="name" type="text" />
		</div>
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">Save</button>
		</div>
		<div class="u-m-top-6">
			<a href="/orgs/">Back to organizations</a>
		</div>
	</form>
</Layout>
