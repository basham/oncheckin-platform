import { getProjection } from "@src/computed";
import { Entity } from "@src/core";

export async function editPerson(props) {
	const { clubId, personId, name, description, nickname } = props;
	const person = await Entity.load(personId, {
		resolve: {
			meta: true,
			person: true,
		},
	});
	if (person.$isLoaded) {
		person.meta.$jazz.set("name", name);
		person.meta.$jazz.set("description", description);
		person.person.$jazz.set("nickname", nickname);
	}
	const projection = await getProjection(clubId);
	return projection.participantsById.get(personId);
}
