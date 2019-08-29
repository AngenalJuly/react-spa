import React from 'react'
import ReactDOM from 'react-dom'
import Router from './Router'
import 'mock'
import 'asset/font/iconfont.css'
import 'antd/dist/antd.css'
import './index.styl'
import 'util/helper.js' // 此文件放入主动执行的js代码

ReactDOM.render(<Router />, document.getElementById('root'))
