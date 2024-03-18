/*

CommonJS Module

*/

async function minify(path, options){
	let minifyModule = await import('./minify.mjs');
	return minifyModule.default(path, options);
}

module.exports = minify;