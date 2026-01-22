export function focus(id) {
	waitForElement(id, (el) => el.focus());
}

export function getInstallStatus() {
	const isInstalled =
		window.matchMedia("(display-mode: standalone)").matches ||
		window.navigator.standalone; // Specific for iOS Safari
	return { isInstalled };
}

export function waitForElement(id, callback = () => {}, retry = 180) {
	const el = document.getElementById(id);
	if (el) {
		return callback(el);
	}
	if (retry > 0) {
		window.requestAnimationFrame(() => waitForElement(id, callback, retry - 1));
	}
}
