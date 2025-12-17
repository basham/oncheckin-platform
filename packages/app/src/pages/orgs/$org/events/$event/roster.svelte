<script>
	import { event, returnersCutoff, participants } from "@src/data.js";
	import Icon from "@src/lib/icon.svelte";
	import Layout from "@src/pages/page.svelte";
</script>

<Layout>
	<div class="header">
		<h1 class="u-ts-2 u-text-bold">{event.name}</h1>
		<p class="u-m-0">{`#${event.count}: ${event.displayDateLong}`}</p>
	</div>
	<div class="content u-m-top-2">
		<table>
			<thead>
				<tr>
					<th><div class="center">Check in</div></th>
					<th><div class="right">Hares</div></th>
					<th><div class="right">Runs</div></th>
					<th class="u-text-left">Hasher</th>
					<th class="u-text-left">
						Last run
						<br />
						<span class="u-text-normal">{`Ret. ${returnersCutoff}`}</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#each participants as p}
					<tr>
						<td class="u-text-center">
							{#if p.checkedIn && p.checkIn.host}
								<span aria-hidden="true">H</span>
								<span class="u-sr-only">Hare</span>
							{:else if p.checkedIn}
								<span class="u-flex">
									<Icon name="check" />
									<span class="u-sr-only">Checked in</span>
								</span>
							{/if}
						</td>
						<td
							class="u-text-num u-text-right"
							class:highlight={p.specialHostCount}
						>
							{p.hostCount > 0 ? p.hostCount : ""}
						</td>
						<td
							class="u-text-num u-text-right"
							class:highlight={p.specialRunCount}
						>
							{p.runCount}
						</td>
						<td class:highlight={p.readyForNaming}>
							{p.displayName}
						</td>
						<td class="u-text-num" class:highlight={p.highlightLastEventDate}>
							{p.lastEventDate}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Layout>

<style>
	:global(html) {
		background-color: var(--color-white);
		color: var(--color-black);
		font-size: var(--fs-0);
		line-height: var(--lh-0);
	}

	@media screen {
		:global(body) {
			margin: var(--size-4);
		}
	}

	.content {
		column-gap: var(--size-6);
		column-width: 25rem;
	}

	table {
		border-collapse: collapse;
	}

	th {
		border-bottom: var(--px-1) solid currentColor;
		padding: 0 var(--size-1) var(--px-2);
		position: relative;
		height: 5rem;
		vertical-align: bottom;
		white-space: nowrap;
	}

	th > div {
		bottom: var(--size-1);
		left: 0;
		position: absolute;
		transform: translate(var(--translate), 0) rotate(-90deg);
		transform-origin: 0% 100%;
		width: 100%;
	}

	th > div.center {
		--translate: calc(50% + var(--lh-1) / 2);
	}

	th > div.right {
		--translate: 100%;
	}

	td {
		border-bottom: var(--px-1) solid transparent;
		padding: 0 var(--size-1);
		vertical-align: top;
	}

	tbody tr:nth-child(3n) td {
		border-bottom-color: var(--color-black);
	}

	.highlight {
		background-color: var(--color-black);
		color: var(--color-white);
	}
</style>
