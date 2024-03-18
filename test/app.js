process.env.test = true;
import minify from '../src/minify.js';

let test = async () => {
	let jsResult = await minify('test/src/script.1.js');
	console.log(`Minify JS:\n${jsResult}\n`);

	let jsToFileResult = await minify('test/src/script.1.js', { to: 'test/bundle/script.js' });
	console.log(`Minify JS To File: ${jsToFileResult}\n`);

	let scssResult = await minify('test/src/style.1.scss');
	console.log(`Minify SCSS:\n${scssResult}\n`);

	let scssToFileResult = await minify('test/src/style.1.scss', { to: 'test/bundle/style.css' });
	console.log(`Minify SCSS To File: ${scssToFileResult}\n`);

	let htmlToFileResult = await minify('test/src/dom.html',{ to: 'test/bundle/dom.html' });
	console.log(`Minify HTML To File: ${htmlToFileResult}\n`);
};

test();