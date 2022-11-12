'use strict';

/*

Minify Module

*/

/*

Required libraries

*/


import fs from "fs";

import browserslist from "browserslist";
const bList = browserslist("last 3 versions, > 5%");

import sass from "sass";
import postcss from "postcss";
import cssvariables from "postcss-css-variables";
import autoprefixer from "autoprefixer";
import { minify as m } from "minify";
import jscompose from "@hqdaemon/jscompose";


/*

Options

*/

const o = {
	html: {
		removeAttributeQuotes: false,
		removeOptionalTags: false,
		minifyCSS: false,
		ignoreCustomFragments: [/\{[\s\S]*?\}/],
		caseSensitive: true
	},
	css: {
		compatibility: "*",
	},
	js: {
		// ecma: 5,
	},
	img: {
		maxSize: 4096
	}
};

/*

Supported extentions

*/

let supported = ["js","scss","css","html"];

/*

Main object

*/

let minify = async (files, options={}) => {
	console.log("OPTIONS", options)

	if(typeof files === "string"){
		files = [files];
	}

	let fileOutput = "";
	let fileType;

	/*

	Parse Files

	*/

	for(let file of files){
		if(!fs.existsSync(file)){
			continue;
		}

		let ext = file.match(/\.([^.]+)$/);
		if(fileType === undefined){
			if(ext === null || !supported.includes(ext[1])){
				continue;
			}
			ext = ext[1];
			fileType = ext;
		}

		let fileStr;

		if(fileType === "js"){

			/*

			JavaScript

			*/

			fileStr = jscompose(file);
		} else if (fileType === "html"){

			/*

			HTML

			*/

			fileStr = fs.readFileSync(file).toString();
		} else {

			/*

			SCSS & CSS

			*/

			if(fileType === "scss"){
				fileStr = sass.renderSync({
					file: file
				});
				fileStr = fileStr.css.toString();
			} else if(fileType === "css"){
				fileStr = fs.readFileSync(file).toString();
			}
			fileStr = await minify.css(fileStr);
		}

		fileOutput += fileStr;
	}

	if(fileType === undefined){
		return false;
	}

	fileType = fileType === "scss" ? "css" : fileType;
	let resultFile = fileOutput ? await m[fileType](fileOutput,o) : "";

	if(options.to === undefined || options.to === null){
		return resultFile;
	}

	/*

	Determine Paths

	*/

	let to = options.to.split("/");
	let fileName = to.splice(-1);
	let dir = to.join("/");

	/*

	Create Directory

	*/

	if(!fs.existsSync(dir)){
		fs.mkdirSync(dir,{recursive:true});
	}

	/*

	Write File

	*/

	fs.writeFileSync(dir+"/"+fileName, resultFile, "utf8");

	return true;
};

/*

CSS

*/

let minifyCSS = minify.css = async css => {
	let result = await postcss([
			cssvariables(),
			autoprefixer({overrideBrowserslist: bList})
			]).process(css,{from: undefined});
	return result.css;
}

export { minify as default };