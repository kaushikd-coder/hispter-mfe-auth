const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: path.resolve(__dirname, "./src/index.js"),
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "auto",
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    uniqueName: "authApp",
  },
  devServer: {
    port: 3001,
    static: { directory: path.resolve(__dirname, "public"), watch: true },
    // headers: { "Access-Control-Allow-Origin": "*" },
     headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
  },
    hot: false,
    liveReload: true,
    watchFiles: {
      paths: ["src/**/*", "public/**/*"],
      options: { usePolling: true, interval: 300, ignored: /node_modules/ },
    },
    client: { overlay: true, progress: true },
    open: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  resolve: { extensions: [".js", ".jsx"] },
  plugins: [
    new ModuleFederationPlugin({
      name: "authApp",
      filename: "remoteEntry.js",
      exposes: {
        "./Login": "./src/auth/Login",
        "./UserProfile": "./src/auth/UserProfile",
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        "react-dom": { singleton: true, requiredVersion: false },
      },
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html", cache: false }),
  ],
};
