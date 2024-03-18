((params) => {
	require("script.2.js");
	import "script.3.js";
	var app = {
		init: () => {
			let newParam = requiredModule3(params);
			return requiredModule2(newParam);
		}
	};
	app.init();
})(params);