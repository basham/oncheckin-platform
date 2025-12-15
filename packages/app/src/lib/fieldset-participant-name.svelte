<script>
	let { fullName = '', alias = '' } = $props();
</script>

<div class="u-m-top-4">
	<label for="fullNameField">Full name</label>
	<br />
	<input
		class="input"
		id="fullNameField"
		name="fullName"
		type="text"
		value={fullName}
	/>
</div>
<div class="u-m-top-4">
	<label for="aliasField">Hash name</label>
	<br />
	<input class="input" id="aliasField" name="alias" type="text" value={alias} />
</div>
