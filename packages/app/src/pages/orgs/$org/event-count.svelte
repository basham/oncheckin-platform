<script>
	import { h1, orgEvent } from "@src/data.js";
	import Layout from "@src/pages/orgs/$org/layout.svelte";
</script>

<Layout>
	<h1>{h1}</h1>
	<p class="u-m-top-4">Enter the earliest known number of events.</p>
	<form autocomplete="off" method="post">
		<div class="u-m-top-4">
			<label for="valueField">Event count</label>
			<br />
			<input
				class="input u-mw-3"
				id="valueField"
				name="value"
				min="0"
				type="number"
				value={orgEvent.count.value}
			/>
		</div>
		<div class="u-m-top-4">
			<label for="dateField">Event count as of date</label>
			<br />
			<input
				class="input u-mw-5"
				id="dateField"
				name="date"
				type="date"
				value={orgEvent.count.date}
			/>
		</div>
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
</Layout>
