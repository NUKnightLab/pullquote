var webpack = require('webpack'),
    path = require('path'),

    componentPath = path.resolve('./src/js');

module.exports = {
    context: path.join(__dirname), 
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
    resolve: {
        root: componentPath
    },
    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    },
    module: {
        loaders: [{
            test: /\.hbs$/,
            loader: __dirname + "../../../",
            query: {
                partialDirs: [
                    path.join(__dirname, 'src', 'templates', 'layouts')
                ]
            }
        }]
    }
}

