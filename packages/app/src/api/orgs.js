import { sortAsc } from "@src/util.js";
import { getAccount } from "./account.js";
import { getDevice } from "./device.js";
import { getOrg } from "./org.js";

export async function getOrgs(accountId) {
	const account = await getAccount(accountId);

	if (!account) {
		return;
	}

	const orgs = [];
	for (const orgId of account.orgs) {
		const org = await getOrg(orgId);
		orgs.push(org);
	}
	orgs.sort(sortAsc("name"));

	return orgs;
}

export async function getOrgIdsFromAllAccounts() {
	const orgIds = new Set();
	const device = await getDevice();

	for (const accountId of device.accounts) {
		const account = await getAccount(accountId);

		for (const orgId of account.orgs) {
			orgIds.add(orgId);
		}
	}

	return [...orgIds.values()];
}
