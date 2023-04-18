import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachLoTrinh: [],
};

export const diemAndChungNhanSlice = createSlice({
  name: "diemChungNhanReducer",
  initialState,
  reducers: {
    setDanhSachLoTrinh: (state, action) => {
      state.danhSachLoTrinh = action.payload;
    },
  },
});
export const { setDanhSachLoTrinh } = diemAndChungNhanSlice.actions;
export default diemAndChungNhanSlice.reducer;
