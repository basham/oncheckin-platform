<script>
	import { h2, participant } from '@src/data.js';
	import Checkbox from '@src/lib/checkbox.svelte';
	import Fieldset from '@src/lib/fieldset.svelte';
	import FieldsetParticipantName from '@src/lib/fieldset-participant-name.svelte';
	import Layout from './layout.svelte';

	const {
		alias,
		attendsCount,
		fullName,
		location,
		notes,
		organizesCount
	} = participant;
	let hasAttendsCount = $state(!!attendsCount);
	let hasOrganizesCount = $state(!!organizesCount);
</script>

<Layout>
	<h2>{h2}</h2>
	<form autocomplete="off" method="post">
		<Fieldset legend="Name">
			<FieldsetParticipantName {alias} {fullName} />
		</Fieldset>
		<Fieldset legend="Details">
			<div class="u-m-top-4">
				<label for="locationField">Location</label>
				<br />
				<input
					class="input"
					id="locationField"
					name="location"
					type="text"
					value={location}
				/>
			</div>
			<div class="u-m-top-4">
				<label for="notesField">Notes</label>
				<br />
				<textarea
					class="input"
					id="notesField"
					name="notes"
					rows="5"
					value={notes}
				></textarea>
			</div>
			<Checkbox
				bind:checked={hasAttendsCount}
				class="u-m-top-4"
				id="hasAttendsCount"
				label="Has historical run count"
				name="hasAttendsCount"
			/>
			<Checkbox
				bind:checked={hasOrganizesCount}
				class="u-m-top-4"
				id="hasOrganizesCount"
				label="Has historical hare count"
				name="hasOrganizesCount"
			/>
		</Fieldset>
		{#if hasAttendsCount}
			<Fieldset legend="Historical run count">
				<div class="u-m-top-4">
					<label for="attendsValueField">Run count</label>
					<br />
					<input
						class="input u-mw-3"
						id="attendsValueField"
						name="attendsValue"
						min="0"
						type="number"
						value={attendsCount?.value}
					/>
				</div>
				<div class="u-m-top-4">
					<label for="attendsDateField">Run count as of date</label>
					<br />
					<input
						class="input u-mw-5"
						id="attendsDateField"
						name="attendsDate"
						type="date"
						value={attendsCount?.date}
					/>
				</div>
			</Fieldset>
		{/if}
		{#if hasOrganizesCount}
			<Fieldset legend="Historical hare count">
				<div class="u-m-top-4">
					<label for="attendsValueField">Hare count</label>
					<br />
					<input
						class="input u-mw-3"
						id="attendsValueField"
						name="attendsValue"
						min="0"
						type="number"
						value={organizesCount?.value}
					/>
				</div>
				<div class="u-m-top-4">
					<label for="organizesDateField">Hare count as of date</label>
					<br />
					<input
						class="input u-mw-5"
						id="organizesDateField"
						name="organizesDate"
						type="date"
						value={organizesCount?.date}
					/>
				</div>
			</Fieldset>
		{/if}
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
		<p class="u-m-top-4"><a href={participant.url}>Back</a></p>
	</form>
</Layout>
