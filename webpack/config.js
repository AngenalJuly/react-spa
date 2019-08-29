const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const Happypack = require('happypack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const NODE_ENV = process.env.NODE_ENV
// 除了development，还有production和test，后2个走同一套逻辑
const isDev = NODE_ENV === 'development'

const config = {
    entry: path.resolve(__dirname, '../') + '/src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: isDev ? 'js/[hash:8].js' : 'js/[chunkhash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.styl$/,
                use: [
                    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['last 2 version']
                                })
                            ],
                            name: isDev ? 'css/[name].[ext]' : 'css/[name].[contenthash:8].[ext]'
                        }
                    },
                    'stylus-loader'
                ]
            },
            {
                test: /(\.jsx|\.js)$/,
                use: 'happypack/loader?id=js',
                exclude: /node_modules/
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.ico$/],
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: isDev ? 'image/[name].[ext]' : 'image/[name].[contenthash].[ext]'
                }
            },
            {
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader',
                options: {
                    limit: 20000,
                    name: isDev ? 'font/[name].[ext]' : 'font/[name].[contenthash].[ext]'
                }
            }
        ]
    },
    plugins: [
        new HtmlPlugin({
            template: path.resolve(__dirname, '../index.html'),
            favicon: path.resolve(__dirname, '../favicon.ico')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // production和test的唯一区别
                NODE_ENV: JSON.stringify(NODE_ENV)
            }
        }),
        new MiniCssExtractPlugin({
            filename: isDev ? 'css/[name].css' : 'css/[name].[contenthash:8].css',
            chunkFilename: isDev ? 'css/[id].css' : 'css/[id].[contenthash:8].css',
            ignoreOrder: false
        }),
        new Happypack({
            id: 'js',
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-proposal-class-properties', ['import', { libraryName: 'antd', style: 'css' }]]
                    }
                }
            ]
        })
    ],
    resolve: {
        alias: {
            component: path.resolve(__dirname, '../src/component'),
            http: path.resolve(__dirname, '../src/http'),
            asset: path.resolve(__dirname, '../src/asset'),
            mock: path.resolve(__dirname, '../src/mock'),
            page: path.resolve(__dirname, '../src/page'),
            util: path.resolve(__dirname, '../src/util')
        },
        extensions: ['.jsx', '.js', '.json', '.styl', '.css']
    }
}

module.exports = config
