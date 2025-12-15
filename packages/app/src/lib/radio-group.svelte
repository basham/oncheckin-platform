<script>
	import Fieldset from './fieldset.svelte';

	let {
		legend = '',
		name = '',
		options = [],
		value = $bindable(null)
	} = $props();

	let _options = $derived(options.map((label) => {
		const value = label.toLowerCase().replace(/ /g, '-');
		return {
			id: `${name}-${value}-radio`,
			label,
			name,
			value,
		};
	}));
</script>

<Fieldset {legend}>
	<ul class="u-m-0 u-p-0">
		{#each _options as option}
			<li>
				<input
					bind:group={value}
					checked={option.checked}
					class="u-sr-only"
					id={option.id}
					name={option.name}
					type="radio"
					value={option.value}
				/>
				<label class="u-m-0" for={option.id}>
					<span class="radio"></span>
					<span class="text">{option.label}</span>
				</label>
			</li>
		{/each}
	</ul>
</Fieldset>

<style>
	ul {
		list-style-type: '';
	}

	li {
		margin-top: var(--size-2);
		width: fit-content;
	}

	label {
		cursor: pointer;
		display: flex;
		font-weight: normal;
	}

	.radio {
		--color-background: var(--color-b-1);
		--color-border: var(--color-b-4);
		--color-checked: var(--color-b-1);
		--size: var(--size-6);
		border-radius: 50%;
		box-shadow: inset 0 0 0 var(--px-2) var(--color-border),
			inset 0 0 0 calc(var(--size-1) + var(--px-1)) var(--color-background),
			inset 0 0 0 var(--size-3) var(--color-checked);
		content: '';
		display: inline-block;
		flex-shrink: 0;
		height: var(--size);
		margin-right: var(--size-2);
		width: var(--size);
	}

	.text {
		padding: var(--px-2) 0;
	}

	input:checked + label .radio {
		--color-checked: var(--color-p-7);
	}

	input:focus + label .radio {
		--color-border: var(--color-p-7);
	}
</style>
