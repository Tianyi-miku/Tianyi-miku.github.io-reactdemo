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
