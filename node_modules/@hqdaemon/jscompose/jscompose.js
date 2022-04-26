(() => {
	const fs = require("fs");
	var jscompose = function(path){
		if(path === undefined || path === null){
			return jscompose._error("The path is not specified");
		}

		if(!fs.existsSync(path)){
			return jscompose._error(`File ${path} Not Found`);
		}

		let jsFile = fs.readFileSync(path);
		if(!jsFile){
			return jscompose._error("Can't Read The File");
		}

		let jsStr = jsFile.toString();

		let dir = path.replace(/([^/]+)\.js$/,"");
		let match = jsStr.matchAll(/require\(\"([^"]+)\"\)\;\n?|import \"([^"]+)\";\n?/g);
		for(let i of match){
			let file = i[1] || i[2];
			if(!file.match(/\.js$/)){
				file += ".js";
			}
			let code;
			if(fs.existsSync(dir+file)){
				code = fs.readFileSync(dir+file).toString()+"\n";
			} else {
				code = `// ${file} Not Found\n`;
			}
			jsStr = jsStr.replace(i[0],code);
		}

		return jsStr;
	};

	jscompose._error = (err) => {
		if(process.env.test !== undefined && process.env.test !== null){
			throw new Error(err);
		}
		return false;
	};

	module.exports = jscompose;
})();