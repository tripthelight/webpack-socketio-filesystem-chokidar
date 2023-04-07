const HtmlWebpackPlugin = require("html-webpack-plugin");
const PAGES = require("./pages.js");

const multipleHtmlPlugins = PAGES.html.map((name) => {
  return new HtmlWebpackPlugin({
    template:
      name === "index"
        ? `./src/${name}.html`
        : `./src/view/${name}/${name}.html`,
    filename: name === "index" ? `${name}.html` : `view/${name}/${name}.html`,
    chunks: [`${name}`],
  });
});

module.exports = multipleHtmlPlugins;
