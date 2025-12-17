<script>
	import Icon from "./icon.svelte";

	let {
		checked = $bindable(false),
		class: _class,
		id = "",
		label = "",
		name = "",
	} = $props();
</script>

<div class={_class}>
	<input bind:checked class="u-sr-only" {id} {name} type="checkbox" />
	<label class="u-m-0" for={id}>
		<span class="checkbox">
			<Icon name="check" />
		</span>
		<span class="text">{label}</span>
	</label>
</div>

<style>
	div {
		width: fit-content;
	}

	label {
		cursor: pointer;
		display: flex;
		font-weight: normal;
	}

	.checkbox {
		--color-background: var(--color-b-1);
		--color-border: var(--color-b-4);
		--color-checked: var(--color-b-1);
		--size: var(--size-6);
		align-items: center;
		background-color: var(--color-checked);
		border-radius: var(--size-1);
		box-shadow:
			inset 0 0 0 var(--px-2) var(--color-border),
			inset 0 0 0 var(--size-1) var(--color-background);
		color: var(--color-background);
		display: inline-flex;
		flex-shrink: 0;
		height: var(--size);
		justify-content: center;
		margin-right: var(--size-2);
		width: var(--size);
	}

	.text {
		padding: var(--px-2) 0;
	}

	input:checked + label .checkbox {
		--color-checked: var(--color-p-7);
	}

	input:checked:hover + label .checkbox {
		--color-checked: var(--color-p-8);
	}

	input:focus + label .checkbox {
		--color-border: var(--color-p-7);
	}
</style>
