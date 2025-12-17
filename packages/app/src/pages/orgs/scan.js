import { addOrg, createOrg } from "@src/api.js";

export async function get() {
	const h1 = "Scan invite code";
	const template = { h1 };
	return { template };
}

export async function post({ data, request }) {}
