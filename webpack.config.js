var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
    entry: {
        vendor: [
            'handlebars', 'lodash'
        ],
        'bookmarklet': "./src/js/bookmarklet.js",
        'overlay': "./src/js/overlay.js",
        'compositions': "./src/js/compositions.js",
        'render': "./src/js/render.js"
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js",
    },
    module: {
        loaders: [
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash"
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
    ],
    node: {
        fs: "empty"
    },
    resolve: {
        root: componentPath,
        alias: {
            'handlebars': 'handlebars/runtime.js'
        }
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules"),
        alias: {
            'hbs': 'handlebars-loader'
        }
    }
}

