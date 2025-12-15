<script>
	import { h1 } from '@src/data.js';
	import FieldsetParticipantName from '@src/lib/fieldset-participant-name.svelte';
	import Layout from '@src/pages/orgs/$org/layout.svelte';
</script>

<Layout>
	<h1>{h1}</h1>
	<form autocomplete="off" method="post">
		<FieldsetParticipantName />
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
</Layout>
