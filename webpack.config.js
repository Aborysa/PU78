const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'client/app/');
var BUILD_DIR = path.resolve(__dirname, 'server/public/dist/');
var SRC_DIR = path.resolve(APP_DIR, 'src/');

var config = {
  entry: path.resolve(SRC_DIR,'app.jsx'),
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  modules: ["node_modules"],
  module : {
    loaders : [
      {
        test: /\.css$/, loader: 'style!css'
      },
      {
        test: /\.test.jsx?$/,
        exclude: /node_modules/,
        loader: 'ignore-loader'
      },
      {
        test : /\.jsx?$/,
        include : [
          APP_DIR
        ],
        exclude: /node_modules/,
        loader : 'babel'
      }
    ]
  },
  resolve: {
    root: [
      SRC_DIR
    ]
  },
  devServer: {
    historyApiFallback: {
      index: '/app/'
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      moment: "moment",
      "window.moment": "moment",
      fullcalendar: "fullcalendar",
      "window.fullcalendar": "fullcalendar"
    })
  ]
};

module.exports = config;
