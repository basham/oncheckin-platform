<script>
	import { getInstallStatus } from "@src/util.js";
	import Layout from "./layout.svelte";

	const { isInstalled } = getInstallStatus();
</script>

<Layout>

	<div class="card u-m-top-6">
		{#if isInstalled}
			<p>This app is installed.</p>
			<p>Please <a href="/">log in</a>.</p>
		{:else}
			<p>This app is <strong>not installed</strong>.</p>
		{/if}
	</div>
	<div class="u-m-top-6">
		<h2>Why install?</h2>
		<ol>
			<li><strong>Offline access:</strong> Use the app even without an internet connection.</li>
			<li><strong>Full screen:</strong> Removes the browser bars for a cleaner workspace.</li>
			<li><strong>Instant launch:</strong> Open the app directly from your home screen just like a native app.</li>
		</ol>
	</div>
	<div class="u-m-top-6">
		<h2>iPhone & iPad (Safari)</h2>
		<ol>
			<li>Tap the <strong>Share</strong> button (the square with an arrow pointing up) at the bottom of your screen.</li>
			<li>Scroll down the list of options and tap <strong>Add to Home Screen</strong>.</li>
			<li>Tap <strong>Add</strong> in the top right corner.</li>
		</ol>
	</div>
	<div class="u-m-top-6">
		<h2>Android (Chrome)</h2>
		<ol>
			<li>Tap the <strong>three dots</strong> (⋮) in the top right corner of the browser.</li>
			<li>Select <strong>Install app</strong> or <strong>Add to home screen</strong> from the menu.</li>
			<li>Follow the on-screen prompts to confirm the installation.</li>
		</ol>
	</div>
	<div class="u-m-top-6">
		<h2>Desktop (Chrome/Edge)</h2>
		<ol>
			<li>Look at the right side of your <strong>Address Bar</strong>.</li>
			<li>Click the <strong>Install Icon</strong> (it looks like a computer with an arrow or a "plus" sign in a circle).</li>
			<li>Click <strong>Install</strong> in the popup.</li>
		</ol>
	</div>
</Layout>
