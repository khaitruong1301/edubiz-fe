import { createSlice } from "@reduxjs/toolkit";
// localStorageServ

const initialState = {
  statisChartArr: [],
  labelChart: [],
};

export const chartSlice = createSlice({
  name: "chartUser",
  initialState,
  reducers: {
    setStatisChartArr: (state, action) => {
      state.statisChartArr = action.payload;
    },

    setLabelChart: (state, action) => {
      state.labelChart = action.payload;
    },
  },
});
export const { setStatisChartArr, setLabelChart } = chartSlice.actions;
export default chartSlice.reducer;
