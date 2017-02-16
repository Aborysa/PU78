var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.resolve(__dirname, './');
var BUILD_DIR = path.resolve(APP_DIR, 'dist/');
var SRC_DIR = path.resolve(APP_DIR, 'src/');

var config = {
  entry: path.resolve(SRC_DIR,'app.js'),
  output: {
    path: BUILD_DIR,
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  modules: ["node_modules"],
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : [
          APP_DIR
        ],
        loader : 'babel'
      }
    ]
  },
  resolve: {
    root: [
      SRC_DIR
    ]
  }
};

module.exports = config;