<script>
	import { h1, org } from '@src/data.js';
	import Layout from '@src/pages/orgs/$org/layout.svelte';
</script>

<Layout>
	<h1>{h1}</h1>
	<form autocomplete="off" method="post">
		<div class="u-m-top-4">
			<label for="orgNameField">Organization name</label>
			<br />
			<input
				class="input"
				id="orgNameField"
				name="name"
				type="text"
				value={org.name}
			/>
		</div>
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
</Layout>
