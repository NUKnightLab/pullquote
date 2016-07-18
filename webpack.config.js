var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
  context: path.join(__dirname),
  entry: {
    script: "./src/js/script.js"
  },
  output: {
    path: path.join(__dirname, "./dist/js"),
    filename: "[name].js",
    libraryTarget: 'var',
    library: "[name]"
  },
  resolve: {
    root: componentPath
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  }
}
