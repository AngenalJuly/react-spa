import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import asyncComponent from 'util/asyncComponent'

export default class extends Component {
    // 错误捕获
    componentDidCatch(error, info) {
        console.log(error, info)
    }

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={asyncComponent(() => import('page/Login'))} />
                    <Route path="/404" component={asyncComponent(() => import('page/NotFound'))} />
                    <Route path="/" component={asyncComponent(() => import('page/Home'))} />
                </Switch>
            </HashRouter>
        )
    }
}
