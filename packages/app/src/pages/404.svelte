<script>
	import data from "@src/data.js";
	import Layout from "./page.svelte";

	const { h1 } = data;
</script>

<Layout>
	<main class="u-p-8">
		<h1>{h1}</h1>
	</main>
</Layout>
