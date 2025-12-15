<script>
	let {
		children,
		class: _class,
		legend = ''
	} = $props();
</script>

<div class={`card u-m-top-4 ${_class}`}>
	<fieldset class="u-m-0 u-p-0">
		<legend class="u-p-0 u-ts-2">{legend}</legend>
		{@render children?.()}
	</fieldset>
</div>

<style>
	fieldset {
		border: none;
		display: block;
	}
</style>
