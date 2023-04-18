import { createSlice } from "@reduxjs/toolkit";
import localStorageServ from "../../services/locaStorage.service";

const initialState = {
  userTour: localStorageServ.userTour.get(),
  currentPage: "",
};

export const userTourSlice = createSlice({
  name: "tourReducer",
  initialState,
  reducers: {
    setUserTour: (state, action) => {
      state.userTour = action.payload;
    },
  },
});
export const { setUserTour } = userTourSlice.actions;
export default userTourSlice.reducer;
