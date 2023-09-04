/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-02 15:55:57
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-07-26 09:32:02
 * @FilePath: \05-simulation_training_React\src\components\MeDialog\MeDialogType.ts
 */
export type propsType = {
  visiable: boolean; // 显示隐藏弹出框
  width?: string; //弹出框宽度 默认为 500px  传值为"宽度px"
  title?: string; //弹出框标题
  children?: any; //弹出框内容
  Cancel?: any; //点击取消
  Ok?: any; //点击确认
  cancelText?: string; //取消按钮文字
  okText?: string; //确认按钮文字
  diaHeight?: string; //高度 默认为300px  传值为"高度px"
  showCancel?: boolean; //是否显示取消按钮
  showok?: boolean; //是否显示确认按钮
  footerSlot?: any; // 底部自定义插槽
  showFooter?: boolean; // 是否显示底部按钮
  className?: string; // 单独类名
  footerMargin?: string; // 底部按钮区域的margin
  fullScrene?: boolean; // 是否开启全屏
};
