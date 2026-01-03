import {
	addAccount,
	createAccount,
	renameAccount,
	renameDevice,
	setCurrentAccount,
} from "@src/api.js";
import { getContext } from "@src/api-jazz";

const orgsPath = "/orgs/";

export async function get() {
	const context = await getContext();
	if (context.isAuthenticated) {
		const redirect = orgsPath;
		return { redirect };
	}
	const h1 = "Get started";
	const template = { h1 };
	return { template };
}

export async function post({ request, data }) {
	const formData = await request.formData();
	const deviceName = formData.get("deviceName");
	await renameDevice(deviceName);
	const accountName = formData.get("accountName");
	const account = await createAccount();
	await renameAccount(account.id, accountName);
	await addAccount(account.id);
	await setCurrentAccount(account.id);
	const redirect = data.join ? `/join/${data.join}/` : orgsPath;
	return { redirect };
}
