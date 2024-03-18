async function minify(path){
	let minifyModule = await import('./minify.mjs');
	return new minifyModule.default(path);
}

module.exports = minify;