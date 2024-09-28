/*

CommonJS Module

*/

async function minify(path, output) {
	let minifyModule = await import('./minify.mjs');
	return minifyModule.default(path, output);
}

module.exports = minify;