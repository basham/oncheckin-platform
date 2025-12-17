import manifestIcons from "../node_modules/@oncheckin/assets/dist/manifest-icons.json";
import { headLinks } from "../node_modules/@oncheckin/assets/dist/metadata.js";
import rootPkg from "../../../package.json";
import appPkg from "../package.json";

export const { title } = rootPkg;
export const { description } = appPkg;
export const backgroundColor = "#1a1510"; // base-20
export const themeColor = "#52453a"; // base-40
export const manifest = {
	name: title,
	short_name: title,
	description,
	lang: "en-US",
	display: "standalone",
	background_color: backgroundColor,
	theme_color: themeColor,
	orientation: "portrait",
	...manifestIcons,
};

export function createIndexHTML(options = {}) {
	const { head, title: _title } = options;
	const titleParts = Array.isArray(_title) ? _title : [_title];
	const pageTitle = [...titleParts, title].filter((t) => t).join(" - ");
	return `<!doctype html>
<html lang="en">
	<head>
		<title>${pageTitle}</title>
		<meta charset="utf-8" />
		<meta name="description" content="${description}" />
		<meta name="mobile-web-app-capable" content="yes" />
		<meta name="theme-color" content="${themeColor}" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		${headLinks}
		${head}
	</head>
	<body></body>
</html>
`;
}
