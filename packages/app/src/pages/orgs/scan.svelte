<script>
	import QrScanner from "qr-scanner";
	import { onMount } from "svelte";
	import Layout from "@src/pages/layout.svelte";

	let { videoId = "qr-scanner" } = $props();
	let valid = $state(true);
	let validTimer;

	onMount(() => {
		const options = {
			highlightScanRegion: true,
		};
		const qrScanner = new QrScanner(
			document.getElementById(videoId),
			({ data }) => {
				try {
					const code = JSON.parse(self.atob(data));
					const { id, name } = code;
					const valid = [id, name].every(
						(value) => typeof value === "string" && value.length > 0,
					);
					if (valid) {
						window.location = `/join/${data}/`;
					}
				} catch {
					valid = false;
					clearTimeout(validTimer);
					validTimer = setTimeout(() => {
						valid = true;
					}, 1000);
				}
			},
			options,
		);
		qrScanner.start();
	});
</script>

<Layout>
	<p class="u-m-top-4">
		Scan the invite code (in the format of a QR code) on the device of someone
		who can access the organization you want to join.
	</p>
	<p class="u-m-top-4">
		Alternatively, <a href="/orgs/code/">enter the invite code</a> as text.
	</p>
	<!-- svelte-ignore a11y_media_has_caption -->
	<video aria-invalid={!valid} class="u-m-top-6 u-mw-full" id={videoId}>
	</video>
	<div class="u-m-top-6">
		<a href="/orgs/">Back to organizations</a>
	</div>
</Layout>

<style>
	:global(.scan-region-highlight-svg) {
		stroke: var(--color-p-7) !important;
	}

	:global(
		#qr-scanner[aria-invalid="true"]
			+ .scan-region-highlight
			.scan-region-highlight-svg
	) {
		stroke: var(--color-red) !important;
	}
</style>
