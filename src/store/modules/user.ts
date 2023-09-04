/*
 * @Description:
 * @Author: zhangyuru
 * @Date: 2023-03-01 16:35:56
 * @LastEditors: zhangyuru
 * @LastEditTime: 2023-04-20 11:02:48
 * @FilePath: \05-simulation_training_React\src\store\modules\user.ts
 */
import { createSlice } from "@reduxjs/toolkit";

// 用户信息
export type UserInfo = {
  code: string;
  imageUrl: string;
  name: string;
  roles: any[];
};
export type User = {
  userInfo: UserInfo;
};

const userState: User = {
  userInfo: {
    code: "",
    imageUrl: "",
    name: "",
    roles: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    setUserState(state: User, { payload }: { payload: User }) {
      state = payload;
    },
    setUserInfo(state: User, { payload }: any) {
      state.userInfo = payload;
    },
  },
});

export const { setUserState, setUserInfo } = userSlice.actions;

export default userSlice.reducer;
