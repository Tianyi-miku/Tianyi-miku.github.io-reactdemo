/*
 * icon组件
 */
import React, { forwardRef, useMemo } from "react";

type Props = {
  icon: string;
  className?: string;
  color?: string;
  size?: number;
  style?: React.CSSProperties;
  onClick?: Function;
  onDoubleClick?: Function;
  onClickCapture?: Function;
};

const Icon = (
  props: Props = {
    icon: "user",
    color: "#43acfa",
    size: 22,
    style: {},
    onClick: () => { },
    onDoubleClick: () => { },
    onClickCapture: () => { },
  },
  ref: any
) => {
  const ClassName = useMemo(() => {
    return `iconfont icon-${props.icon}`;
  }, [props]);

  const style = useMemo(() => {
    return {
      fontSize: props.size + "px",
      color: props.color,
      ...props.style,
    };
  }, [props]);

  return (
    <i
      ref={ref}
      className={`${ClassName} ${props?.className || ""}`}
      style={style}
      onClick={(e) => {
        if (props?.onClick) props?.onClick(e);
      }}
      onDoubleClick={(e) => {
        if (props?.onDoubleClick) props?.onDoubleClick(e);
      }}
      onClickCapture={(e) => {
        if (props?.onClickCapture) props?.onClickCapture(e);
      }}
    ></i>
  );
};

export default forwardRef(Icon);
