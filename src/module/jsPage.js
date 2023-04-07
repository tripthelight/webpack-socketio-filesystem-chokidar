const PAGES = require("./pages.js");

let jsArr = new Object();
for (let i = 0; i < PAGES.js.length; i++)
  jsArr[PAGES.js[i]] = `./src/js/${PAGES.js[i]}/${PAGES.js[i]}.js`;
const multipleJsPlugins = jsArr;

module.exports = multipleJsPlugins;
