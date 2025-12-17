<script>
	let active = $state(false);
	let duration = 3000;
	let message = $state("");

	export function dispatch(msg) {
		message = msg;
		active = true;
		setTimeout(() => {
			active = false;
		}, duration);
	}
</script>

<div class="toast" class:toast--active={active} role="status">
	{message}
</div>

<style>
	.toast {
		background-color: var(--color-p-8);
		border-top: var(--px-1) solid var(--color-b-1);
		color: var(--color-p-0);
		left: 0;
		padding: var(--size-4);
		position: fixed;
		top: 100%;
		transform: translateY(0);
		transition: transform 250ms;
		width: 100%;
	}

	.toast--active {
		transform: translateY(-100%);
	}
</style>
