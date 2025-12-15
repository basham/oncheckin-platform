import { deleteOrg, getOrgIdsFromAllAccounts, removeOrg } from '@src/api.js';

export function get() {
	const h1 = 'Delete organization';
	const template = { h1 };
	return { template };
}

export async function post({ data }) {
	const { account, org } = data;
	await removeOrg(account.id, org.id);
	const orgIds = await getOrgIdsFromAllAccounts();
	if (!orgIds.includes(org.id)) {
		await deleteOrg(org.id);
	}
	return { redirect: '/orgs/' };
}
