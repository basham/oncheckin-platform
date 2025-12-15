import { addOrg, createOrg } from '@src/api.js';

export async function get() {
	const h1 = 'New organization';
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { account } = data;
	const formData = await request.formData();
	const name = formData.get('name');
	const { id, url: redirect } = await createOrg(name);
	await addOrg(account.id, id);
	return { redirect };
}
