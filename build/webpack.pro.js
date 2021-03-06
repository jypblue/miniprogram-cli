const config = require(`${process.cwd()}/config`);
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.base');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common,
	{
		mode: 'production',
		devtool: process.env.GENERATE_SOURCEMAP !== 'false' ? 'source-map' : 'none',
		performance: {
			hints: 'warning'
		},
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					sourceMap: true // set to true if you want JS source maps
				}),
				new OptimizeCSSAssetsPlugin({
					assetNameRegExp: /\.(ttss|wxss)\.*(?!.*map)/g,
					cssProcessor: require('cssnano'),
					cssProcessorPluginOptions: {
						preset: ['default', {
							discardComments: { removeAll: true },
							calc: false
						}]
					},
					canPrint: true
				})
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': config[process.env.CONF || 'build'].env
			})
		]
	}
);
