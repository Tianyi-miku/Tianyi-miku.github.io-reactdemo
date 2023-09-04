import React, { useState } from "react";
import UserHead from "@/components/UserHead/UserHead";
import config from "@/config";
import "./head.less";

import { Button } from "antd";

type Props = {
  showMenu?: boolean;
};

export default function Head(props: Props) {
  return (
    <header className="header">
      <div className="a-hearder-box">
        <div className="a-header-content">
          <ul className="header-icon-box-left">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <h3 className="a-header-title">
            <span>电磁频谱管理控制系统</span>
          </h3>
          <ul className="header-icon-box-right">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="header-bottom-icon">
          <div className="header-bottom-icon1"></div>
          <div className="header-bottom-icon2"></div>
        </div>
        <div className="header-bottom-icon first">
          <div className="header-bottom-icon3"></div>
          <div className="header-bottom-icon4"></div>
        </div>
      </div>

      <div className="imgbox">
        {config.logoImg && (
          <img className="img" src={config.logoImg} alt="logo" />
        )}
        {/* {props?.showMenu && (
          <Button
            className="menu-btn"
            onClick={() => {
              alert("功能还没写");
              setShow(true);
            }}
          >
            菜单
          </Button>
        )} */}
      </div>
      <div className="header-right">
        <UserHead></UserHead>
      </div>
    </header>
  );
}
