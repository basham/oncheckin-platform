import { Entity } from "@src/api-jazz";
import { setParticipant } from "@src/api.js";

export async function get({ data }) {
	const { participant } = data;
	const h1 = participant.displayName;
	const h2 = "Edit participant";
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { participant } = data;
	const formData = await request.formData();
	const name = formData.get("fullName");
	const nickname = formData.get("alias");
	const location = formData.get("location");
	const description = formData.get("notes");
	const entity = await Entity.load(participant.id, {
		resolve: {
			meta: true,
			person: true,
		}
	});
	entity.meta.$jazz.set("name", name);
	entity.meta.$jazz.set("description", description);
	entity.person.$jazz.set("nickname", nickname);
	const { url: redirect } = participant;
	return { redirect };
}
