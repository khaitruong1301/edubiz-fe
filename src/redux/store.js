import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import baiHocContentReducer from "./reducer/baiHocContentReducer";
import chartReducer from "./reducer/chartReducer";
import dashboardReducer from "./reducer/dashboardReducer";
import diemAndChungNhanReducer from "./reducer/diemAndChungNhanReducer";
import khoaHocReducer from "./reducer/khoaHocReducer";
import layoutReducer from "./reducer/layoutReducer";
import loTrinhReducer from "./reducer/loTrinhReducer";
import signUpReducer from "./reducer/signUpReducer";
import spinnerReducer from "./reducer/spinnerReducer";
import themeReducer from "./reducer/themeReducer";
import thongBaoReducer from "./reducer/thongBaoReducer";
import tourReducer from "./reducer/tourReducer";

export default configureStore({
  reducer: {
    // counter: counterReducer,
    authUser: authReducer,
    loTrinh: loTrinhReducer,
    khoaHoc: khoaHocReducer,
    baiHoc: baiHocContentReducer,
    dashboard: dashboardReducer,
    tour: tourReducer,
    thongBao: thongBaoReducer,
    diemChungNhan: diemAndChungNhanReducer,
    chart: chartReducer,
    layout: layoutReducer,
    signUp: signUpReducer,
    spinner: spinnerReducer,
    theme: themeReducer
  },
  // devTools: process.env.NODE_ENV === "development" ? true : false,
  devTools: process.env.NODE_ENV !== 'production',
});
