<script>
	import data from "@src/data.js";
	import Layout from "@src/pages/orgs/$org/layout.svelte";
	import FieldsetEvent from "@src/lib/fieldset-event.svelte";

	const { h1, date } = data;
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
