import { getContext } from "@src/core";

const orgsPath = "/orgs/";

export async function get({ data }) {
	const forceUpdate = "auth" in data;
	const context = await getContext({ forceUpdate });
	if (context.isAuthenticated) {
		const redirect = orgsPath;
		return { redirect };
	}
	const h1 = "Get started";
	const template = { h1 };
	return { template };
}
