const nodeExternals = require("webpack-node-externals");
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./server.ts",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "server.js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: "./tsconfig.json",
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ["ts-loader"],
      },
    ],
  },
  externals: [nodeExternals()],
};
