<script>
	import { code } from '@src/data.js';
	import Layout from '@src/pages/layout.svelte';

	const { id, name } = code;

	const IDLE = Symbol('idle');
	const PENDING = Symbol('pending');
	let _state = $state(IDLE);
	let pending = $derived(_state === PENDING);

	function submit () {
		_state = PENDING;
	}
</script>

<Layout>
	<div class="card u-m-top-6">
		<h2 class="u-m-top-0">{name}</h2>
		<p class="u-m-0">
			<span class="u-color-hint">ID:</span>
			{id}
		</p>
	</div>
	<form
		class:u-sr-only={pending}
		method="post"
		onsubmit={submit}
	>
		<input type="hidden" name="id" value={id} />
		<div class="u-m-top-6">
			<button
				class="button button--primary"
				disabled={pending}
				type="submit"
			>
				Join organization
			</button>
		</div>
	</form>
	{#if pending}
		<p class="u-m-top-4 u-ts-2">Syncing…</p>
	{/if}
</Layout>
