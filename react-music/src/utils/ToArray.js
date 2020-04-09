export default function ToArray(num, arr) { // 一维数组转换成二维数组
    const toArray = [] // 声明数组
    arr.forEach((item, index) => {
        const page = Math.floor(index / num) // 计算该元素为第几个数组内
        if (!toArray[page]) { // 判断是否存在
            toArray[page] = []
        }
        toArray[page].push(item)
    })
    return toArray
}
