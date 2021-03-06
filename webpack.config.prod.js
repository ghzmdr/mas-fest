var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var HtmlPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: './src/main.js',
	output: {
		path: './build',
		filename: '[name].js',
		publicPath: '/',
	},

	module: {
		loaders: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: 'babel',
				query: {
					presets: ['es2015']
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap')
			},
			{ test: /\.(svg|jpg|png|gif|woff)$/, loader: 'url?limit=10000'},
			{ test: /\.(mp4|webm)$/, loader: 'file'},
			{ test: /\.json$/, loader: 'json' },
			{ test: /\.html$/, loader: 'html?attrs[]=img:src&attrs[]=source:src&attrs[]=video:poster' }
		]
	},

	postcss: function() {
		return [autoprefixer]
	},

	plugins: [
		new HtmlPlugin({
			filename: 'index.html',
			template: './src/html/index.html',
			inject: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),

		new ExtractTextPlugin('[name].css')
	],

	resolve: {
		extensions: ['', '.js', '.js', '.json', '.scss']
	}
}
