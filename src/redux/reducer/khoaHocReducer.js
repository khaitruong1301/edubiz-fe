import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import httpServ from "../../services/http.service";
const initialState = {
  khoaHocContent: [],
  danhSachBaiDaHoc: [],
  allLessons: [],
  QandA: [],
  diemAndBaiTap: [],
};
export const getKhoaHocContentAction = createAsyncThunk(
  "khoaHoc/getContentKhoaHoc",
  async (userId, thunkAPI) => {
    const response = await httpServ.getDetailKhoaHoc(userId);
    return response.data.content;
  }
);
export const khoaHocSlice = createSlice({
  name: "khoaHocReducer",
  initialState,
  reducers: {
    setKhoaHocContent: (state, action) => {
      state.khoaHocContent = action.payload;
    },
    setdanhSachBaiDaHoc: (state, action) => {
      state.danhSachBaiDaHoc = action.payload;
    },
    setAllLessons: (state, action) => {
      state.allLessons = action.payload;
    },

    setKhoaHocQandA: (state, action) => {
      state.QandA = action.payload;
    },
    setDiemAndBaiTap: (state, action) => {
      state.diemAndBaiTap = action.payload;
    },
    setAllKeyKhoaHocReducer: (state, { payload }) => {
      return payload

    },
  },
  extraReducers: {
    [getKhoaHocContentAction.fulfilled]: (state, action) => {
      state.khoaHocContent = action.payload;
    },
  },
});
export const {
  setKhoaHocQandA,
  setKhoaHocContent,
  setdanhSachBaiDaHoc,
  setAllLessons,
  setDiemAndBaiTap,
  setAllKeyKhoaHocReducer
} = khoaHocSlice.actions;
export default khoaHocSlice.reducer;
