<script>
	import { route, participant, latestCheckIn } from '@src/data.js';
	import { pluralize } from '@src/util.js';
	import NavLink from '@src/lib/nav-link.svelte';
	import Layout from '@src/pages/orgs/$org/layout.svelte';

	let { children } = $props();
	const location = route.split('/')[4];
</script>

<Layout>
	<h1>{participant.displayName}</h1>
	<p class="u-m-top-2">
		<span>{participant.fullName}</span>
		{#if latestCheckIn}
			<span class="u-m-lr-1">&middot;</span>
			<span>
				{`${latestCheckIn?.count} ${pluralize(latestCheckIn?.count, 'run')}`}
			</span>
			<span class="u-m-lr-1">&middot;</span>
			<span>
				{`${latestCheckIn?.hostCount} ${pluralize(
					latestCheckIn?.hostCount,
					'hare'
				)}`}
			</span>
		{/if}
	</p>
	<nav
		class="list-plain list-plain--inline u-border-bottom u-gap-4 u-m-top-4 u-p-bottom-4"
	>
		<NavLink href={participant.url} {location}>Runs</NavLink>
		<NavLink href={`${participant.url}hares/`} id="hares" {location}>
			Hares
		</NavLink>
		<NavLink href={`${participant.url}edit/`} id="edit" {location}>
			Edit
		</NavLink>
	</nav>
	{@render children?.()}
</Layout>
