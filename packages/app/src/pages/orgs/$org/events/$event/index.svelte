<script>
	import { event, hares, runners } from "@src/data.js";
	import CheckInList from "@src/lib/list-check-in.svelte";
	import Layout from "./layout.svelte";
</script>

<Layout>
	<div class="u-flex u-gap-4 u-m-top-6">
		<a class="button button--primary" href={`${event.url}check-ins/new/`}>
			New check-in
		</a>
		<a class="button" href={`${event.url}roster/`}>Print roster</a>
	</div>
	<h2>
		Hares <span class="badge">{hares.length}</span>
	</h2>
	{#if hares.length}
		<div class="u-m-top-2">
			<CheckInList
				checkIns={hares}
				showCheckInCount={true}
				showHostCount={true}
			/>
		</div>
	{/if}
	<h2>
		Runners <span class="badge">{runners.length}</span>
	</h2>
	{#if runners.length}
		<div class="u-m-top-2">
			<CheckInList
				checkIns={runners}
				showCheckInCount={true}
				showHostCount={true}
			/>
		</div>
	{/if}
</Layout>
