<script>
	import { route, org } from '@src/data.js';
	import { APP_NAME } from '@src/constants.js';
	import NavLink from '@src/lib/nav-link.svelte';
	import Layout from '@src/pages/page.svelte';

	let { children } = $props();
	const location = route.split('/').slice(2).join('/');
	let awarenessCount = $state(-1);
	let connected = $derived(awarenessCount === -1 || awarenessCount > 1);

	const bc = new BroadcastChannel(`bc-${org.id}`);
	bc.onmessage = (event) => {
		const [type, data] = event.data;
		if (type === 'count') {
			awarenessCount = data;
		}
	};
	bc.postMessage(['getCount']);
</script>

<Layout>
	<header class="u-border-bottom">
		<div class="layout-content">
			<div class="header">
				<a class="logo-link" href="/orgs">
					<img alt={APP_NAME} class="logo" src="/logo.svg" />
				</a>
				<span class="u-flex-grow">
					<a class="org-link u-text-bold" href={org.url}>{org.name}</a>
					<span aria-hidden={connected} class:u-hidden={connected}>
						<strong aria-hidden="true" class="u-color-ix">*</strong>
						<span class="u-sr-only">(disconnected)</span>
					</span>
				</span>
				<nav aria-label="Organization" class="list-plain list-plain--inline u-gap-4">
					<NavLink href={org.url} id="events" {location}>Events</NavLink>
					<NavLink
						href={`${org.url}participants/`}
						id="participants"
						{location}
					>
						Hashers
					</NavLink>
					<NavLink href={`${org.url}settings/`} id="settings" {location}>
						Settings
					</NavLink>
				</nav>
			</div>
		</div>
	</header>
	<main class="layout-content u-p-bottom-6">
		{@render children?.()}
	</main>
</Layout>

<style>
	.header {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-4);
	}

	.logo-link {
		border-radius: 100%;
		display: flex;
	}

	.logo {
		--size: 2.5rem;
		height: var(--size);
		width: var(--size);
	}

	.org-link {
		color: inherit;
		text-decoration: none;
	}

	.org-link:hover {
		text-decoration: underline;
	}
</style>
