import Store from 'store'


const ACCESS_TOKEN = 'Access-Token'

type Storage = {
   
}
const storage = {
   // 保存token
  setToken (token: string) {
    Store.set(ACCESS_TOKEN, token)
  },
  // 获取token
  getToken () {
    return Store.get(ACCESS_TOKEN) || ''
  },
  // 移除token
  removeToken () {
    Store.remove(ACCESS_TOKEN)
  },
}

export default storage