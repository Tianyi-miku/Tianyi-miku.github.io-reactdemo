
// import defaultImg from "@/assets/images/map/scene-title1.png";
import defaultImg from "@/assets/images/map/scene-title.png";
import Icon from "@/components/Icon/Icon";
import { Empty } from "antd";
import React from "react";
import "./pannel.less";

type Props = {
  title: string;
  children?: React.ReactNode;
  className?: string;
  showLeftIcon?: boolean; // 显示左边icon
  hideIcon?: boolean; // 是否隐藏icon
  titleBgImg?: string; // 背景图
  Theight?: string; // 高度
  tcenter?: boolean; // 是否局中
  isShow?: boolean;
  titleClickFuntion?: Function // 标题点击事件
};

const Pannel = (props: Props, ref: any) => {
  const {
    titleBgImg,
    tcenter,
    className,
    Theight,
    title,
    hideIcon,
    showLeftIcon,
    children,
  } = props;

  const bgImg = titleBgImg || defaultImg;

  const titleStyle: any = {
    background: `url(${bgImg}) no-repeat center`,
    textAlign: tcenter ? "left" : "center",
  };

  return (
    <div
      ref={ref}
      className={`pannel animate__fadeInDown ${className}`}
    >
      <div
        className={hideIcon ? "pannel-title cursor-default" : "pannel-title"}
        style={titleStyle}
      >
        {title}
      </div>
      <div className='showBox'>
        {children || <Empty />}
      </div>
    </div>
  );
};

export default React.forwardRef(Pannel);
