import Mock from 'mockjs'
const host = ''
const mockFn = (url, result, type) => Mock.mock(host + url, type || 'post', result)

// 登录token
mockFn('/api/login', { token: /[a-z][A-Z]{24}/ })

// 菜单列表
mockFn('/api/menu-list', {
    list: [
        { path: '/main', label: '主页', icon: 'dot-chart', children: [] },
        { path: '/page1', label: '测试页1', icon: 'radar-chart', children: [] },
        {
            path: '/page2',
            label: '测试页2',
            icon: 'area-chart',
            children: [{ path: '/sub1', children: [], label: '子页1' }, { path: '/sub2', children: [], label: '子页2' }]
        }
    ]
})
