
// 函数节流
export default function (fn, time) {
    let start = 0 
    return function (...args) { 
        const newDate = new Date()
        if (newDate - start >= time) {
            start = new Date()
            fn.call(this, ...args)
        }
    }
}
