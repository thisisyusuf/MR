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
			      loader: 'postcss-loader',
			      options: {
			        plugins: [
			          lost,
			        ]
			      }
			    },
			    'stylus-loader'
		      	],
		      },
		    ]
		  },
		plugins: [
		new webpack.LoaderOptionsPlugin({
    test: /\.styl$/,
    stylus: {
      // You can have multiple stylus configs with other names and use them
      // with `stylus-loader?config=otherConfig`.
      default: {
        use: [rupture()],
      },
    },
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


