import { addOrg, createRemoteStore } from "@src/api.js";

export async function get({ data }) {
	const { device } = data;
	if (device.state !== "active") {
		const redirect = `/start/?join=${data.code}`;
		return { redirect };
	}
	const h1 = "Join organization";
	const code = JSON.parse(self.atob(data.code));
	const template = { h1, code };
	return { template };
}

export async function post({ data, request }) {
	const { account } = data;
	const formData = await request.formData();
	const id = formData.get("id");
	await addOrg(account.id, id);
	const store = await createRemoteStore(id);
	await new Promise((resolve) => {
		store.doc.on("update", () => resolve());
	});
	const redirect = `/orgs/${id}/`;
	return { redirect };
}
