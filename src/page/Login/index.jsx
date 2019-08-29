import React, { Component } from 'react'
import { Input, Button, notification } from 'antd'
import http from 'http'
import './index.styl'

export default class extends Component {
    state = {}

    onChange = (name, value) => {
        this.setState({ [name]: value })
    }

    login = () => {
        const { username, password } = this.state
        if (!password || !username) {
            notification.error({
                message: '账号密码不可为空！',
                description: '请重新输入'
            })
            return
        }

        http.login({ username, password }).then(res => {
            if (res) {
                sessionStorage.setItem('token', res.token)
                this.props.history.push('/')
            }
        })
    }

    render() {
        return (
            <div id="login">
                <div className="form">
                    <Input placeholder="账号" onChange={e => this.onChange('username', e.target.value)} />
                    <Input placeholder="密码" onChange={e => this.onChange('password', e.target.value)} type="password" />
                    <Button type="primary" onClick={this.login} block>
                        登录
                    </Button>
                </div>
            </div>
        )
    }
}
