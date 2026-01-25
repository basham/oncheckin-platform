import { createPerson } from "@src/actions";

export async function get() {
	const h1 = "New hasher";
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { id: clubId } = data.org;
	const formData = await request.formData();
	const name = formData.get("fullName");
	const nickname = formData.get("alias");
	const props = { clubId, name, nickname };
	const { url: redirect } = await createPerson(props);
	return { redirect };
}
