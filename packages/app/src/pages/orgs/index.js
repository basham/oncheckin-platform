import { getContext } from "@src/core";
import { sortDesc } from "@src/util/collections.js";

export async function get() {
	const context = await getContext();
	const h1 = "Organizations";
	const me = await context.me.$jazz.ensureLoaded({
		resolve: {
			root: {
				entities: {
					$each: {
						meta: true,
						club: {
							root: {
								meta: true,
							},
						},
					},
				},
			},
		},
	});
	const accountClubs = Object.entries(me.root.entities)
		.filter(([k]) => k !== "$jazz")
		.map(([k, v]) => v)
		.sort(sortDesc((v) => v.meta.lastViewedAt));
	const template = { h1, accountClubs };
	return { template };
}
