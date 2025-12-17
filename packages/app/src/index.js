import { mount } from "svelte";
import { registerSW } from "virtual:pwa-register";
import "@oncheckin/assets/style.css";

// Export this, so then `upgrader.svelte` can import it.
// This is an ugly solution to prevent a circular dependency.
window.registerSW = registerSW;

const params = new URLSearchParams(window.location.search);
const isJoinRedirect = window.location.pathname === "/" && params.has("join");
const joinRedirect = () => {
	if (isJoinRedirect) {
		window.location = window.location = `/join/${params.get("join")}/`;
	}
};

registerSW({
	onOfflineReady() {
		joinRedirect();
	},
	onRegisteredSW() {
		joinRedirect();
	},
});

const raw = document.getElementById("data")?.text;
const data = raw ? JSON.parse(raw) : { route: "index" };
const { route } = data;
const pages = import.meta.glob(`./pages/**/*.svelte`, { eager: true });
const key = (part) => `./pages/${part}.svelte`;
const module = pages[key(route)] || pages[key(`${route}/index`)];

if (module) {
	const Page = module.default;
	const target = document.body;
	mount(Page, { target });
}
