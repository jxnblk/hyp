
const path = require('path')

const config = {
  entry: './demo/entry.js',
  output: {
    path: path.join(__dirname, 'demo'),
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
    contentBase: 'demo'
  }
}

module.exports = config

