var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var poststylus = require('poststylus');
var webpack = require('webpack');
var rupture = require('rupture');
var lost = require('lost');
var cssnano = require('cssnano');
var autoprefixer = require('autoprefixer');
var postcssfontmagician = require('postcss-font-magician');
var Extract = require('extract-text-webpack-plugin');

module.exports = {
        entry: {
          app: './src/index.js'
      },
        output: {
        	path: path.resolve(__dirname, 'dist'),
            filename: '[name].bundle.js'
		},
		module: {
		    rules: [
		      {
		      	test: /\.styl$/,
		      	use: Extract.extract({
              fallbackLoader: 'style-loader',
              loader: ['css-loader',
  		      	{
    			      loader: 'postcss-loader',
    			      options: {
    			        plugins: [
    			          lost,
    			          /*cssnano,*/
    			          autoprefixer,
    			          postcssfontmagician
      			        ]
      			      }
    			    },
  			    'stylus-loader'],
            publicPath: ' ',
            })
		      },
          {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'file-loader?name=styles/[name].[ext]'
          },
		    ]
		  },
		plugins: [
      new Extract({
        filename: "app.css",
        disable: false,
        allChunks: true
      }),
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
				filename: 'index.html',
				template: './src/index.html'
			}),
			new HtmlWebpackPlugin({
				title: 'Category',
				filename: 'category.html',
				template: './src/category.html'
			}),
			new HtmlWebpackPlugin({
				title: 'Article',
				filename: 'article.html',
				template: './src/article.html'
			}),
		]
}
