<script>
	// import { registerSW } from 'virtual:pwa-register';
	import Icon from "./icon.svelte";

	const { registerSW } = window;

	const IDLE = Symbol();
	const PROMPT = Symbol();
	const UPGRADING = Symbol();

	let _state = $state(IDLE);

	const updateSW = registerSW({
		onNeedRefresh() {
			_state = PROMPT;
		},
	});

	function upgrade() {
		_state = UPGRADING;
		updateSW();
	}

	function dismiss() {
		_state = IDLE;
	}
</script>

{#if _state === PROMPT}
	<div class="prompt">
		<div class="message u-ts-2">New version available</div>
		<div class="buttons">
			<button class="button button--primary button--small" onclick={upgrade}>
				Upgrade
			</button>
			<button
				aria-label="Dismiss"
				class="button button--small"
				onclick={dismiss}
			>
				<Icon name="close" />
			</button>
		</div>
	</div>
{/if}

{#if _state === UPGRADING}
	<div class="prompt">
		<div class="message u-ts-2">Upgrading&hellip;</div>
	</div>
{/if}

<style>
	.prompt {
		align-items: center;
		background-color: var(--color-b-3);
		display: flex;
		flex-wrap: wrap;
		gap: var(--size-2);
		justify-content: space-between;
		padding: var(--size-4);
	}

	.message {
		padding: var(--size-1) 0;
	}

	.buttons {
		display: flex;
		gap: var(--size-4);
	}
</style>
