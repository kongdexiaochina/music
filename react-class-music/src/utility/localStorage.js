// 本文件是操作本地存储数据的localStorage

export default {
    getLocalStorage (name) { // 获取
        return JSON.parse(localStorage.getItem(name))
    },
    setLocalStorage (name, data) { // 设置
        const init = JSON.parse(localStorage.getItem(name)) || []
        if (init.indexOf(data) === -1) {
            init.push(data)
            localStorage.setItem(name, JSON.stringify(init))
        }
    },
    recommendLocalStorage (name) { // 删除
        localStorage.removeItem(name)
    }
}
