const config = require('./config')
const merge = require('webpack-merge')

module.exports = merge(config, {
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        stats: 'errors-only', // 启动与构建时的log设置
        host: '0.0.0.0',
        port: 8888,
        open: 'http://127.0.0.1:8888#/summary',
        hot: true,
        overlay: {
            errors: true,
            warnings: true
        },
        proxy: {
            '/caizhi_miniapi': {
                target: 'https://dev.qtrade.com.cn',
                secure: false,
                changeOrigin: true
            },
            '/baofei': {
                target: 'http://192.168.0.103:9098',
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '/baofei': ''
                }
            }
        }
    }
})
