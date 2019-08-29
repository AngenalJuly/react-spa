import React, { Component } from 'react'
import { notification } from 'antd'
import { Route, Switch } from 'react-router-dom'
import http from 'http'
import Menu from 'component/Menu'
import asyncComponent from 'util/asyncComponent'
import './index.styl'

export default class extends Component {
    constructor(props) {
        super(props)
        if (!sessionStorage.getItem('token')) {
            notification.error({
                message: 'token失效',
                description: '请重新登录'
            })
            props.history.push('/login')
        }
        this.urlList = ['/', '/login', '/404']
        this.state = { list: [] }
    }

    componentDidMount() {
        this.getMenuList()
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.hashchange)
        sessionStorage.removeItem('token')
    }

    hashchange = () => {
        const hash = window.location.hash.replace('#', '')
        if (this.urlList.indexOf(hash) === -1) window.location.hash = '#/404'
    }

    getMenuList = () => {
        http.menuList().then(res => {
            if (res) {
                const { list } = res
                list.forEach(item => {
                    if (item.children && item.children.length > 0) {
                        item.children.forEach(subItem => {
                            this.urlList.push(subItem.path)
                        })
                    } else {
                        this.urlList.push(item.path)
                    }
                })
                window.addEventListener('hashchange', this.hashchange)
                this.setState({ list })
            }
        })
    }

    render() {
        const { list } = this.state
        return (
            <div id="home">
                <header>header</header>
                <Menu list={list} />
                <div className="content">
                    <Switch>
                        <Route path="/main" component={asyncComponent(() => import('page/Main'))} />
                        <Route path="/page1" component={asyncComponent(() => import('page/Page1'))} />
                        <Route path="/sub1" component={asyncComponent(() => import('page/Sub1'))} />
                        <Route path="/sub2" component={asyncComponent(() => import('page/Sub2'))} />
                        <Route path="/" component={asyncComponent(() => import('page/Main'))} />
                    </Switch>
                </div>
                <footer>footer</footer>
            </div>
        )
    }
}
