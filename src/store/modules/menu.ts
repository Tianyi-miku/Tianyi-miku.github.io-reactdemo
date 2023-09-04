/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-04-20 10:38:31
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-07-27 15:53:42
 * @FilePath: \05-simulation_training_React\src\store\modules\menu.ts
 */
import config from "@/config";
import { deepSearchTreeNode } from "@/utils/utils";
import { createSlice } from "@reduxjs/toolkit";

export type MenuState = {
  menuVos: any[];
};

const menuState: MenuState = {
  menuVos: [],
};

const noticeSlice = createSlice({
  name: "menu",
  initialState: menuState,
  reducers: {
    setMenuState(state: MenuState, { payload }: { payload: any }) {
      const { menuKey, menuPassword, encryptMenu } = config;
      let deepOptions: any = {
        list: payload,
        key: "path", // 查找的key
        childKey: "children",
        setParent: (item: any, parent: any) => {
          parent = { ...parent };
          delete parent?.children;
          item.parent = parent;
          return item;
        },
      };
      if (sessionStorage.getItem(menuKey) !== menuPassword) {
        deepOptions.values = encryptMenu; // 根据加密菜单path
        deepOptions.isDelete = true; // 删除匹配到的
      }
      const menuVos: any[] = deepSearchTreeNode(deepOptions);
      state.menuVos = menuVos;
    },
  },
});

export const { setMenuState } = noticeSlice.actions;

export default noticeSlice.reducer;
