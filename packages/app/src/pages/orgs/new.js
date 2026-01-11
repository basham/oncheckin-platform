import { getContext, now, Entity, Root } from "@src/api-jazz";

export async function get() {
	const h1 = "New organization";
	const template = { h1 };
	return { template };
}

export async function post({ request }) {
	const context = await getContext();
	const formData = await request.formData();
	const name = formData.get("name");
	const club = Root.create({
		meta: { name },
		entities: {},
	});
	const accountClub = Entity.create({
		meta: {
			lastViewedAt: now()
		},
		club: {
			root: club
		}
	});
	const { root } = await context.me.$jazz.ensureLoaded({
		resolve: {
			root: {
				entities: true,
			},
		},
	});
	if (!root.entities) {
		root.$jazz.set("entities", {});
	}
	root.entities.$jazz.set(accountClub.$jazz.id, accountClub);
	console.log('JJ', club.toJSON(), accountClub.toJSON())
	const redirect = `/orgs/?id=${accountClub.$jazz.id}`;
	return { redirect };
}
