/*

CommonJS Test

*/

console.log("\n\n== CommonJS Test ==\n\n")

process.env.test = true;
let minify = require("../src/minify.js");

let test = async () => {
	
	let jsResult = await minify("tests/src/script.1.js");
	console.log(`Minify JS:\n${jsResult}\n`);

	let jsToFileResult = await minify("tests/src/script.1.js", "tests/bundle/script.js");
	console.log(`Minify JS To File: ${jsToFileResult}\n`);

	let scssResult = await minify("tests/src/style.1.scss");
	console.log(`Minify SCSS:\n${scssResult}\n`);

	let scssToFileResult = await minify("tests/src/style.1.scss", "tests/bundle/style.css" );
	console.log(`Minify SCSS To File: ${scssToFileResult}\n`);

	let htmlToFileResult = await minify("tests/src/dom.html", "tests/bundle/dom.html");
	console.log(`Minify HTML To File: ${htmlToFileResult}\n`);
};

test();