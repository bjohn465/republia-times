"use strict";

var webpack = require( "webpack" );
var plugins = [];

if ( "production" === process.env.NODE_ENV ) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			comments: /.^/, // Regular expression that should match nothing
			sourceMap: false
		}),

		new webpack.optimize.OccurenceOrderPlugin( true )
	]);
}

module.exports = {
	entry: "./src/index.js",
	output: {
		path: __dirname + "/build",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: "envify-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: /node_modules/
			}
		]
	},
	plugins: plugins
};
