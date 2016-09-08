var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
    entry: {
        bookmarklet: "./src/js/bookmarklet.js",
        overlay: "./src/js/overlay.js",
        compositions: "./src/js/compositions.js",
        render: "./src/js/render.js"
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js",
        libraryTarget: 'var',
        library: "[name]"
    },
    node: {
        fs: "empty"
    },
    plugins:  [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
          'API_URL': JSON.stringify(process.env.API_URL || 'http://localhost:8080/')
        }
      })
    ],
    resolve: {
        root: componentPath,
        alias: {
            'handlebars': 'handlebars/dist/handlebars.js'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
        alias: {
            'hbs': 'handlebars'
        }
    }
}

