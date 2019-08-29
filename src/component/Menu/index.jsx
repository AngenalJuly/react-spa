import React, { Component, Fragment } from 'react'
import { Menu, Icon } from 'antd'

export default class extends Component {
    state = {
        list: this.props.list || [],
        defaultOpenKeys: [],
        defaultSelectedKeys: []
    }

    // componentWillReceiveProps的替代方法
    static getDerivedStateFromProps(nextProps, prevState) {
        const { defaultOpenKeys, defaultSelectedKeys } = prevState
        const list = nextProps.list || []
        const hash = window.location.hash.replace('#', '')
        if (defaultOpenKeys.length === 0) {
            list.some((item, index) => {
                if (item.children && item.children.length > 0) {
                    item.children.some(subItem => {
                        if (subItem.path === hash) {
                            defaultOpenKeys.push(String(index))
                            return true
                        }
                        return false
                    })
                }
                return false
            })
        }
        if (defaultSelectedKeys.length === 0) {
            const selectedKeys = hash === '/' ? '/main' : hash // 默认主页点亮
            defaultSelectedKeys.push(selectedKeys)
        }
        return { list, defaultOpenKeys, defaultSelectedKeys }
    }

    linkTo = hash => {
        window.location.hash = '#' + hash
    }

    render() {
        const { Item, SubMenu } = Menu
        const { list, defaultOpenKeys, defaultSelectedKeys } = this.state
        const attrs = defaultSelectedKeys.length > 0 ? { defaultSelectedKeys, defaultOpenKeys } : {}
        return (
            <Menu id="menu" theme="dark" mode="inline" {...attrs}>
                {list.map((item, index) => {
                    if (item.children && item.children.length > 0) {
                        return (
                            <SubMenu
                                key={String(index)}
                                title={
                                    <Fragment>
                                        <Icon type={item.icon || 'mail'} />
                                        <span>{item.label}</span>
                                    </Fragment>
                                }
                            >
                                {item.children.map(subItem => (
                                    <Item onClick={() => this.linkTo(subItem.path)} key={subItem.path}>
                                        {subItem.label}
                                    </Item>
                                ))}
                            </SubMenu>
                        )
                    }
                    return (
                        <Item onClick={() => this.linkTo(item.path)} key={item.path}>
                            <Icon type={item.icon || 'mail'} />
                            <span>{item.label}</span>
                        </Item>
                    )
                })}
            </Menu>
        )
    }
}
