import { createSlice } from "@reduxjs/toolkit";
import { notification } from "antd";
import localStorageServ from "../../services/locaStorage.service";

let id = 0;
const initialState = {
  listNotificaiton: [],
};

export const loTrinhSlice = createSlice({
  name: "loTrinhReducer",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      let listNotificaiton = [...state.listNotificaiton];
      listNotificaiton.push(action.payload);
      state.listNotificaiton = listNotificaiton;
    },
    removeNotification: (state, action) => {
      let listNotificaiton = [...state.listNotificaiton];
      listNotificaiton = listNotificaiton.filter(
        (notification) => notification !== action.payload
      );
      state.listNotificaiton = listNotificaiton;
    },
  },
});
export const { addNotification, removeNotification } = loTrinhSlice.actions;
export default loTrinhSlice.reducer;
