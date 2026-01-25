export function focus(id: any) {
	waitForElement(id, (el) => el.focus());
}

export function getInstallStatus() {
	const isInstalled = window.matchMedia("(display-mode: standalone)").matches
	return { isInstalled };
}

export function waitForElement(id: string, callback: (el: HTMLElement) => void = () => {}, retry = 180) {
	const el = document.getElementById(id);
	if (el) {
		return callback(el);
	}
	if (retry > 0) {
		window.requestAnimationFrame(() => waitForElement(id, callback, retry - 1));
	}
}
