<script>
	import { device, account, orgs, _tmp } from "@src/data.js";
	import { sortDesc } from "@src/util.js";
	import Layout from "@src/pages/layout.svelte";

	console.log('##', _tmp);

	const accountClubs = Object.entries(_tmp)
		.filter(([k]) => k !== "$jazz")
		.map(([k, v]) => v)
		.sort(sortDesc((v) => v.meta.lastViewedAt));
</script>

<Layout>
	<div class="u-m-top-4">{account.name} ({device.name})</div>
	<div class="u-flex u-gap-4 u-m-top-6">
		<a class="button button--primary" href="/orgs/add/">Add organization</a>
		<a href="/logout">Log out</a>
	</div>
	{#if accountClubs.length}
		<h2>All clubs</h2>
		<ul class="list-plain u-gap-2px u-m-top-2">
			{#each accountClubs as ac}
				<li class="row">
					<a class="row__content" href={`/orgs/${ac.club.root.$jazz.id}`}>
						<div class="row__primary">{ac.club.root.meta.name}</div>
						<div class="row__secondary">
							<div>{`ID: ${ac.club.root.$jazz.id.slice(-4)}`}</div>
							<div>{`Last opened: ${ac.meta.lastViewedAt}`}</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
	{#if orgs.length}
		<h2>All organizations</h2>
		<ul class="list-plain u-gap-2px u-m-top-2">
			{#each orgs as org}
				<li class="row">
					<a class="row__content" href={org.url}>
						<span class="row__primary">{org.name}</span>
						<span class="row__secondary">{`ID: ${org.id}`}</span>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</Layout>
