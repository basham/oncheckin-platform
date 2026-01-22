export function getOrCreate(cache, key, createCallback) {
	if (!cache.has(key)) {
		cache.set(key, createCallback());
	}
	return cache.get(key);
}

export function pipe(value, ...fns) {
	return fns.reduce((v, f) => f(v), value);
}

export function setMapFromObject(map, object) {
	for (const [key, value] of Object.entries(object)) {
		map.set(key, value);
	}
}

export function sort(selectorOrKey, multiplier) {
	const type = typeof selectorOrKey;
	const typeMap = {
		function: selectorOrKey,
		string: (item) => item[selectorOrKey],
	};
	const selector = typeMap[type];
	return (a, b) => {
		const [keyA, keyB] = [a, b].map((item) => selector(item));
		return keyA < keyB ? -1 * multiplier : keyA > keyB ? 1 * multiplier : 0;
	};
}

export function sortAsc(key) {
	return sort(key, 1);
}

export function sortDesc(key) {
	return sort(key, -1);
}
