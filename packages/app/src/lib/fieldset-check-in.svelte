<script>
	import Checkbox from './checkbox.svelte';
	import Fieldset from './fieldset.svelte';

	let { host = $bindable(false) } = $props();
</script>

<Fieldset>
	<Checkbox
		bind:checked={host}
		id="host"
		label="Host of this event"
		name="host"
	/>
</Fieldset>
