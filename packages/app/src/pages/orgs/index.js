import { getOrgs } from "@src/api.js";
import { getContext } from "@src/api-jazz";

export async function get({ data }) {
	const context = await getContext();
	const h1 = "Organizations";
	const { account } = data;
	const orgs = await getOrgs(account.id);
	const me = await context.me.$jazz.ensureLoaded({
		resolve: {
			root: {
				entities: {
					$each: {
						meta: true,
						club: {
							root: {
								meta: true
							}
						}
					},
				},
			},
		},
	});
	const _tmp = me.root.entities;
	const template = { h1, orgs, _tmp };
	return { template };
}
