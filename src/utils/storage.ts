import { User } from "@/store/modules/user";
import Store from "store";

const USER_KEY: string = "USER_KEY";
const ACCESS_TOKEN = "Access-Token";

type Storage = {
  [x: string]: Function;
  setToken: Function;
  getToken: Function;
  removeToken: Function;
  setUserInfo: Function;
  getUserInfo: Function;
  removeUserInfo: Function;
  clear: Function;
};

const storage: Storage = {
  // 保存token
  setToken(token: string) {
    Store.set(ACCESS_TOKEN, token);
  },
  
  // 获取token
  getToken() {
    return Store.get(ACCESS_TOKEN) || "";
  },
  // 移除token
  removeToken() {
    Store.remove(ACCESS_TOKEN);
  },
  // 保存用户信息
  setUserInfo(data: User) {
    Store.set(USER_KEY, data);
  },
  // 获取用户信息
  getUserInfo() {
    return Store.get(USER_KEY);
  },
  // 删除用户信息
  removeUserInfo() {
    Store.remove(USER_KEY);
  },
  // 清空所有
  clear() {
    Store.clearAll();
  },
};

export default storage;
