var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
    context: path.join(__dirname), 
    entry: {
        vendor: [
            'handlebars'    
        ],
        'bookmarklet': "./src/js/bookmarklet.js",
        'overlay': "./src/js/overlay.js",
        'compositions': "./src/js/compositions.js",
        'render': "./src/js/render.js"
    },
    output: {
        path: path.join(__dirname, "./dist/js"),
        filename: "[name].js",
        libraryTarget: 'var',
        library: "[name]"
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
        new webpack.optimize.CommonsChunkPlugin(
            { name: 'commons', filename: 'common.js', minChunks: 0 }
        )
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

