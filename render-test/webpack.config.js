
const path = require('path')

const config = {
  entry: './render-test/entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json' },
      { test: /\.md$/, exclude: /node_modules/, loader: 'html!markdown' }
    ]
  },
  devServer: {
    contentBase: 'render-test'
  }
}

module.exports = config

