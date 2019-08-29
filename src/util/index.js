/** 将url的search部分转化为json
 *  @param url:String -- url地址
 */
export const urlToJson = url => {
    const search = url.split('?')[1]
    return search
        ? search.split('&').reduce((obj, item) => {
              const arr = item.split('=')
              return { ...obj, [arr[0]]: arr[1] }
          }, {})
        : {}
}

/** 将json转换为url的search部分
 *  @param json:Object
 */
export const jsonToUrl = (json = {}) => {
    return Object.keys(json)
        .reduce((result, item) => `${result}${item}=${json[item]}&`, '?')
        .slice(0, -1)
}

/** 获取周时间
 *  @param index:Number -- 距当前周index周，默认返回当前周
 *  @param returnAll:Boolean -- 返回结果类型
 *     false：返回首尾[start,end]
 *     true：返回所有值[1,2,3,4,5,6,7]
 *  @param format:String -- 时间格式化
 */
export const getWeek = (config = {}) => {
    const { index = 0, format, returnAll } = config
    const now = new Date()
    const timestamp = now.getTime()
    const today = now.getDay() || 7 // 星期天为0，此处将0转换为7
    // 一天的时间戳为86400000
    const start = new Date(timestamp - 86400000 * (today - 1 - index * 7))
    const startStamp = start.getTime()
    const end = new Date(timestamp + 86400000 * (7 - today + index * 7))
    if (returnAll) {
        const result = []
        for (let i = 0; i < 7; i++) {
            if (format) {
                result.push(new Date(startStamp + i * 86400000).format(format))
            } else {
                result.push(new Date(startStamp + i * 86400000))
            }
        }
        // console.log(result)
        return result
    }
    if (format) {
        // console.log([start.format(format), end.format(format)])
        return [start.format(format), end.format(format)]
    }
    // console.log([start, end])
    return [start, end]
}

export default { urlToJson, getWeek }
