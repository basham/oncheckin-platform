export async function get() {
	const h1 = "Enter invite code";
	const template = { h1 };
	return { template };
}

export async function post({ request }) {
	const formData = await request.formData();
	const code = formData.get("code");
	const redirect = `/join/${code}/`;
	return { redirect };
}
