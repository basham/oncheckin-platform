import { createClub } from "@src/actions";
import { getProjection } from "@src/computed";

export async function get() {
	const h1 = "New organization";
	const template = { h1 };
	return { template };
}

export async function post({ request }) {
	const formData = await request.formData();
	const name = formData.get("name");
	const clubId = await createClub({ name });
	const { org } = await getProjection(clubId);
	const { url: redirect } = org;
	return { redirect };
}
