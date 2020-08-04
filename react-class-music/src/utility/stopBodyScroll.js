// 很简单的一个工具类函数，用于隐藏body的滚动条
// 他接收一个布尔值，用户判断你当前是否在进行模态框等全屏的操作
export default function (isFixed) {
    const bodyEl = document.body
    if (isFixed) {
        bodyEl.style.overflow = 'hidden'
    } else {
        bodyEl.style.overflow = 'inherit'
    }
}
