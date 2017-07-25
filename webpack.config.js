var path = require('path')
var webpack = require('webpack')

var HtmlWebpackPlugin = require('html-webpack-plugin')
var op = require('open-browser-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, 'app/index.js'),
	output:{
		path: path.resolve(__dirname, 'app/index.js'),
		filename: "dist/bundle.js"
	},
	resolve: {
        extensions: ['.js','.jsx']
    },
	module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: /app/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use : [
                    {
                        loader : 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options : {
                            plugins : function() {
                                return [
                                    require('autoprefixer')({
                                        broswers : ['last 5 versions']
                                    })
                                ];
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|svg|gif|jpeg|bmp)$/,
                loader: 'url-loader',
                options: {
                    limit: 5000
                }
            }
        ]
    },
    plugins: [
    	//往前端塞一个全局变量 true or false
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: __dirname + '/app/index.html'
        }),
         // webpack完成后自动打开浏览器
        new op({
            url: 'http://localhost:3000'
        })
    ],
    devtool: 'eval-source-map',
    devServer: {
      //此处是webpack-dev-server的配置
        contentBase: './public',
        //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
        historyApiFallback: true,
        inline: true,
        hot: true,
        port:3000 
    }


}