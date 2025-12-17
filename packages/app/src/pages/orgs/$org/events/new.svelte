<script>
	import { h1, date } from "@src/data.js";
	import Layout from "@src/pages/orgs/$org/layout.svelte";
	import FieldsetEvent from "@src/lib/fieldset-event.svelte";
</script>

<Layout>
	<h1>{h1}</h1>
	<form autocomplete="off" method="post">
		<FieldsetEvent {date} />
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
</Layout>
