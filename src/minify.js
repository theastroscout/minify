/*

CommonJS Module

*/

async function minify(path, output) {
	const { default: runMinify } = await import("./minify.mjs");
	return runMinify(path, output);
}

module.exports = minify;