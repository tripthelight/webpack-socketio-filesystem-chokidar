/**
 * VARIABLE
 */
// common
const path = require("path");
// webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// module
const multipleHtmlPlugins = require("./src/module/htmlPage.js");
const multipleJsPlugins = require("./src/module/jsPage.js");

/**
 * CONFIG
 */
const CONFIG = {
  mode: "production",
  // devtool: "source-map",
  target: ["web", "es6"],
  watch: true,
  cache: false,
  entry: multipleJsPlugins,
  output: {
    path: path.join(__dirname, "dist"),
    filename: "js/[name]/[name].js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]/[name].css",
    }),
  ].concat(multipleHtmlPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    hot: true,
    host: "localhost",
    port: 3000,
    proxy: [
      {
        context: ["/", "/page1"],
        target: "http://localhost:5000",
      },
    ],
    client: {
      webSocketTransport: "ws",
    },
    webSocketServer: "ws",
  },
};

/**
 * MODULE EXPORTS
 */
module.exports = CONFIG;
