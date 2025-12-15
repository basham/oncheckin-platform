<script>
	let { children } = $props();
</script>

<nav aria-label="Breadcrumbs">
	<ol class="u-p-0">
		{@render children?.()}
	</ol>
</nav>

<style>
	ol {
		display: flex;
		flex-wrap: wrap;
		list-style-type: none;
		margin: 0 0 var(--size-4);
	}
</style>
