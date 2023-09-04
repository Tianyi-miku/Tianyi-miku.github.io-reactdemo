import { configureStore } from "@reduxjs/toolkit"
import user, { User } from "./modules/user"
import notice, { Notice } from "./modules/notice";
import menu, { MenuState } from "./modules/menu";

export type Store = {
    user: User;
    notice: Notice;
    menu: MenuState;
};
// 入口
const store = configureStore({
    reducer: {
        user, // 用户数据
        notice, // 消息通知
        menu // 菜单数据
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, //关闭redux序列化检测
        }),
});


export default store