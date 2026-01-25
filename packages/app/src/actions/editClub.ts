import { Entity } from "@src/core";

export async function editClub(props) {
	const { clubId, name } = props;
	const entity = await Entity.load(clubId, {
		resolve: {
			meta: true,
		},
	});
	if (entity.$isLoaded) {
		entity.meta.$jazz.set("name", name);
	}
}
