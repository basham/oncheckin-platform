import { getContext, schemaVersion, now, Entity, Root } from "@src/api-jazz";

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
		meta: {
			name,
			schemaVersion,
		},
		entities: {},
	});
	const accountClub = Entity.create({
		meta: {
			lastViewedAt: now(),
			schemaVersion,
		},
		club: {
			root: club,
		},
	});
	context.me.root.entities.$jazz.set(accountClub.$jazz.id, accountClub);
	const redirect = `/orgs/?id=${club.$jazz.id}`;
	return { redirect };
}
