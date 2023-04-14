import { Dropdown,Avatar } from "antd"
import type { MenuProps } from "antd"
import { UserOutlined } from '@ant-design/icons';
import {DropdownSty} from "./DropdownSty"
import {useState} from "react"
import { getFullscreen, launchFullScreen } from "../../utils/utils";
import {
    FullscreenExitOutlined,
    FullscreenOutlined,
    LogoutOutlined
  } from "@ant-design/icons";
function DropdownList() {
     // 定义full变量，为的是兼容全屏和非全屏的样式，比如full的时候高度为200，非full高度为100
    const [fullScreen, setFullScreen] = useState<boolean>(getFullscreen());


    const Quit = ()=>{
        console.log("退出");
        
    }
   
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
               <div onClick={e=>Quit()}>退出登录</div>
            ),
            icon:<LogoutOutlined />
        },
        {
            key: "2",
            label: (
                <div>{fullScreen ? "关闭全屏" : "开启全屏"}</div>
            ),
            icon: fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
            onClick: () => {
                launchFullScreen(() => {
                  setFullScreen(!fullScreen);
                });
              },
        }
    ]
    return (
        <DropdownSty>
            <Avatar className="avatar"  icon={<UserOutlined />} />
            <Dropdown className="Login"  menu={{ items }} placement="bottom" arrow={{ pointAtCenter: true }}>
                <div>张三</div>
            </Dropdown>
        </DropdownSty>
    )
}
export default DropdownList
