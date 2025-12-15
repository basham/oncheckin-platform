<script>
	import Icon from './icon.svelte';

	let {
		class: _class,
		id = 'lookup',
		isSelected = () => false,
		label = '',
		onSelected = () => {},
		options = [],
		render = () => {},
		score = () => 1
	} = $props();

	const inputId = `${id}-input`;
	const labelId = `${id}-label`;
	const listboxId = `${id}-listbox`;
	const optionId = `${id}-option`;
	const maxResults = 10;

	let query = $state('');
	let results = $state([]);
	let selectedIndex = $state(0);
	let resultsCount = $derived(results.length);

	function handleInput(event) {
		const { value } = event.target;
		results = options
			.map((option) => [score(value.trim(), option), option])
			.filter(([score]) => score > 0)
			.sort(([a], [b]) => b - a)
			.map(([score, option]) => option)
			.slice(0, maxResults);
		query = value;
		selectedIndex = 0;
	}

	function handleKeyDown(event) {
		const { key } = event;
		const i = selectedIndex;
		const lastIndex = resultsCount - 1;
		switch (key) {
			case 'ArrowDown':
				event.preventDefault();
				selectedIndex = i === lastIndex ? 0 : i + 1;
				return;
			case 'ArrowUp':
				event.preventDefault();
				selectedIndex = i === 0 ? lastIndex : i - 1;
				return;
			case 'Enter':
				event.preventDefault();
				select();
				return;
			case 'Escape':
				query = '';
				return;
		}
	}

	function handleOptionClick() {
		select();
	}

	function handleOptionMouseOver(event) {
		selectedIndex = parseInt(event.target.dataset.index);
	}

	function select() {
		if (results.length > 0) {
			onSelected(results[selectedIndex]);
			query = '';
		}
	}
</script>

<div class={_class}>
	<label for={inputId} id={labelId}>
		{label}
	</label>
	<div
		aria-controls={listboxId}
		aria-expanded={!!query.length}
		aria-haspopup="listbox"
		aria-owns={listboxId}
		role="combobox"
	>
		<input
			aria-activedescendant={`${optionId}-${selectedIndex}`}
			aria-autocomplete="list"
			autocomplete="off"
			class="input"
			id={inputId}
			oninput={handleInput}
			onkeydown={handleKeyDown}
			type="text"
			value={query}
		/>
	</div>
	{#if resultsCount && query.length}
		<ul aria-labelledby={labelId} class="listbox" id={listboxId} role="listbox">
			{#each results as option, i}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_mouse_events_have_key_events -->
				<li
					aria-selected={i === selectedIndex}
					class="option"
					data-index={i}
					id={`${optionId}-${i}`}
					onclick={handleOptionClick}
					onmouseover={handleOptionMouseOver}
					role="option"
				>
					<Icon name="check" visible={isSelected(option)} />
					{@html render(option)}
				</li>
			{/each}
		</ul>
	{:else if !resultsCount && query.length}
		<div class="listbox">
			<div class="noResults" role="alert">No results</div>
		</div>
	{/if}
</div>

<style>
	.listbox {
		background-color: var(--color-b-3);
		border: var(--px-1) solid var(--color-b-1);
		border-radius: var(--size-1);
		line-height: var(--lh-1);
		list-style-type: none;
		margin: var(--size-1) 0 0;
		min-width: 16rem;
		padding: var(--size-1);
		position: absolute;
		width: max-content;
	}

	.option {
		align-items: center;
		cursor: pointer;
		display: flex;
		gap: var(--size-2);
		padding: var(--size-1) var(--size-8) var(--size-1) var(--size-2);
	}

	.option[aria-selected='true'] {
		background-color: var(--color-p-7);
		border-radius: var(--size-1);
		color: var(--color-p-0);
	}

	.noResults {
		padding: var(--size-1) var(--size-2);
	}
</style>
