process.env.test = true;
const minify = require("../minify");

let app = async () => {
	let jsResult = await minify("test/src/script.1.js");
	console.log(`Minify JS:\n${jsResult}\n`);

	let jsToFileResult = await minify("test/src/script.1.js",{to:"test/bundle/script.js"});
	console.log(`Minify JS To File: ${jsToFileResult}\n`);

	let scssResult = await minify("test/src/style.1.scss");
	console.log(`Minify SCSS:\n${scssResult}\n`);

	let scssToFileResult = await minify("test/src/style.1.scss",{to:"test/bundle/style.css"});
	console.log(`Minify SCSS To File: ${scssToFileResult}\n`);
};
app();