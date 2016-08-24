var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
    entry: {
        vendor: [
            'handlebars', 'lodash'
        ],
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
    module: {
        loaders: [
            { test: /\.hbs$/, loader: 'handlebars-loader' },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
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
            'hbs': 'handlebars-loader'
        }
    }
}

