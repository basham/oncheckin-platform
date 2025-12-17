import { getDevice } from "@src/api.js";

export async function get() {
	const json = await getDevice();
	return { json };
}
