import { getContext, now, AccountClub, Club } from "@src/api-jazz";

export async function get() {
	const h1 = "New organization";
	const template = { h1 };
	return { template };
}

export async function post({ request }) {
	const context = await getContext();
	const formData = await request.formData();
	const name = formData.get("name");
	const club = Club.create({
		meta: { name },
		entities: {},
	});
	const accountClub = AccountClub.create({
		club,
		lastOpenedAt: now(),
	});
	const { root } = await context.me.$jazz.ensureLoaded({
		resolve: {
			root: {
				accountClubs: true,
			},
		},
	});
	root.accountClubs.$jazz.set(accountClub.$jazz.id, accountClub);
	const redirect = `/orgs/?id=${club.$jazz.id}`;
	return { redirect };
}
