import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import localStorageServ from "../../services/locaStorage.service";
import { createSelector } from '@reduxjs/toolkit'
import httpServ from "../../services/http.service";

const initalUserInfor = () => {
  if (localStorageServ.userInfor.get()) {
    return localStorageServ.userInfor.get();
  } else if (localStorageServ.userDemo.get()) {
    return localStorageServ.userDemo.get();
  } else {
    return {
      avatar: "https://graph.facebook.com/706889296629670/picture?type=large",
      capDo: 25,
      capTangDanhHieu: 10,
      coin: 25,
      danhHieu: "Junior",

      email: "tranquangsigl@gmail.com",
      hoTen: "Demo CyberLearn",
      huyHieu: "/images/hh_3.png",
      id: "65072719-3fe5-40b4-930c-d074e1a53be8",
      danhHieuHinh: "/images/DH_1.png",
      kinhNghiem: 70,
      kinhNghiemToiDa: 100,
      nuocNgoai: false,
      tichCuc: 1400,
      tichCucToiDa: 2000,
    };
  }
};
const initialState = {
  token: "",
  userInfor: initalUserInfor(),
  inforLoginDemo: {
    code: "",
    email: "",
  },
  timeUserDemo: 0,
};

export const getUpdateUserInforAciton = createAsyncThunk(
  "authUser/getUpdateUserInfor",
  async (userId, thunkAPI) => {
    const response = await httpServ.getInforUser(userId);
    return response.data.content;
  }
);
export const authSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    setUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
    setInforLoginDemo: (state, action) => {
      state.userInfor = action.payload;
    },
    setTimeUserDemo: (state, action) => {
      state.userInfor = action.payload;
    },
  },
  extraReducers: {
    [getUpdateUserInforAciton.fulfilled]: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});
export const { setUserInfor, setInforLoginDemo, setTimeUserDemo } =
  authSlice.actions;
export default authSlice.reducer;
