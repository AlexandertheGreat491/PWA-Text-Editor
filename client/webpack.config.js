const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Webpack Plugin",
      }),
      new WebpackPwaManifest({
        name: "PWA-Text-Editor Application",
        short_name: "Text Editor",
        description: "Edit that text!",
        background_color: "#000000",
        theme_color: "#31a9e1",
        start_url: "./",
        icons: [
          {
            src: path.resolve("src/images/icon-manifest.png"),
            sizes: [72, 96, 128, 144, 152, 192, 384, 512],
            destination: path.join("assets", "icons"),
          },
          {
            src: path.resolve("src/images/icon-manifest.png"),
            size: "1024x1024",
            destination: path.join("assets", "icons"),
            purpose: "maskable",
          },
        ],
      }),
    ],

    module: {
      // Adds CSS loaders and babel to the webpack.
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.n?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
  };
};
