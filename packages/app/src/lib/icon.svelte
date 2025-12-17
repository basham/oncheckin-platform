<script>
	let { name = "", visible = true } = $props();
</script>

<svg aria-hidden="true" class:invisible={!visible}>
	<use href={`/icons.svg#${name}`} />
</svg>

<style>
	svg {
		--size: var(--size-4);
		height: var(--size);
		pointer-events: none;
		width: var(--size);
	}

	use {
		fill: none;
		stroke: currentColor;
		stroke-linecap: round;
		stroke-linejoin: round;
		stroke-width: var(--px-2);
	}

	.invisible {
		visibility: hidden;
	}
</style>
