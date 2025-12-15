import { renameOrg } from '@src/api.js';

export async function get() {
	const h1 = 'Rename organization';
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const formData = await request.formData();
	const name = formData.get('name');
	await renameOrg(org.id, name);
	const redirect = `${org.url}settings`;
	return { redirect };
}
