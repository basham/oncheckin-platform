<script>
	import data from "@src/data.js";
	import FieldsetEvent from "@src/lib/fieldset-event.svelte";
	import Layout from "./layout.svelte";

	const { h2, event } = data;
	const { name, date } = event;
</script>

<Layout>
	<h2>{h2}</h2>
	<form autocomplete="off" method="post">
		<div class="u-m-top-4">
			<FieldsetEvent {name} {date} />
		</div>
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
</Layout>
