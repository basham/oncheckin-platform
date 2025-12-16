import path from 'path';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
		viteStaticCopy({
			targets: [
				{
					src: '../assets/dist/*',
					dest: '.'
				}
			],
		}),
		VitePWA({
			devOptions: {
				enabled: true,
				type: 'module',
			},
			filename: 'sw.js',
			injectManifest: {
				globPatterns: ['**/*.{css,html,ico,js,png,svg}'],
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
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
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
