// 本文件是操作本地存储数据的sessionStorage

export default {
    getSessionStorage (name) { // 获取
        return JSON.parse(sessionStorage.getItem(name)) || {}
    },
    setSessionStorage (name, data) { // 设置
        sessionStorage.setItem(name, JSON.stringify(data))
    },
    recommendSessionStorage (name) { // 删除
        sessionStorage.removeItem(name)
    }
}
