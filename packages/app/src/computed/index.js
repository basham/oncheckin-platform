import { getContext, Root } from "@src/core";
import { getOrCreate } from "@src/util/collections.js";

const modules = import.meta.glob('./!(index).js', { eager: true });
const projections = new Map();

console.log('MM', modules);

export async function getProjection(rootId) {
	return getOrCreate(projections, rootId, async () => {
		await getContext();
		const root = await Root.load(rootId, {
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

		const projection = { root };
		const init = () => {
			for (const [path, module] of Object.entries(modules)) {
				const { compute } = module;
				if (compute) {
					const key = path.match(/([^/]+)\.[^.]+$/)[1];
					defineLazyProperty(projection, key, compute);
				}
			};
		};

		init();
		const unsubscribe = root.$jazz.subscribe(init);
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
		}
	});
}
