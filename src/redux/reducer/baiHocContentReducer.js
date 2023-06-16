import { createSlice } from "@reduxjs/toolkit";
// import localStorageServ from "../../services/locaStorage.service";
// localStorageServ
const initialState = {
  currentLesson: {},
  video_FPT: "",
  baiTapNop: "",
  baiTapTracNghiem: [],
  listQuestion: [],
  isShowDapAnTracNghiem: false,
  trangThaiQuizz: 1,
  idBaiDangHocDashboard: null,
  testMode: false,
  lastVideoCanWatchIndex: 1,
  isRedoQuizz: false,
  totalRedoQuizz: 0
};

export const baiHocContentSlice = createSlice({
  name: "baiHocContentdanhSachBaiDaHoc",
  initialState,
  reducers: {
    setCurrentLesson: (state, action) => {
      state.currentLesson = action.payload;
    },
    setBaiTapNop: (state, action) => {
      state.baiTapNop = action.payload;
    },
    setListQuestion: (state, action) => {
      state.listQuestion = action.payload;
    },
    setTrangThaiQuizz: (state, action) => {
      state.trangThaiQuizz = action.payload;
    },
    setIdBaiDangHocDashboard: (state, action) => {
      state.idBaiDangHocDashboard = action.payload;
    },
    setlastVideoCanWatchIndex: (state, action) => {
      state.lastVideoCanWatchIndex = action.payload;
    },
    setTestMode: (state, action) => {
      state.testMode = action.payload;
    },
    setIsShowDapAnTracNghiem: (state, action) => {
      state.isShowDapAnTracNghiem = action.payload;
    },
    setIsRedoQuizz: (state, action) => {
      state.isRedoQuizz = action.payload;
    },
    setIsTotalRedoQuizz: (state, action) => {
      state.totalRedoQuizz = action.payload;
    },

    setAllKeyBaiHocReducer: (state, { payload }) => {
      return payload

    },
  },
});
export const {
  setTestMode,
  setIdBaiDangHocDashboard,
  setCurrentLesson,
  setBaiTapNop,
  setListQuestion,
  setTrangThaiQuizz,
  setlastVideoCanWatchIndex,
  setAllKeyBaiHocReducer,
  setIsShowDapAnTracNghiem,
  setIsRedoQuizz,
  setIsTotalRedoQuizz

} = baiHocContentSlice.actions;
export default baiHocContentSlice.reducer;
