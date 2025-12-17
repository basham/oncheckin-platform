import { getOrgs } from "@src/api.js";

export async function get({ data }) {
	const h1 = "Organizations";
	const { account } = data;
	const orgs = await getOrgs(account.id);
	const template = { h1, orgs };
	return { template };
}
