const config = require('./config')
const merge = require('webpack-merge')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(config, {
    plugins: [new CleanWebpackPlugin()],
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /(\.css|\.styl)$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        },
        minimizer: [new OptimizeCSSAssetsPlugin({})]
    }
})
