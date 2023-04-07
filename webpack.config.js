/**
 * VARIABLE
 */
// common
const path = require("path");
// webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// module
const multipleHtmlPlugins = require("./src/module/htmlPage.js");
const multipleJsPlugins = require("./src/module/jsPage.js");

/**
 * CONFIG
 */
const CONFIG = {
  mode: "production", // development | production
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            // 매우중요*** hash된 이미지 경로와 이미지명을 함께 번들링해줌
            loader: "css-loader",
            options: {
              url: true,
              esModule: false,
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]",
              type: "images",
              // publicPath: path.join(__dirname, "src/images"),
              // outputPath: "images/png",
              outputPath: (url, resourcePath, context) => {
                console.log("url >>>>>>>>>>>> ", url);
                console.log("resourcePath >>> ", resourcePath);
                console.log("context >>>>>>>> ", context);
                // `resourcePath` is original absolute path to asset
                // `context` is directory where stored asset (`rootContext`) or `context` option

                // To get relative path you can use
                // const relativePath = path.relative(context, resourcePath);

                // const relativePath = path.vmdk(vmdk, resourcePath);
                // console.log("relativePath >>> ", relativePath);

                // if (/images\.png/.test(resourcePath)) {
                //   return `other_output_path/${url}`;
                // }

                // if (/images/.test(context)) {
                //   return `image_output_path/${url}`;
                // }
                let subUrl = "";
                if (resourcePath.includes("png")) subUrl = "png";
                if (resourcePath.includes("svg")) subUrl = "svg";
                return `images/${subUrl}/${url}`;

                // return `output_path/${url}`;
              },
            },
          },
          {
            loader: "image-webpack-loader",
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name]/[name].css",
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.join(__dirname, "src/images"),
    //       to: path.join(__dirname, "dist/images"),
    //     },
    //   ],
    // }),
  ].concat(multipleHtmlPlugins),
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    hot: true,
    host: "localhost",
    port: 3000,
    proxy: {
      context: () => true,
      target: "http://localhost:5000",
    },
    // proxy: [
    //   {
    //     context: ["/"],
    //     target: "http://localhost:5000",
    //   },
    // ],
    client: {
      webSocketTransport: "ws",
    },
    webSocketServer: "ws",
    onBeforeSetupMiddleware: (devServer) => {
      if (!devServer) throw new Error("webpack-dev-server is not defined");

      devServer.app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/index.html"));
      });
      devServer.app.get("/page1", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/view/page1/page1.html"));
      });
      devServer.app.get("/page2", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/view/page2/page2.html"));
      });
      devServer.app.get("/test", (req, res) => {
        res.sendFile(path.join(__dirname, "dist/view/test/test.html"));
      });

      // devServer.app.get('/some/path', function (req, res) {
      //   res.json({ custom: 'response' });
      // });
    },
  },
};

/**
 * MODULE EXPORTS
 */
module.exports = CONFIG;
