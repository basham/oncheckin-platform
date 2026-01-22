export function debounce(fn, timeout = 100) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			fn.apply(this, args);
		}, timeout);
	};
}

export function delay(ms) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(), ms);
	});
}
