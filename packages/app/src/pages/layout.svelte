<script>
	import { h1 } from "@src/data.js";
	import { APP_NAME } from "@src/constants.js";
	import Layout from "./page.svelte";

	let { children } = $props();
</script>

<Layout>
	<div class="layout">
		<header>
			<img alt="" src="/logo.svg" />
			<a href="/">{APP_NAME}</a>
		</header>
		<main>
			{#if h1}
				<h1>{h1}</h1>
			{/if}
			{@render children?.()}
		</main>
	</div>
</Layout>

<style>
	.layout {
		margin: 0 auto;
		max-width: 30rem;
		padding: var(--size-8);
	}

	header {
		align-items: center;
		display: flex;
		font-size: var(--fs-4);
		gap: var(--size-3);
	}

	header > img {
		--size: 3rem;
		height: var(--size);
		width: var(--size);
	}

	header > a {
		text-decoration: none;
	}

	header > a:hover {
		text-decoration: underline;
	}

	main {
		padding-top: var(--size-8);
	}
</style>
