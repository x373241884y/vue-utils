var path = require('path');
var webpack = require('webpack');
// Banner
var moment = require('moment');
var pkg = require('./package.json');
var banner = 'Vue utils \nversion: ' + pkg.version + ' \nrepo: http://github.com/x373241884y/vm2-utils \nbuild: ' + moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = {
	entry: './demo/main.js',
	output: {
		path: path.resolve(__dirname, './docs'),
		publicPath: '/dist/',
		filename: 'build.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					// vue-loader options go here
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: 'url-loader',
				options: {
					name: '[name].[ext]?[hash]'
				}
			}
		]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.common.js',
			'vm2-utils': path.resolve(__dirname, './src')
			// 'vue-scroller': path.resolve(__dirname, './dist/vue-scroller.min.js')
		}
	},
	devServer: {
		historyApiFallback: true,
		// noInfo: true,
		inline: true
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {

	module.exports.devtool = '#source-map';
	module.exports.entry = './src/index.js';
	module.exports.resolve = {
		alias: {
			'vue$': 'vue/dist/vue.common.js'
		}
	};
	var plugins = module.exports.plugins = [];
	plugins.push(
		new webpack.BannerPlugin({
			banner: banner,
			entryOnly: true
		})
	);

	if (process.env.BUILD == 'publishsrc') {
		module.exports.output = {
			path: path.resolve(__dirname, './dist'),
			filename: 'vm2-utils.js',
			library: 'vm2-utils',
			libraryTarget: 'umd',
			umdNamedDefine: true
		};
	} else if (process.env.BUILD == 'publish') {
		module.exports.output = {
			path: path.resolve(__dirname, './dist'),
			filename: 'vm2-utils.min.js',
			library: 'vm2-utils',
			libraryTarget: 'umd',
			umdNamedDefine: true
		};
		plugins.push.apply(plugins, [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: '"production"'
				}
			}),
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
				compress: {
					warnings: false
				}
			}),
		]);
	}
	plugins.push(new webpack.LoaderOptionsPlugin({
		minimize: true
	}));
}