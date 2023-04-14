import Store from "store"

const ACCESS_TOKEN = "Access-Token"

interface StorageType {
  [x: string]: Function
}

const storage:StorageType = {
    // 保存token
    setToken(token: string) {
        Store.set(ACCESS_TOKEN, token) 
    },
    // 获取token
    getToken() {
        return Store.get(ACCESS_TOKEN) || ""
    },
    // 移除token
    removeToken() {
        Store.remove(ACCESS_TOKEN)
    },
    // 清除所有本地存储
    removeAll() {
        Store.clearAll()
    },
    // 遍历所有存储
    getForEachAll() {
        return Store.each((val,index) => {
            console.log(val,'===',index)
        })
    }
}

export default storage
