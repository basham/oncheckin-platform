import { getContext, Root } from "@src/core";
import { getOrCreate } from "@src/util/collections.js";

declare global {
	interface ImportMeta {
		glob<T = any>(pattern: string, options?: { eager?: boolean; as?: string }): Record<string, T>;
	}
}

const modules = import.meta.glob("./!(index).ts", { eager: true });
const projections = new Map();

export async function getProjection(rootId) {
	return getOrCreate(projections, rootId, async () => {
		await getContext();
		const root = await Root.load(rootId, {
			resolve: {
				meta: true,
				entities: {
					$each: {
						meta: true,
						checkin: true,
						event: true,
						link: true,
						person: true,
					},
				},
			},
		});

		const projection = { root };
		const init = () => {
			for (const [path, module] of Object.entries(modules)) {
				const { compute } = module;
				if (compute) {
					const key = path.match(/([^/]+)\.[^.]+$/)[1];
					defineLazyProperty(projection, key, compute);
				}
			}
		};

		init();
		/*
		if (root.$jazz.loadingState === "ready") {
			const unsubscribe = root.$jazz.subscribe(init);
		}
		*/
		return projection;
	});
}

function defineLazyProperty(obj, propName, computeFn) {
	Object.defineProperty(obj, propName, {
		configurable: true,
		enumerable: true,
		get() {
			const value = computeFn(obj);
			/*
			Object.defineProperty(obj, propName, {
				value,
				writable: false,
				configurable: true,
				enumerable: true,
			});
			*/
			return value;
		},
	});
}
