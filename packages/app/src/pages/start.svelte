<script>
	import Layout from './layout.svelte';
</script>

<Layout>
	<form autocomplete="off" method="post">
		<div class="u-m-top-6">
			<label for="deviceNameField">Device name</label>
			<br />
			<input class="input" id="deviceNameField" name="deviceName" type="text" />
		</div>
		<div class="u-m-top-6">
			<label for="accountNameField">Account name</label>
			<br />
			<input
				class="input"
				id="accountNameField"
				name="accountName"
				type="text"
			/>
		</div>
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">Continue</button>
		</div>
		<div class="u-m-top-6">
			<a href="/">Cancel</a>
		</div>
	</form>
</Layout>
