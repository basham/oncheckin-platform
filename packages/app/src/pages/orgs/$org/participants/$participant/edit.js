import { editPerson } from "@src/actions";

export async function get({ data }) {
	const { participant } = data;
	const h1 = participant.displayName;
	const h2 = "Edit participant";
	const template = { h1, h2 };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const { id: personId } = data.participant;
	const formData = await request.formData();
	const name = formData.get("fullName");
	const nickname = formData.get("alias");
	const location = formData.get("location");
	const description = formData.get("notes");
	const props = { clubId, personId, name, description, nickname };
	const { url: redirect } = await editPerson(props);
	return { redirect };
}
