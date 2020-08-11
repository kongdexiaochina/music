// 本文件是操作本地存储数据的localStorage

export default {
    getLocalStorage (name) { // 获取
        return JSON.parse(localStorage.getItem(name))
    },
    setLocalStorage (name, data) { // 设置
        localStorage.setItem(name, JSON.stringify(data))
    },
    recommendLocalStorage (name) { // 删除
        localStorage.removeItem(name)
    }
}
