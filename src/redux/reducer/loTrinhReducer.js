import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import httpServ from "../../services/http.service";
// import localStorageServ from "../../services/locaStorage.service";
// localStorageServ
const initialState = {
  loTrinhDaDangKi: [],
  tatCaLoTrinh: [],
  typeFilters: [],
  currentActiveTypeFilter: "all",
  loading: false,
};

export const getLoTrinhDaDangKiAciton = createAsyncThunk(
  "lotrinh/getLoTrinhDaDangKI",
  async (userId, thunkAPI) => {
    const response = await httpServ.getLoTrinhDaDangKI(userId);
    return response.data.content;
  }
);
export const getTatCaLoTrinhAciton = createAsyncThunk(
  "lotrinh/getTatCaLoTrinh",
  async (userId, thunkAPI) => {
    const response = await httpServ.getTatCaLoTrinh(userId);
    return response.data.content;
  }
);
export const loTrinhSlice = createSlice({ 
  name: "loTrinhReducer",
  initialState,
  reducers: {
    setLoTrinhDaDangKi: (state, action) => {
      state.loTrinhDaDangKi = action.payload;
    },
    setTatCaLoTrinh: (state, action) => {
      state.tatCaLoTrinh = action.payload;
    },
    setTypeFiltersLoTrinh: (state, action) => {
      state.typeFilters = action.payload;
    },
    setCurrentActiveTypeFilter: (state, action) => {
      state.currentActiveTypeFilter = action.payload;
    },
    setCapNhatDanhSachLoTrinh: (state, action) => {
      state.tatCaLoTrinh = action.payload.tatCaLoTrinh;
    },
  },
  extraReducers: {
    [getLoTrinhDaDangKiAciton.fulfilled]: (state, action) => {
      state.loTrinhDaDangKi = action.payload;
      state.loading = false;
    },
    [getLoTrinhDaDangKiAciton.pending]: (state, action) => {
      state.loading = true;
    },
    [getTatCaLoTrinhAciton.fulfilled]: (state, action) => {
      state.tatCaLoTrinh = action.payload;
      state.loading = false;
    },
    [getTatCaLoTrinhAciton.pending]: (state, action) => {
      state.loading = true;
    },
  },
});
export const {
  setCurrentActiveTypeFilter,
  setTypeFiltersLoTrinh,
  setLoTrinhDaDangKi,
  setTatCaLoTrinh,
  setCapNhatDanhSachLoTrinh
} = loTrinhSlice.actions;
export default loTrinhSlice.reducer;
