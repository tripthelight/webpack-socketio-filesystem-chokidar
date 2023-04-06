/**
 * VARIABLE
 */
// common
const path = require("path");
const PORT = process.env.PORT || 5000;
// express
const express = require("express");
const app = express();
// webpack
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackDevMiddleware = require("webpack-dev-middleware");
const WebpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config.js");
const compiler = webpack(webpackConfig);
// socket.io
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io");
const socketServer = io(server);
// file system
const fs = require("fs");
// watcher
const fc = require("./src/module/watcher.js");
const chokidar = require("chokidar");
const watcher = chokidar.watch("src", {
  persistent: false,
  // ignoreInitial: false, // Ignore files on server start - true: 모든 파일 체크 안함
  // // ignored: "dist/XXX.html", // dist/XXX.html 파일 체크 안함: once
  // ignored: ["dist/XXX1.html", "dist/XXX2.html"], // dist/XXX1.html, dist/XXX2.html 파일 체크 안함: multiple
});
// 캐시 삭제
const rimraf = require("rimraf");

/**
 * file systme
 */
const fileSystem = (_file) => {
  fs.readFile("./src/JSON/file.json", "utf8", (err, data) => {
    const FILE_LIST = JSON.parse(data);
    const DELETE_LIST = _file;
    for (let i = 0; i < FILE_LIST.length; i++) {
      if (FILE_LIST[i] === DELETE_LIST) {
        FILE_LIST.splice(i, 1);
        i--;
      }
    }
    fs.writeFile(
      "./src/JSON/file.json",
      JSON.stringify(FILE_LIST),
      "utf8",
      (err) => {
        if (err === null) {
          console.log("success");
        } else {
          console.log("fail");
        }
      }
    );
  });
};

/**
 * 캐시 삭제
 * * 캐시 디렉토리를 찾아서 삭제합니다.
 */
function clearWebpackCache() {
  const cacheDirectory = path.resolve(__dirname, "node_modules/.cache/webpack");
  rimraf.sync(cacheDirectory);
  console.log("Webpack cache has been cleared");
}

/**
 * MIDDLEWARE
 */
// express
app.use(express.static(path.join(__dirname, "dist")));

// webpack
app.use(WebpackHotMiddleware(compiler));
app.use(
  WebpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
  })
);

/**
 * ROUTER
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});
app.get("/page1", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/view/page1/page1.html"));
});
app.get("/page2", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/view/page2/page2.html"));
});

/**
 * LISTEN
 */
server.listen(PORT, () => {
  console.log(`SOCKET.IO SERVER START \n http://localhost:${PORT}`);
});

/**
 * SOCKET IO
 */
socketServer.on("connection", (socket) => {
  console.log(`SOCKET IO SERVER CONNECT`);
});

/**
 * watcher
 * dist폴더의 파일 생성(add), 삭제(unlink), 수정(change) 체크
 */
watcher.on("ready", () => {
  // console.log(`DIST FILE READY >>>`);
});
// dist folder addition file check
watcher.on("add", (path) => {
  // console.log(`DIST ADD FILE PATH >>> ${path}`);
});
// dist folder delete file check
watcher.on("unlink", (_path) => {
  if (webpackConfig.entry.hasOwnProperty(fc(_path).name)) {
    delete webpackConfig.entry[fc(_path).name];
  }
  webpackConfig.plugins = webpackConfig.plugins.filter((plugin) => {
    return (
      plugin instanceof MiniCssExtractPlugin ||
      (plugin instanceof HtmlWebpackPlugin &&
        plugin.options.filename !== `${fc(_path).name}.${fc(_path).ext}`)
    );
  });
  fileSystem(fc(_path).name);
  clearWebpackCache();
  // webpack(webpackConfig, (err, stats) => {
  //   if (err || stats.hasErrors()) {
  //     console.error(err || stats.toJson().errors);
  //   }
  //   console.log("Webpack has finished building");
  // });
});
// dist folder change file check
watcher.on("change", (path) => {
  // console.log(`DIST CHANGE FILE PATH >>> ${path}`);
});
// dist folder error check
watcher.on("error", (error) => {
  // console.log(`DIST ERROR >>> ${error}`);
});
