<script>
	import { h1 } from '@src/data.js';
	import Layout from '@src/pages/orgs/$org/layout.svelte';
</script>

<Layout>
	<h1>{h1}</h1>
	<form method="post">
		<p class="u-m-top-4">
			Are you sure you want to delete this organization from this account?
		</p>
		<p class="u-m-top-4">
			The only way to permanently delete this organization is to have all
			accounts who have accessed this organization to also delete it.
		</p>
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">
				Yes, delete this organization
			</button>
		</div>
	</form>
</Layout>
