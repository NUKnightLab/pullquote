var webpack = require('webpack'),
	path = require('path'),

	componentPath = path.resolve('./src/js');

module.exports = {
	context: path.join(__dirname), 
	entry: {
		bookmarklet: "./src/js/bookmarklet.js",
		overlay: "./src/js/overlay.js",
		compositions: "./src/js/compositions.js",
		render: "./src/js/render.js",
		index: "./src/js/index.js"
	},
	output: {
		path: path.join(__dirname, "./dist/js"),
		filename: "[name].js"
	},
	resolve: {
		root: componentPath
	},
	resolveLoader: {
		root: path.join(__dirname, "node_modules")
	}
}
