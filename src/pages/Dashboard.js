import React, { useEffect } from "react";
import Card_LoTrinh_DashBoard from "../components/Card_LoTrinh_Dashboard/Card_LoTrinh_DashBoard";
import Chart_User_Dashboard from "../components/Chart_User_Dashboard/Chart_User_Dashboard";
import Global_Dashboard from "../components/Global_Dashboard/Global_Dashboard";

import User_Infor_Dashboard from "../components/User_Infor_Dashboard/User_Infor_Dashboard";
import List_Card_Continue_Dashboard from "../components/List_Card_Continue_Dashboard/List_Card_Continue_Dashboard";
import Shop_Item from "../components/Shop_Item/Shop_Item";
import { Layout } from "antd";
import { stepDashboardConfig } from "../tourConfig/tourConfig";
import Tour from "reactour";
import localStorageServ from "../services/locaStorage.service";
import { useSelector, useDispatch } from "react-redux";
import { setUserTour } from "../redux/reducer/tourReducer";
import {
  setTatCaLoTrinh,
  setLoTrinhDaDangKi,
  setLoTrinhDaHoanThanh,
} from "../redux/reducer/loTrinhReducer";
import httpServ from "../services/http.service";

import List_Card_Task_Deadline from "../components/List_Card_Task_Deadline/List_Card_Task_Deadline";
import Tab_Top_Users from "../components/Tab_Top_Users/Tab_Top_Users";
import Container_Recomended_LoTrinh from "../components/Container_Recomended_LoTrinh/Container_Recomended_LoTrinh";
import { checkDemoUser } from "../utils/HocDemoUtils";

export default function Dashboard() {
  const dispatch = useDispatch();
  let userInfor = useSelector((state) => state.authUser.userInfor);
  useEffect(() => {
    !checkDemoUser() &&
      httpServ.getLoTrinhDaDangKI(userInfor?.id).then((res) => {
        const resLoTrinh = res.data.content;
        if (resLoTrinh && resLoTrinh.length) {
          const dsLoTrinhDangHoc = resLoTrinh.filter(item => item.choDuyet && !item.daHetHan);
          const dsLoTrinhDaHoanThanh = resLoTrinh.filter(item => item.choDuyet && item.daHetHan);
          dispatch(setLoTrinhDaDangKi(dsLoTrinhDangHoc));
          dispatch(setLoTrinhDaHoanThanh(dsLoTrinhDaHoanThanh));
        }
      });
    !checkDemoUser() &&
      httpServ.getTatCaLoTrinh(userInfor?.id).then((res) => {
        const resLoTrinh = res.data.content.filter((item) => !item.daDangKy);
        dispatch(setTatCaLoTrinh(resLoTrinh));
      });
  }, []);

  let userTour = useSelector((state) => state.tour.userTour);

  return (
    <Layout className="w-full flex-grow  bg-transparent flex ">
      <Tour
        onRequestClose={() => {
          let newUserTour = { ...userTour };
          newUserTour.isShowDashboard = false;
          dispatch(setUserTour(newUserTour));
          if (localStorageServ.userTour.get().isShowDashboard) {
            let userTour = localStorageServ.userTour.get();
            userTour.isShowDashboard = false;
            localStorageServ.userTour.set(userTour);
          }
        }}
        steps={stepDashboardConfig}
        isOpen={userTour?.isShowDashboard}
        className="rounded-lg p-8"
        rounded={5}
        accentColor={"#222260"}
        beforeClose={() => { }}
      />
      <div className="w-full flex h-full p-3 lg:p-5 space-x-5 ">
        <div className="flex-grow h-max-content w-full space-y-3  lg:space-y-5 ">
          <div className="w-full h-64 lg:h-72   flex justify-between space-x-3">
            <div className=" h-full w-max card_theme flex p-5 flex-shrink-0">
              <User_Infor_Dashboard />
            </div>
            <div className=" w-40  flex-grow h-full  ">
              <Shop_Item />
            </div>
          </div>
          <div className="w-full  flex h-90 2xl:h-96   space-x-3">
            <div className="w-2/5 flex-shrink-0">
              <List_Card_Continue_Dashboard />
            </div>
            <div className="card_theme h-full w-3/5">
              <Chart_User_Dashboard />
            </div>
          </div>
          <div className="w-full flex space-x-3 h-114  overflow-hidden ">
            <div
              className="flex-grow card_theme  p-3 h-full"
              data-tour="db-step-7"
            >
              <p className="text-lg text-color-title flex-shrink-0 mb-1  ">
                Lộ trình của bạn
              </p>
              <Card_LoTrinh_DashBoard />
            </div>
            <Container_Recomended_LoTrinh />
          </div>
          <div className="w-full h-140   2xl:hidden flex justify-between space-x-5">
            <List_Card_Task_Deadline />
            <Tab_Top_Users />
          </div>
        </div>
        <div className=" md:hidden 2xl:block  h-full  flex-shrink-0   w-84  min-h-16">
          <div className="w-84 fixed h-screen overflow-auto   hidden-scroll ">
            <Global_Dashboard />
          </div>
        </div>
      </div>
    </Layout>
  );
}
