<script>
	import QRious from "qrious";
	import { onMount } from "svelte";

	let { canvasId = "qr-code-canvas", code } = $props();

	onMount(() => {
		new QRious({
			background: "#ffb36a",
			element: document.getElementById(canvasId),
			size: 160,
			value: code,
		});
	});
</script>

<canvas id={canvasId}></canvas>
