import { useMemo, useState, createContext } from "react";

// 上下文对象
export type ControlCtx = {
  state: {
    footerHeight: number; // 底部菜单高度
    showFooter: boolean; // 是否显示底部菜单
    outletFullScreen: boolean; // 主体内容是否全屏
    formData: any; // 待扩展的共享表单数据
  };
  dispatch: {
    setFooterHeight: Function; // 改变底部菜单高度
    setShowFooter: Function; // 切换是否显示底部菜单
    setTableFullScreen: Function; // 切换主体内容是否全屏
    setFormData: Function; // 改变共享表单数据
  };
};

export const controlCtx: any = createContext({});

export const useControlCtx = (): ControlCtx => {
  const [footerHeight, setFooterHeight] = useState<number>(234);
  const [showFooter, setShowFooter] = useState<boolean>(true);
  const [outletFullScreen, setTableFullScreen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});

  return useMemo<ControlCtx>(() => {
    return {
      state: {
        footerHeight,
        showFooter,
        outletFullScreen,
        formData,
      },
      dispatch: {
        setFooterHeight,
        setShowFooter,
        setTableFullScreen,
        setFormData,
      },
    };
  }, [footerHeight, showFooter, formData, outletFullScreen]);
};
