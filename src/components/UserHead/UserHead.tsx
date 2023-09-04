/*
 * @Description:头部用户信息组件
 * @Author: zhangyuru
 * @Date: 2023-03-06 17:45:07
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-08-30 18:13:24
 * @FilePath: \05-simulation_training_React\src\components\UserHead\UserHead.tsx
 */
import React, { memo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { Store } from "@/store";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useLogoutHttp } from "@/api/login/login";
import { setUserInfo } from "@/store/modules/user";
import storage from "@/utils/storage";
import config from "@/config";
import Notice from "./Notice/Notices";
import ViewImg from "../ViewImg/ViewImg";
import { getFullscreen, launchFullScreen } from "@/utils/utils";
import "./UserHead.less";

const UserHead = () => {
  const dispatch = useDispatch();
  const userState = useSelector((s: Store) => s.user.userInfo);
  const [sendLogoutHttp] = useLogoutHttp();
  const [fullScreen, setFullScreen] = useState<boolean>(getFullscreen());

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: fullScreen ? "关闭全屏" : "开启全屏",
      icon: fullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />,
      onClick: () => {
        launchFullScreen(() => {
          setFullScreen(!fullScreen);
        });
      },
    },
    {
      key: "2",
      label: "退出登录",
      icon: <LogoutOutlined />,
      onClick: () => {
        sendLogoutHttp(null, {
          showMsg: true,
          to: config.LoginPath,
          Finally: (res: any) => {
            storage.removeToken();
            dispatch(setUserInfo(undefined));
          },
        });
      },
    },
  ];

  return (
    <div className="user_head">
      <div className="notice">
        <Notice></Notice>
      </div>
      <Dropdown menu={{ items }}>
        <div className="user_info">
          <div className="header_img">
            <ViewImg src={userState?.imageUrl} alt="头像"></ViewImg>
          </div>
          <div className="user_name">
            <div>{userState?.name || ""}</div>
            <div>{userState?.code || ""}</div>
          </div>
        </div>
      </Dropdown>
    </div>
  );
};

export default memo(UserHead);
