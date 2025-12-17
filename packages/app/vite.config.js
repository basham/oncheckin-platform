import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { manifest, transformHead } from "./src/template.js"

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
		{
			name: "html-transform",
			transformIndexHtml(html) {
				return transformHead(html);
			}
		},
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
			manifest,
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
