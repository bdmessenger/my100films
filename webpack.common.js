const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            favicon: path.resolve(__dirname, 'public', 'favicon.ico'),
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /[\\/]node_modules[\\/]/,
                use: {
                  loader: 'babel-loader',
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.svg$/,
                use: [
                  {
                    loader: 'svg-url-loader',
                    options: {
                      limit: 10000,
                    },
                  },
                ],
            }
        ]
    }
}