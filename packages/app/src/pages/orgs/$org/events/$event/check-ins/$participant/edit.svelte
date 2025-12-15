<script>
	import { h2, event, participant, checkIn } from '@src/data.js';
	import FieldsetCheckIn from '@src/lib/fieldset-check-in.svelte';
	import Layout from '@src/pages/orgs/$org/events/$event/layout.svelte';

	const { host } = checkIn;
</script>

<Layout>
	<h2>{h2}</h2>
	<p aria-label="Participant" class="card u-m-top-4" role="group">
		<a class="u-ts-3" href={participant.url}>{participant.displayName}</a>
		<br />
		{participant.fullName}
	</p>
	<form method="post">
		<input type="hidden" name="action" value="edit" />
		<FieldsetCheckIn {host} />
		<div class="u-m-top-6">
			<button class="button button--primary" type="submit">Save</button>
		</div>
	</form>
	<form method="post">
		<input type="hidden" name="action" value="delete" />
		<div class="u-m-top-4">
			<button class="button" type="submit">Delete</button>
		</div>
	</form>
	<p class="u-m-top-6"><a href={event.url}>Back</a></p>
</Layout>
