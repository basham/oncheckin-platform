import { createId } from '@src/api.js';

export async function get() {
	const json = { id: createId() };
	return { json };
}
