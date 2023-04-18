import { createSlice } from "@reduxjs/toolkit";
import localStorageServ from "../../services/locaStorage.service";

const initialState = {
  allThongBao: [],
};

export const thongBaoSlice = createSlice({
  name: "thongBaoReducer",
  initialState,
  reducers: {
    setAllThongBao: (state, action) => {
      state.allThongBao = action.payload;
    }
  },
});
export const { setAllThongBao, setLichSuHoatDong } = thongBaoSlice.actions;
export default thongBaoSlice.reducer;
