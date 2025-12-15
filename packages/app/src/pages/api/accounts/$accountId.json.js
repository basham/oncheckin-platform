import { getAccount } from '@src/api.js';

export async function get({ keys }) {
	const { accountId } = keys;
	const json = await getAccount(accountId);
	return { json };
}
