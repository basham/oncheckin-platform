import { getContext } from "@src/api-jazz";

export async function get() {
	const context = await getContext();
	await context.logOut();
	const redirect = "/";
	return { redirect };
}
