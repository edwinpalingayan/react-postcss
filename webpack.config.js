const webpack = require('webpack'); // webpack itself
const path = require('path'); // node dependecy when dealing with path
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin'); // extract css into a dedicated file
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // uglify js output
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


let config = {

	entry: './src/index.js', // entry file
	output: {
		path: path.resolve(__dirname, './public'), // output path
		filename: 'output.js' // output filename
	},
	module: {
		rules: [
			{
				test: /\.js$/, // files ending with .js
				exclude: /node_modules/, // exclude the node_modules directory
				loader: "babel-loader" // use this (babel-core) loader
			},
			{
				test: /\.scss$/, // files ending with .scss
				use: ExtractTextWebpackPlugin.extract({ // call out plug in with exract method
					use: ['css-loader', 'sass-loader'], // use this loader
					fallback: 'style-loader' // fallback for any CSS not extracted
				}) // end
			}
		] // end rules
	},
	plugins: [
		new ExtractTextWebpackPlugin('styles.css') // call the ExtractTextWebpackPlugin contructor and name our css file
	],
	devServer: {
		contentBase: path.resolve(__dirname,'./public'), // A directory or URL to server HTML content form.
		historyApiFallback: true, // fallback to /index.html for Single Page Applications.
		inline: true, // inline mode (set to false to disable including client scripts like "livereload")
		open: true // opn default browser while launching
	},
	devtool: 'eval-source-map' // enable devtool for better debugging experience
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin(), // call uglify plugin
		new OptimizeCssAssetsPlugin() // call the css optimizer (minify)
	);
}