import { getContext } from "@src/core";

export async function get() {
	const context = await getContext();
	await context.logOut();
	const redirect = "/";
	return { redirect };
}
