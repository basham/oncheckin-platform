import {
	defineConfig,
	minimal2023Preset as preset,
} from "@vite-pwa/assets-generator/config";

const resizeOptions = { background: "#190f05" };

export default defineConfig({
	preset: {
		...preset,
		maskable: {
			...preset.maskable,
			resizeOptions,
		},
		apple: {
			...preset.apple,
			resizeOptions,
		},
	},
	images: ["dist/logo.svg"],
});
