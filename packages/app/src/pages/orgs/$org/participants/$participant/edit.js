import { setParticipant } from '@src/api.js';

export async function get({ data }) {
	const { participant } = data;
	const h1 = participant.displayName;
	const h2 = 'Edit participant';
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { org, participant } = data;
	const formData = await request.formData();
	const personName = formData.get('fullName');
	const memberName = formData.get('alias');
	const location = formData.get('location');
	const notes = formData.get('notes');
	const { url: redirect } = await setParticipant(org.id, participant.id, {
		personName,
		memberName,
		location,
		notes,
	});
	return { redirect };
}
