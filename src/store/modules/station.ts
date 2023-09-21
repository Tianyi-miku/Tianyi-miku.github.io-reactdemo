import { createSlice } from "@reduxjs/toolkit";

export type IStations = {
  stations: Array<any>
}

const initialState: IStations = {
  stations: [],
};

const stationSlice = createSlice({
  name: "staion",
  initialState: initialState,
  reducers: {
    setStationsState(state: any, { payload }: any) {
      state = payload || initialState;
    },
    setStations(state: any, { payload }: any) {
      state.stations = payload || initialState.stations;
    },
    addStations(state: any, { payload }: any) {
      state.stations = initialState.stations.unshift(payload);
    },
    updateStations(state: any, { payload }: any) {
      const index = initialState.stations.findIndex(
        (item) => item.id === payload.id
      );
      state.stations = initialState.stations.splice(index, 1, payload);
    },
    deleteNotice(state: any, { payload }: any) {
      const index = initialState.stations.findIndex(
        (item) => item.id === payload.id
      );
      state.stations = initialState.stations.splice(index, 1);
    }
  },
});

export const { setStations, addStations, updateStations, deleteNotice } = stationSlice.actions;

export default stationSlice.reducer;