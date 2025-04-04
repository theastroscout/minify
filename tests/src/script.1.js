import "script.3.js";
require("script.2.js");

((params) => {
	var app = {
		init: () => {
			let newParam = requiredModule3(params);
			return requiredModule2(newParam);
		}
	};
	app.init();
})(params);