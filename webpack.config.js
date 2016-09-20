const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const validate = require('webpack-validator');
const parts  = require('./lib/parts');
const pkg = require('./package.json');

const PATHS = {
	app: path.join(__dirname,'app/index.js'),
	build: path.join(__dirname,'build'),
	// style: path.join(__dirname,'app/style/base.scss')
	// vendor: Object.keys(pkg.dependencies)
}

const common = {
	entry: {
		app: PATHS.app,

	},
	output: {
		path: PATHS.build
	},
	module:{
		loaders:[
			{ test: /\.css$/, loader: "style!css" },
			{
				test: /\.scss$/,
				loaders: ['style','css','sass']
			},
			{
				test: /\.sass$/,
				loaders: ['style','css','sass']
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
		title:'p5 animation',
		template: path.join(__dirname,'app/index.html')
	})]
}

var config;

switch(process.env.npm_lifecycle_event) {
	case 'build':
		config = merge(common,
						{
						 devtool: 'source-map',
						 output: {
						 	path:PATHS.build,
						 	filename:'[name].[chunkhash].js',
						 	chunkFilename: '[chunkhash].js'
						 }
					   	},
						parts.clean(PATHS.build),
						parts.setFreeVariable('process.env.NODE_ENV','production'),
						parts.minify()
					)

		break;
	case 'start':
		config = merge(common,

						{
						    devtool: 'eval-source-map'
						},
					    parts.devServer({
					    	host: process.env.HOST,
					    	port: process.env.PORT
					    })
					)
		break;
	default:
		config = merge(common,
						{
						    devtool: 'eval-source-map'
						},
					    parts.devServer({
					    	host: process.env.HOST,
					    	port: process.env.PORT
					    })
					)
}


module.exports = validate(config,{
	quiet: true
});
