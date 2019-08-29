/** 拓展 Date 原型方法 */

/**
 * 对 Date 的扩展，将 Date 转化为指定格式的 String
 * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *
 * e.g : (new Date()).format("yyyy-MM-dd hh:mm:ss.S") => 2006-07-02 08:09:04.423
 *       (new Date()).format("yyyy-M-d h:m:s.S")      => 2006-7-2 8:9:4.18
 *
 *  @param fmt 格式化公式
 */
Date.prototype.format = function(fmt) {
    let o = {
        'M+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        S: this.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
    return fmt
}

// 获取相对UI稿，屏幕的缩放比例，主要echarts中用
window.scale = document.body.clientWidth / 750
// 设置图表的颜色备选
window.colors = ['#F871CF', '#B14DEB', '#1A68E8', '#50A3FF', '#51D8FF', '#31BC8D', '#9AD658', '#FFC751', '#FF9751', '#FF5951', '#B3B3B3']
// 动态设置html的font-size
document.querySelector('html').style.fontSize = 100 * window.scale + 'px'
