import { Outlet } from "react-router-dom"
import { useState } from "react"
import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import { Menu } from "antd"
import type { MenuProps } from "antd"
import DropdownList from "../components/Dropdown/Dropdown"
import { withRouter } from "../hoc"
import { HomeSty } from "./style"
const items: MenuProps["items"] = [
    {
        label: "首页",
        key: "/home/home",
        icon: <MailOutlined />
    },
    {
        label: "常规监测",
        key: "/home/routineMon",
        icon: <AppstoreOutlined />
    },
    {
        label: "监测网管控",
        key: "/home/networkManage",
        icon: <SettingOutlined />
    },
    {
        label: "频谱资源管控",
        key: "/login",
        icon: <MailOutlined />
    },
    {
        label: "系统配置",
        key: "/home/sysConfiguration",
        icon: <SettingOutlined />
    }
]

function HomeIndex(props: any) {
    const [current, setCurrent] = useState(props.router.location.pathname)

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key)
        // console.log("click ", e)
        // setCurrent(e.key)
        console.log("====================================")
        console.log(props)
        console.log("====================================")
        props.router.navigate(e.key)
    }
    return (
        <HomeSty>
            <div className="header">
                <div className="logo">logo无限电监测控制中心</div>
                <div className="right_con">
                    <Menu className="menu" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    <div className="login">
                        <DropdownList></DropdownList>
                    </div>
                </div>
            </div>
            <div className="content">
                <Outlet />
            </div>
        </HomeSty>
    )
}
export default withRouter(HomeIndex)
