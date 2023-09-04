/*
 * @Description: 入口文件
 * @Author: zhangyuru
 * @Date: 2023-02-28 09:46:01
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-31 17:08:28
 * @FilePath: \05-simulation_training_React\src\index.tsx
 */
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import RouterEnter from "./router";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "normalize.css/normalize.css";
import "@/assets/styles/defulteAndt.less";
import "@/assets/icon-font/iconfont.css";
import "@/assets/font/index.less";
import "animate.css/animate.min.css";
import "@/assets/styles/common.less";
import { Suspense } from "react";


dayjs.locale("zh-cn");

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <HashRouter>
                <Suspense>
                    <RouterEnter />
                </Suspense>
            </HashRouter>
        </Provider>
    </ConfigProvider>
);

declare global {
    interface Window {
        BMap?: any; // 百度地图构造函数
        clickInfo?: Function; // 地图infowindow点击事件
    }
}
