<script>
	import { route, event } from "@src/data.js";
	import NavLink from "@src/lib/nav-link.svelte";
	import Layout from "@src/pages/orgs/$org/layout.svelte";

	let { children } = $props();
	const location = route.split("/")[4];
</script>

<Layout>
	<h1>{event.name}</h1>
	<p class="u-m-top-2">{`#${event.count}: ${event.displayDateLong}`}</p>
	<nav
		class="list-plain list-plain--inline u-border-bottom u-gap-4 u-m-top-6 u-p-bottom-4"
	>
		<NavLink href={event.url} id={location && "check-ins"} {location}>
			Check-ins
		</NavLink>
		<NavLink href={`${event.url}checkpoint/`} id="checkpoint" {location}>
			Checkpoint
		</NavLink>
		<NavLink href={`${event.url}circle/`} id="circle" {location}>
			Circle
		</NavLink>
		<NavLink href={`${event.url}edit/`} id="edit" {location}>Edit</NavLink>
	</nav>
	{@render children?.()}
</Layout>
