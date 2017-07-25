var pkg = require('./package.json')
var path = require('path')
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/index.js'),
    // 将第三方依赖（node_modules中的）单独打包
    vendor: Object.keys(pkg.dependencies)
  },
  output: {
    path: __dirname + "/build",
    filename: "js/[name].[chunkhash:8].js"
  },

  resolve:{
      extensions: ['.js','.jsx']
  },

  module: {
    rules: [
        { 
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        { 
            test: /\.less$/, 
            exclude: /node_modules/, 
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader', 
                use: [
                    {
                        loader:'css-loader'
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
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            })
        },
        { 
            test: /\.css$/,
            exclude: /node_modules/,
            use : ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader:'css-loader'
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
            })
        },
        { 
            test:/\.(png|gif|jpg|jpeg|bmp)$/i, 
            loader:'url-loader',
            options:{
                limit: 5000,
                name: 'img/[name].[chunkhash:8].[ext]'
            } 
        },

        { 
            test:/\.(png|woff|woff2|svg|ttf|eot)($|\?)/i, 
            loader:'url-loader',
            options: {
                limit: 5000,
                name: 'fonts/[name].[chunkhash:8].[ext]'
            }
        }
    ]
  },
  devtool: 'source-map',
  plugins: [
    // webpack 内置的 banner-plugin
    new webpack.BannerPlugin({
        banner: "Copyright by wangfupeng1988@github.com."
    }),

    // html 模板插件
    new HtmlWebpackPlugin({
        template: __dirname + '/app/index.html'
    }),

    // 定义为生产环境，编译 React 时压缩到最小
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    
    new webpack.optimize.UglifyJsPlugin({
        compress: {
          //supresses warnings, usually from module minification
          warnings: false
        }
    }),
    
    // 分离CSS和JS文件
    new ExtractTextPlugin({
        filename: 'css/[name].[chunkhash:8].css'
    }), 
    
    // 提供公共代码
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name].[chunkhash:8].js'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ]
}