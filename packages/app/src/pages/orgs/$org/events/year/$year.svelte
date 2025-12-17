<script>
	import {
		h1,
		events,
		eventsWithFewestParticipants,
		eventsWithMostParticipants,
		participantsWithMostAttendances,
		participantsWithMostOrganizes,
	} from "@src/data.js";
	import Layout from "@src/pages/orgs/$org/layout.svelte";
	import Events from "@src/lib/events.svelte";
	import Participants from "@src/lib/participants.svelte";
</script>

<Layout location="events">
	<h1>{h1}</h1>
	<h2>
		Most participants <span class="badge"
			>{eventsWithMostParticipants.count}</span
		>
	</h2>
	<div class="u-m-top-2">
		<Events events={eventsWithMostParticipants.events} />
	</div>
	<h2>
		Fewest participants <span class="badge"
			>{eventsWithFewestParticipants.count}</span
		>
	</h2>
	<div class="u-m-top-2">
		<Events events={eventsWithFewestParticipants.events} />
	</div>
	<h2>
		Most hares <span class="badge">{participantsWithMostOrganizes.count}</span>
	</h2>
	<div class="u-m-top-2">
		<Participants participants={participantsWithMostOrganizes.participants} />
	</div>
	<h2>
		Most runs <span class="badge">{participantsWithMostAttendances.count}</span>
	</h2>
	<div class="u-m-top-2">
		<Participants participants={participantsWithMostAttendances.participants} />
	</div>
	<h2>
		Events <span class="badge">{events.length}</span>
	</h2>
	<div class="u-m-top-2">
		<Events {events} />
	</div>
</Layout>
