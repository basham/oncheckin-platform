<script>
	import Upgrader from "@src/lib/upgrader.svelte";

	let { children } = $props();
</script>

<Upgrader />

{@render children?.()}
