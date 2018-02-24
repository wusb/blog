const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: ['./src/main.js']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: "/",
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|build)/,
        query: {
          presets: ['env']
        }
      }, {
        test: /\.scss$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader",
          options: {
            modules: true,
            localIdentName: '[name]_[local]_[hash:base64:3]'
          },
        }, {
          loader: "sass-loader"
        }]
      }, {
        test: /\.css$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }]
      }
    ]
  },
  devServer: {
    inline: true,
    hot: true,
    historyApiFallback: true,
    port: process.env.PORT || 8097
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './public/index.html',
      inject: "body",
      minify: {
        caseSensitive: false,
        collapseBooleanAttributes: true,
        collapseWhitespace: true
      },
      hash: true,
      cache: true,
      showErrors: true,
      chunks: "app",
      chunksSortMode: "auto",
      excludeChunks: "",
      xhtml: false
    })
  ]
};
