import { getProjection } from "@src/computed";
import { schemaVersion, Entity } from "@src/core";

export async function createPerson(props) {
	const { clubId, name, nickname } = props;
	const person = Entity.create({
		meta: {
			name,
			schemaVersion,
		},
		person: {
			nickname,
		},
	});
	const { id: personId } = person.$jazz;
	const projection = await getProjection(clubId);
	projection.root.entities.$jazz.set(personId, person);
	return projection.participantsById.get(personId);
}
