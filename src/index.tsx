import ReactDOM from "react-dom/client"
// import { RouterProvider } from 'react-router-dom';
import "./index.less"
// import router from './router/index';
import { Provider } from "react-redux" //store
import store from "./store" //store
import { HashRouter } from "react-router-dom"
import App from "./App"
import { ThemeProvider } from "styled-components"
import "normalize.css" //样式初始化
import "animate.css/animate.min.css" //动画
import dayjs from "dayjs" //日期格式化
import "dayjs/locale/zh-cn"
import { ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import "antd/dist/reset.css"
import theme from "./assets/theme/theme"
dayjs.locale("zh-cn")

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <App />
                </HashRouter>
            </ThemeProvider>

            {/* <RouterProvider router={router} /> */}
        </Provider>
    </ConfigProvider>
)
