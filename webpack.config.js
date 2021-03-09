// webpack.config.js

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
// const PrettierPlugin = require("prettier-webpack-plugin")

const devMode = process.env.NODE_ENV === 'development'
const prodMode = !devMode

module.exports = {
  mode: 'development',
  context: __dirname,
  entry: { index: path.resolve(__dirname, "src", "js", "index.js") },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: 'index.html',
      minify: {
        collapseWhitespace: prodMode,
      },
    }),
    // ,
    new StylelintPlugin({
      filename: 'main.scss'
    })
    // ,
    // new PrettierPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '/fonts/[name].[hash].[ext]',
          },
        },
      },
    ]
  }
}