// 函数防抖

export function technique (fn, time = 1000) {
    let resultTime = null
    return function (...args) {
        clearTimeout(resultTime)
        console.log(arguments);
        console.log('执行');
        resultTime = setTimeout(fn.bind(this, ...args), time)
    }
}
