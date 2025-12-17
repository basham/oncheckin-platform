<script>
	import { checkIns } from "@src/data.js";
	import { sortAsc, sortDesc } from "@src/util.js";
	import CheckInList from "@src/lib/list-check-in.svelte";
	import Layout from "./layout.svelte";

	const hosts = checkIns.filter(({ host }) => host);
	const specialHosts = hosts
		.filter(({ specialHostCount }) => specialHostCount)
		.sort(sortAsc("hostCount"));
	const specialRuns = checkIns
		.filter(({ specialRunCount }) => specialRunCount)
		.sort(sortAsc("runCount"));
	const virgins = checkIns.filter(({ runCount }) => runCount === 1);
	const namings = checkIns.filter(({ readyForNaming }) => readyForNaming);
	const returners = checkIns
		.filter(({ specialLastEventDate }) => specialLastEventDate)
		.sort(sortDesc((checkIn) => checkIn.lastEvent.dateObj));
	const visitors = [];
</script>

<Layout>
	<h2>
		Hares <span class="badge">{hosts.length}</span>
	</h2>
	{#if hosts.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={hosts} />
		</div>
	{/if}
	<h2>
		Hare-iversaries <span class="badge">{specialHosts.length}</span>
	</h2>
	{#if specialHosts.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={specialHosts} showHostCount={true} />
		</div>
	{/if}
	<h2>
		Run-iversaries <span class="badge">{specialRuns.length}</span>
	</h2>
	{#if specialRuns.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={specialRuns} showCheckInCount={true} />
		</div>
	{/if}
	<h2>
		Returners <span class="badge">{returners.length}</span>
	</h2>
	{#if returners.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={returners} showLastEventDate={true} />
		</div>
	{/if}
	<h2>
		Visitors <span class="badge">{visitors.length}</span>
	</h2>
	{#if visitors.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={visitors} />
		</div>
	{/if}
	<h2>
		Virgins <span class="badge">{virgins.length}</span>
	</h2>
	{#if virgins.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={virgins} />
		</div>
	{/if}
	<h2>
		Namings <span class="badge">{namings.length}</span>
	</h2>
	{#if namings.length}
		<div class="u-m-top-2">
			<CheckInList checkIns={namings} showCheckInCount={true} />
		</div>
	{/if}
</Layout>
