import { addOrg, importOrg } from '@src/api.js';

export function get() {
	const h1 = 'Import organization';
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { account } = data;
	const json = await request.json();
	const { id, url: redirect } = await importOrg(json);
	await addOrg(account.id, id);
	return { redirect };
}
