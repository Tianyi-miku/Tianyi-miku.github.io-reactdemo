import { createSlice } from "@reduxjs/toolkit";

export type Notice = {
  notice: Array<any>;
};

const initialState: Notice = {
  notice: [],
};

const noticeSlice = createSlice({
  name: "notice",
  initialState: initialState,
  reducers: {
    setNoticeState(state: any, { payload }: any) {
      state = payload || initialState;
    },
    setNotice(state: any, { payload }: any) {
      state.notice = payload || initialState.notice;
    },
    addNotice(state: any, { payload }: any) {
      state.notice = initialState.notice.unshift(payload);
    },
    updateNotice(state: any, { payload }: any) {
      const index = initialState.notice.findIndex(
        (item) => item.id === payload.id
      );
      state.notice = initialState.notice.splice(index, 1, payload);
    },
  },
});

export const { setNoticeState, setNotice } = noticeSlice.actions;

export default noticeSlice.reducer;
