const path = require("path");
const isDev = process.env.NODE_ENV !== "production";
const glob = require("glob-all");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const PostCSSPresetEnv = require("postcss-preset-env");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, ""),
  root: path.join(__dirname),
};

module.exports = {
  mode: isDev ? "development" : "production",
  stats: {
    colors: true,
    preset: "minimal",
  },
  performance: { hints: isDev ? false : "warning" },
  devtool: isDev ? "cheap-module-source-map" : "source-map",
  entry: [
    // path.resolve(__dirname, "src/js/index.js"),
    path.resolve(__dirname, "sass/tg.scss"),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "_site/assets"),
    publicPath: "/assets/",
  },
  plugins: [
    new WebpackManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    ...(!isDev
      ? [
          new PurgeCSSPlugin({
            paths: glob.sync([`${PATHS.src}/**/*`, `${PATHS.root}/**/*`], {
              nodir: true,
            }),
            content: ["*.js", "*.njk", "*.yaml"],
          }),
        ]
      : []),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "js/"),
          to: path.resolve(__dirname, "_site/assets/js/"),
        },
        {
          from: path.resolve(__dirname, "img/"),
          to: path.resolve(__dirname, "_site/assets/img/"),
        },
      ],
    }),
  ],
  ...(!isDev && {
    optimization: {
      minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    },
  }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s?css/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                syntax: require("postcss-scss"),
                plugins: [
                  require("postcss-import"),
                  require("autoprefixer"),
                  require("postcss-url", { url: "rebase" }),
                  PostCSSPresetEnv,
                ],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset",
        generator: {
          filename: `assets/img/[name][ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: `webfonts/[name][ext]`,
        },
        include: path.resolve(__dirname, "node_modules"),
      },
      {
        test: /\.css$/i,
        use: ["css-loader"],
      },
    ],
  },
};
