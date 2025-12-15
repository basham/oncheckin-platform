import { createParticipant } from '@src/api.js';

export async function get() {
	const h1 = 'New hasher';
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const formData = await request.formData();
	const personName = formData.get('fullName');
	const memberName = formData.get('alias');
	const { url: redirect } = await createParticipant(org.id, {
		personName,
		memberName,
	});
	return { redirect };
}
