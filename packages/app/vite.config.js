import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const copyConfig = {
	targets: [
		{
			src: 'node_modules/@oncheckin/assets/logo.svg',
			dest: '.'
		}
	]
};

export default defineConfig({
	build: {
		commonjsOptions: {
			transformMixedEsModules: true
		},
		modulePreload: false,
		rollupOptions: {
			output: {
				entryFileNames: '[name].js',
			},
		},
		target: 'esnext',
	},
	plugins: [
		svelte({
			emitCss: false
		}),
		// Copy logo to generate PWA Assets.
		viteStaticCopy({
			...copyConfig,
			hook: 'buildStart'
		}),
		// Rollup deletes logo, so copy it again once it is done.
		viteStaticCopy(copyConfig),
		VitePWA({
			devOptions: {
				enabled: true,
				type: 'module',
			},
			filename: 'sw.js',
			injectManifest: {
				globPatterns: ['**/*.{css,html,js,png,svg}'],
			},
			injectRegister: 'inline',
			manifest: {
				name: 'OnCheckIn',
				short_name: 'OnCheckIn',
				description: 'Membership app for Hash House Harriers.',
				lang: 'en-US',
				display: 'standalone',
				background_color: '#1a1510', // base-20
				theme_color: '#52453a', // base-40
				orientation: 'portrait',
			},
			pwaAssets: {
				config: 'pwa-assets.config.js'
			},
			srcDir: 'src',
			strategies: 'injectManifest',
		}),
	],
	resolve: {
		alias: {
			'@src': path.resolve(__dirname, 'src'),
		},
	},
});
