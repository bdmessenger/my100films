const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    'css-loader', 
                    'postcss-loader'
                ]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
        //   maxInitialRequests: Infinity,
        //   minSize: 0,
        //   cacheGroups: {
        //     vendor: {
        //       test: /[\\/]node_modules[\\/]/,
        //       name(module) {
        //         // get the name. E.g. node_modules/packageName/not/this/part.js
        //         // or node_modules/packageName
        //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    
        //         // npm package names are URL-safe, but some servers don't like @ symbols
        //         return `${packageName.replace('@', '')}`;
        //       },
        //     },
        //   },
        },
    },
})