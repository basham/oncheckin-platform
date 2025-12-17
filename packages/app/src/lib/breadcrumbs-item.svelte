<script>
	let { href = "./", isCurrent = false, children } = $props();
</script>

{#if isCurrent}
	<li aria-current="page">
		{@render children?.()}
	</li>
{:else}
	<li>
		<a {href}>
			{@render children?.()}
		</a>
	</li>
{/if}

<style>
	li {
		flex-shrink: 0;
	}

	li:not(:last-child)::after {
		content: "/";
		padding: 0 var(--size-2);
	}
</style>
