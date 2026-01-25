import { editClub } from "@src/actions";

export async function get() {
	const h1 = "Rename organization";
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {
	const { org } = data;
	const formData = await request.formData();
	const name = formData.get("name");
	const { id: clubId } = org;
	const props = { clubId, name };
	await editClub(props);
	const redirect = `${org.url}settings`;
	return { redirect };
}
