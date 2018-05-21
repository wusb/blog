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
    rules: [
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
  plugins: [
    new webpack.DefinePlugin({ // 定义环境变量
      "process.env": JSON.stringify(process.env.NODE_ENV)
    }),
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
  ],
  resolve: {
    alias: {
      components: path.join(__dirname, '../../components'),
      actions: path.join(__dirname, '../../src/actions')
    }
  }
};
