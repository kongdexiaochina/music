export default function arrTrans (num, arr) { // 一维数组转换为二维数组
  const iconsArr = [] // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num) // 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = []
    }
    iconsArr[page].push(item)
  })
  return iconsArr
}
