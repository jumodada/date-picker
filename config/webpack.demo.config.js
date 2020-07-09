const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const isProd = process.env.NODE_ENV === 'production'

const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry:'./Docs/index.js',
    output:{
        filename:'[name].[hash].js',
        path:path.join(__dirname,'./dist')
    },
    resolve: {
        extensions: ['.ts','.tsx','.js', '.vue', '.json'],
        modules: ['node_modules'],
        alias: {
            'vue': 'vue/dist/vue.js'
        }
    },
    devServer: {
        host: '0.0.0.0',
        port: 8033  ,
        publicPath: '/',
        hot: true
    },
    performance: {
        hints: false
    },
    stats: {
        children: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader'
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader',
                    {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: path.resolve(__dirname, '../Docs/assets/styles/global.scss')
                        }
                    }
                ]
            },
            {
                test: /\.svg/,
                use: ['file-loader']
            },
            {
                test: /\.md$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            }
                        }
                    },
                    {
                        loader: path.resolve(__dirname, '../Docs/md-loader/index.js')
                    }
                ]
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './Docs/index.html',
            filename: './index.html',
            favicon: './Docs/assets/icon/favicon.ico'
        }),
        new ProgressBarPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.FAAS_ENV': JSON.stringify(process.env.FAAS_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            vue: {
                compilerOptions: {
                    preserveWhitespace: false
                }
            }
        })
    ],
    optimization: {
        minimizer: []
    },
    devtool: '#eval-source-map'
}

if (isProd) {
    webpackConfig.externals = {
        vue: 'Vue',
        'vue-router': 'VueRouter',
    }

    webpackConfig.optimization.splitChunks = {
        chunks:'initial'
    }
    webpackConfig.devtool = false
}

module.exports = webpackConfig
