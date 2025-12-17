import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "@vite-pwa/assets-generator/config";
import { generateManifestIconsEntry } from "@vite-pwa/assets-generator/api/generate-manifest-icons-entry";
import { instructions } from "@vite-pwa/assets-generator/api/instructions";
import { generateHtmlMarkup } from "@vite-pwa/assets-generator/api/generate-html-markup";
import config from "./pwa-assets.config.js";

async function run() {
	const root = dirname(fileURLToPath(import.meta.url));
	const dist = resolve(root, "dist");

	const resolvedOptions = await loadConfig(process.cwd(), config);
	const [image] = resolvedOptions.config.images;
	const imageName = resolve(root, image);
	const resolvedInstructions = await instructions({
		...resolvedOptions,
		imageResolver: () => readFile(imageName),
		imageName,
		htmlLinks: { xhtml: true, includeId: false },
		basePath: "/",
		resolveSvgName: (name) => basename(name),
	});

	await writeFile(
		resolve(dist, "manifest-icons.json"),
		generateManifestIconsEntry("string", resolvedInstructions),
	);

	const headLinks = generateHtmlMarkup(resolvedInstructions).join('\n');
	await writeFile(
		resolve(dist, "metadata.js"),
		`export const headLinks = \`${headLinks}\`;\n`
	);
}

run().catch(console.error);
