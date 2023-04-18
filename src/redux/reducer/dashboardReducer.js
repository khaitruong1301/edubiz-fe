import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpServ from "../../services/http.service";

import localStorageServ from "../../services/locaStorage.service";
import { initialDemoTaskDeadline } from "../../utils/HocDemoUtils";

const initialState = {
  statisChartArr: [],
  labelChart: [],
  topUsers: {
    tichCuc: [],
    hocGioi: [],
    capDo: [],
  },
  danhSachDeadline: localStorageServ.userDemo.get()
    ? initialDemoTaskDeadline()
    : [],
  khoaDangHoc: [],
  allItems: [],
  yourItems: [],
  dialogItem: {
    isShow: "",
    canBuyItem: "",
    dataItem: "",
  },
};
export const getYoursItemAciton = createAsyncThunk(
  "lotrinh/getYoursItemAciton",
  async (userId, thunkAPI) => {
    const response = await httpServ.getYoursItems(userId, false);
    return response.data.content;
  }
);
export const dashboardSlice = createSlice({
  name: "dashboardReducer",
  initialState,
  reducers: {
    setTopUpser: (state, action) => {
      state.topUsers = action.payload;
    },
    setDanhSachDeadline: (state, action) => {
      state.danhSachDeadline = action.payload;
    },
    setKhoaDangHoc: (state, action) => {
      state.khoaDangHoc = action.payload;
    },
    setAllItem: (state, action) => {
      state.allItems = action.payload;
    },
    setYourItem: (state, action) => {
      state.yourItems = action.payload;
    },
    setDialogItem: (state, action) => {
      state.dialogItem = action.payload;
    },
  },
  extraReducers: {
    [getYoursItemAciton.fulfilled]: (state, action) => {
      state.yourItems = action.payload;
    },
  },
});

export const {
  setDialogItem,
  setStatisChartArr,
  setLabelChart,
  setTopUpser,
  setDanhSachDeadline,
  setKhoaDangHoc,
  setAllItem,
  setYourItem,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
