import { getOrCreate, pipe } from "@src/util.js";
import { loadStore } from "../entity.js";
import { getCheckInData } from "./check-in.js";
import { getEventData } from "./event.js";
import { getOrgData } from "./org.js";
import { getParticipantData } from "./participant.js";
import { getParticipationData } from "./participation.js";
import { getContext, Root } from "@src/core";

const cache = new Map();

export function Store(orgId) {
	return compute(orgId);
	//return getOrCreate(cache, orgId, () => compute(orgId));
}

async function compute(orgId) {
	/*
	const store = await loadStore(orgId);
	store.data.observeDeep(function () {
		cache.delete(orgId);
		store.data.unobserveDeep(this);
	});
	*/
	await getContext();
	const root = await Root.load(orgId, {
		resolve: {
			meta: true,
			entities: {
				$each: {
					meta: true,
					event: true,
					person: true,
				}
			}
		}
	});
	if (!root.$isLoaded) {
		throw new Error("Club not found");
	}
	return pipe(
		{ root },
		getOrgData,
		getEventData,
		getParticipantData,
		getCheckInData,
		getParticipationData,
	);
}
