var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var poststylus = require('poststylus');
var webpack = require('webpack');
var rupture = require('rupture');
var lost = require('lost');

module.exports = {
        entry: './src/index.js',
        output: {
        	path: path.resolve(__dirname, 'dist'),
            filename: 'app.bundle.js'
		},
		module: {
		    rules: [
		      {
		      	test: /\.styl$/, 
		      	use: [
		      	'style-loader', 
		      	'css-loader', 
		      	{
		          loader: 'stylus-loader',
			          options: {
			          	// Set Stylus Plugins via 'stylus-loader' options here
			            use: [rupture()],
			          },
		         },
		      	],
		      },
		    ]
		  },
		plugins: [
		/* Set Post Css Plugins + Stylus via 'poststylus' options here*/
			new webpack.LoaderOptionsPlugin({
				options: {
					stylus: {
					use: [poststylus([ 'lost' ])]
					}
				}

			  }),
			new HtmlWebpackPlugin({
				title: 'Homepage',
				filename: 'index.html'
			}),
			new HtmlWebpackPlugin({
				title: 'Category',
				filename: 'category.html'
			}),
			new HtmlWebpackPlugin({
				title: 'Article',
				filename: 'article.html'
			}),
		]
}


