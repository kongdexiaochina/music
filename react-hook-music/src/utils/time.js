// 这个方法是把毫秒数转换成可读的时间数(格式化时间)
export const formateDate = time => {
    // 把毫秒数放置在new Date当中他会生成一个时间对象
    const date = new Date(time)
    // 时间对象上面有许多方法可以获取到你的年月份等时间信息
    return (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
