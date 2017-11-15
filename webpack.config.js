const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve('./'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer: {
    contentBase: './',
    inline: true
  },
}