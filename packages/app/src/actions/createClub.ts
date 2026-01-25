import { getContext, schemaVersion, now, Entity, Root } from "@src/core";

export async function createClub(props) {
	const { name } = props;
	const context = await getContext();
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
	return club.$jazz.id;
}
