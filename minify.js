'use strict';

(() => {
	const fs = require("fs");

	const m = require("minify");
	const jscompose = require("@hqdaemon/jscompose");

	const browserslist = require("browserslist");
	const bList = browserslist("last 3 versions, > 5%");
	const sass = require("sass");
	const postcss = require("postcss");
	const cssvariables = require("postcss-css-variables");
	const autoprefixer = require("autoprefixer");

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

	var supported = ["js","scss","css"];

	var minify = async function(files,options={}){
		if(typeof files === "string"){
			files = [files];
		}
		let fileOutput = "";
		let fileType;
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
				fileStr = jscompose(file);
			} else {
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
		fileType = (fileType === "scss")?"css":fileType;
		let resultFile = await m[fileType](fileOutput,o);

		if(options.to === undefined || options.to === null){
			return resultFile;
		}

		let to = options.to.split("/");
		let fileName = to.splice(-1);
		let dir = to.join("/");

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir,{recursive:true});
		}
		fs.writeFileSync(dir+"/"+fileName, resultFile, "utf8");
		return true;
	};

	minify.css = async function(css){
		let result = await postcss([
				cssvariables(),
				autoprefixer({overrideBrowserslist: bList})
				]).process(css,{from: undefined});
		return result.css;
	}

	module.exports = minify;
})();