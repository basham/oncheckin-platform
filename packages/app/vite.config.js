import path from "path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { title } from "../../package.json";
import { description } from "./package.json";
import manifestIcons from "../assets/dist/manifest-icons.json";

export default defineConfig({
	build: {
		commonjsOptions: {
			transformMixedEsModules: true,
		},
		modulePreload: false,
		rollupOptions: {
			output: {
				entryFileNames: "[name].js",
			},
		},
		target: "esnext",
	},
	plugins: [
		svelte({
			emitCss: false,
		}),
		viteStaticCopy({
			targets: [
				{
					src: "../assets/dist/*.{ico,png,svg}",
					dest: ".",
				},
			],
		}),
		VitePWA({
			devOptions: {
				enabled: true,
				type: "module",
			},
			filename: "sw.js",
			injectManifest: {
				globPatterns: ["**/*.{css,html,ico,js,png,svg}"],
			},
			injectRegister: "inline",
			manifest: {
				name: title,
				short_name: title,
				description,
				lang: "en-US",
				display: "standalone",
				background_color: "#1a1510", // base-20
				theme_color: "#52453a", // base-40
				orientation: "portrait",
				...manifestIcons,
			},
			srcDir: "src",
			strategies: "injectManifest",
		}),
	],
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "src"),
		},
	},
});
