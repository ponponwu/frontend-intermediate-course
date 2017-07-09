var webpack = require('webpack');
let uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
  entry: __dirname + '/src/js/getTwitch.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
        query: {
          presets: ['es2015','react']
        }
      }
    ]
  }
};
