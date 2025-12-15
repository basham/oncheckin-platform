import { getCurrentAccountId, getAccount } from '@src/api.js';

export async function get() {
	const id = await getCurrentAccountId();
	const json = await getAccount(id);
	return { json };
}
