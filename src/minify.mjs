"use strict";

/*

Minify

*/

import fs from "fs";
// import { minify as m } from "minify";
import { minify as mHTML } from "html-minifier-terser";

// JS
import { minify as mJS } from "terser";

// CSS + SCSS (Lightning CSS)
import { transform } from "lightningcss";
import * as sass from "sass";

/*

Main object

*/

let minify = async (file, output = false) => {

	let fileOutput = "";
	let fileType;

	if (!fs.existsSync(file)) {
		console.log("@Surfy.Minify: No file");
		return false;
	}

	let minified = "";

	if (file.endsWith(".html")) {

		// HTML

		const fileString = fs.readFileSync(file);
		minified = await mHTML(fileString.toString(), {
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true
		});

	} else if (file.endsWith(".js")) {

		// JS

		const fileString = fs.readFileSync(file);
		const result = await mJS(fileString.toString());
		minified = result.code;

	} else if (file.endsWith(".css")) {

		// CSS

		const fileString = fs.readFileSync(file);
		const { code } = transform({
			code: Buffer.from(fileString),
			minify: true,
			filename: file
		});
		minified = code.toString();

	} else if (file.endsWith(".scss")) {

		// SCSS

		const compiled = sass.compile(file, { style: "compressed" }).css;
		const { code } = transform({
			code: Buffer.from(compiled),
			minify: true,
			filename: file
		});
		minified = code.toString();
	}

	if (output) {
		output = output === true ? file : output;
		fs.writeFileSync(output, minified);
		return true;
	} else {
		return minified;
	}
};

export default minify;
