const PAGES = require("./pages.js");

let jsArr = new Object();
for (let i = 0; i < PAGES.length; i++)
  jsArr[PAGES[i]] = `./src/js/${PAGES[i]}/${PAGES[i]}.js`;
const multipleJsPlugins = jsArr;
module.exports = multipleJsPlugins;
