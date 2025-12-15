<script>
	import StringComparison from 'hermetrics/dist/hermetrics/jaro_winkler.js'
	import { h2, event, participants } from '@src/data.js';
	import { focus } from '@src/util.js';
	import Fieldset from '@src/lib/fieldset.svelte';
	import FieldsetCheckIn from '@src/lib/fieldset-check-in.svelte';
	import FieldsetParticipantName from '@src/lib/fieldset-participant-name.svelte';
	import Icon from '@src/lib/icon.svelte';
	import Lookup from '@src/lib/lookup.svelte';
	import RadioGroup from '@src/lib/radio-group.svelte';
	import Layout from '../layout.svelte';

	let checkInType = $state('existing-participant');
	let selectedParticipant = $state(null);

	const compare = new StringComparison();

	const presortedParticipants = [...participants]
		.sort((a, b) => {
			const aSort = a.latestCheckIn?.event.dateObj
			const bSort = b.latestCheckIn?.event.dateObj
			if (aSort === undefined) {
				return -1;
			}
			return bSort > aSort ? 1 : bSort < aSort ? -1 : 0
		});

	function scoreResult(query, participant) {
		const terms = [participant.fullName, participant.displayName]
			.join(' ')
			.split(' ')
			.filter((t) => t !== '(Participant)')
			.map((t) => t.toLowerCase());
		const uniqueTerms = [...new Set(terms)];
		const score = query
			.split(' ')
			.map((q) => q.toLowerCase())
			.map((q) => Math.max(...uniqueTerms.map((t) => compare.similarity(q, t))))
			.reduce((total, s) => total + s);
		return score
	}

	function renderParticipantOption(participant) {
		const { alias, displayName, fullName } = participant;
		if (!alias) {
			return fullName;
		}
		if (fullName === '(Participant)') {
			return alias;
		}
		return `${displayName} (${fullName})`
	}

	function selectParticipant(participant) {
		if (participant.checkedIn) {
			window.location = participant.checkIn.url;
			return;
		}

		selectedParticipant = participant;
		focus('unselect-participant');
	}

	function unselectParticipant() {
		selectedParticipant = null;
		focus('find-participant-input');
	}

	function submit(e) {
		if (!selectedParticipant && checkInType === 'existing-participant') {
			e.preventDefault();
			focus('find-participant-input');
		}
	}
</script>

<Layout>
	<h2>{h2}</h2>
	<form autocomplete="off" method="post" onsubmit={submit}>
		<RadioGroup
			bind:value={checkInType}
			legend="Check in"
			name="checkInType"
			options={['Existing participant', 'New participant']}
		/>
		{#if checkInType === 'existing-participant'}
			{#if !selectedParticipant}
				<Fieldset>
					<Lookup
						class="find-participant"
						id="find-participant"
						isSelected={({ checkedIn }) => checkedIn}
						label="Find participant"
						onSelected={selectParticipant}
						options={presortedParticipants}
						render={renderParticipantOption}
						score={scoreResult}
					/>
				</Fieldset>
			{:else}
				<Fieldset>
					<div class="participant">
						<div class="name" id="selectedParticipantName">
							<div class="u-ts-2">{selectedParticipant.displayName}</div>
							<div>{selectedParticipant.fullName}</div>
						</div>
						<input
							type="hidden"
							name="selectedParticipant"
							value={selectedParticipant.id}
						/>
						<button
							aria-label="Unselect"
							aria-describedby="selectedParticipantName"
							class="button button--small"
							id="unselect-participant"
							onclick={unselectParticipant}
							type="button"
						>
							<Icon name="close" />
						</button>
					</div>
				</Fieldset>
			{/if}
		{/if}
		{#if checkInType === 'new-participant'}
			<Fieldset legend="New participant">
				<div class="u-m-top-4">
					<FieldsetParticipantName />
				</div>
			</Fieldset>
		{/if}
		<FieldsetCheckIn />
		<div class="u-m-top-4">
			<button class="button button--primary" type="submit">Save</button>
		</div>
		<p class="u-m-top-4"><a href={event.url}>Back</a></p>
	</form>
</Layout>

<style>
	:global(.find-participant label) {
		font-size: var(--fs-2);
		line-height: var(--lh-2);
	}

	.participant {
		align-items: flex-start;
		display: flex;
	}

	.participant .name {
		flex-grow: 1;
	}
</style>
