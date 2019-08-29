import axios from 'axios'
import { notification } from 'antd'

const NODE_ENV = process.env.NODE_ENV
const baseURL = {
    development: '',
    production: 'dev.qtrade.com.cn',
    test: 'test.qtrade.com.cn'
}
const http = axios.create({
    baseURL: baseURL[NODE_ENV],
    timeout: 3000,
    headers: { token: sessionStorage.getItem('token') }
})

// // 添加请求拦截器
// http.interceptors.request.use(
//     config => {
//         console.log(config)
//         return config
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

// // 添加响应拦截器
// http.interceptors.response.use(
//     response => {
//         console.log(response)
//         return response
//     },
//     error => {
//         return Promise.reject(error)
//     }
// )

const request = url => params =>
    http
        .post(url, params)
        .then(res => {
            if (res && res.status === 200) return res.data
            notification.error({
                message: res.statusText
            })
            return false
        })
        .catch(error => {
            console.error(error)
        })

export default {
    login: request('/api/login'),
    menuList: request('/api/menu-list')
}
