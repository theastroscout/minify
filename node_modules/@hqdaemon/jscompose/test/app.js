process.env.test = true;
const jscompose = require("../jscompose");
let result = jscompose("test/files/file.1.js");
console.log(result);