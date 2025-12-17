<script>
	import Layout from "@src/pages/layout.svelte";

	let files = $state();
	let isSubmitting = false;

	function submit(event) {
		event.preventDefault();

		if (isSubmitting || !files || !files.length) {
			return;
		}

		isSubmitting = true;
		const reader = new FileReader();
		reader.onload = async (e) => {
			const res = await fetch(window.location.pathname, {
				body: e.target.result,
				method: "post",
			});
			window.location = res.url;
		};
		reader.readAsText(files[0]);
	}
</script>

<Layout>
	<form class="u-m-top-6" onsubmit={submit}>
		<div>
			<label for="file">File</label>
			<br />
			<input accept=".json" bind:files class="input" id="file" type="file" />
		</div>
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">Import</button>
		</div>
		<div class="u-m-top-6">
			<a href="/orgs/">Back to organizations</a>
		</div>
	</form>
</Layout>
