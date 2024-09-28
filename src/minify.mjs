'use strict';

/*

Minify

*/

import fs from 'fs';
// import { minify as m } from 'minify';
import { minify as mHTML } from 'html-minifier-terser';

// JS
import { minify as mJS } from 'terser';

// CSS
import cssnano from 'cssnano';

// SCSS
import browserslist from 'browserslist';
const bList = browserslist('last 3 versions, > 5%');

import * as sass from 'sass';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

/*

Main object

*/

let minify = async (file, output=false) => {

	let fileOutput = '';
	let fileType;


	if (!fs.existsSync(file)) {
		console.log('@Surfy.Minify: No file');
		return false;
	}

	let minified = '';


	if (file.endsWith('.html')) {

		// HTML
	
		const fileString = fs.readFileSync(file);
		minified = await mHTML(fileString.toString(), {
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true
		});

	} else if (file.endsWith('.js')) {

		// JS

		const fileString = fs.readFileSync(file);
		const result = await mJS(fileString.toString());
		minified = result.code;

	} else if (file.endsWith('.css')) {

		// CSS

		const fileString = fs.readFileSync(file);
		const result = await cssnano.process(fileString.toString());
		minified = result.css;

	} else if (file.endsWith('.scss')) {
		
		// SCSS

		const fileString = sass.compile(file, { style: 'compressed' }).css;

		minified = await postcss([
			autoprefixer({ overrideBrowserslist: bList })
		])
		.process(fileString, { from: undefined }).css;
	}

	if (output) {
		output = output === true ? file : output;
		fs.writeFileSync(output, minified);
	} else {
		return minified;
	}
};

export default minify;