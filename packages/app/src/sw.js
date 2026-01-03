import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching";
import { updateContext } from "@src/api-jazz";
import { registerRoute } from "./routing.js";

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

const authChannel = new BroadcastChannel("jazz-auth-sync");
authChannel.onmessage = async (event) => {
	if (event.data.type === "AUTH_CHANGED") {
		await updateContext();
	}
};

const modules = import.meta.glob("./pages/**/*.js", { eager: true });

// Reverse the list of modules so dynamic `$key` folders and files are resolved last.
for (const [url, module] of Object.entries(modules).reverse()) {
	const path = url.replace(/^\.\/pages/, "").replace(/\.js$/, "");
	registerRoute(path, module);
}
