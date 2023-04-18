import { createSlice } from "@reduxjs/toolkit";
import {
  LO_TRINH_CUA_BAN_TAB,
  TAT_CA_LO_TRINH_TAB,
} from "../../utils/Constant";
import { checkDemoUser } from "../../utils/HocDemoUtils";
// localStorageServ
const initialState = {
  currentTabLoTrinh: checkDemoUser()
    ? TAT_CA_LO_TRINH_TAB
    : LO_TRINH_CUA_BAN_TAB,
  isSiderDetailKhoaHocOpen: true,
};
export const layoutSlice = createSlice({
  name: "layoutReducer",
  initialState,
  reducers: {
    setCurrentTabLoTrinh: (state, action) => {
      state.currentTabLoTrinh = action.payload;
    },
    setIsSiderDetailKhoaHocOpen: (state, action) => {
      state.isSiderDetailKhoaHocOpen = action.payload;
    },
  },
});
export const { setCurrentTabLoTrinh, setIsSiderDetailKhoaHocOpen } = layoutSlice.actions;
export default layoutSlice.reducer;
