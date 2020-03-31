const path = require('path')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'
const webpackConfig = {
    mode: process.env.NODE_ENV,
    entry:'./src/assets/date-time-picker.scss',
    output:{
        filename:'style.css',
        path:path.join(__dirname,'./css-dist')
    },
    resolve: {
        modules: ['node_modules'],
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
                test: /\.(scss|css)$/,
                use: [
                    isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
        ]
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin("styles.css")
    ],
}


module.exports = webpackConfig
