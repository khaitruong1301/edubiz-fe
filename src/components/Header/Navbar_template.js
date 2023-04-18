import React, { useState } from "react";
// import SearchNav from "../../components/SearchNav";
// import useDarkMode from "../../hook/useDarkMode";
// import User_Avatar_Badge from "../User_Avatar_Badge/User_Avatar_Badge";
import Bar_Xp_Health from "../Bar_Xp_Health/Bar_Xp_Health";
import { HeaderView } from "../../helpers/ViewHeader";
// import ItemCoin from "../ItemCoin/ItemCoin";
import { useSelector, useDispatch } from "react-redux";
import BtnHelp from "../BtnHelp/BtnHelp";
import { setUserTour } from "../../redux/reducer/tourReducer";
import DropdowThongBao from "../DropdowThongBao/DropdowThongBao";
import DropdowUser from "../DropdowUser/DropdowUser";


import { NavLink } from "react-router-dom";
import ToolTipLevel from "../ToolTipLevel/ToolTipLevel";
import { LO_TRINH_CUA_BAN_TAB, TAT_CA_LO_TRINH_TAB } from "../../utils/Constant";
import ItemCoin from "../ItemCoin/ItemCoin";
import Switch_Theme from "../Buttons/Switch_Theme";
import LogoCyber from "../LogoCyber/LogoCyber";

export default function Navbar_template({ toggleSidebar }) {
  const dispatch = useDispatch();
  let { currentTabLoTrinh } = useSelector((state) => state.layout);

  const { userInfor } = useSelector((state) => state.authUser);
  const { userTour } = useSelector((state) => state.tour);

  let newUserTour = { ...userTour };
  if (HeaderView() == "/dashboard") {
    newUserTour.isShowDashboard = true;
  }
  if (currentTabLoTrinh === TAT_CA_LO_TRINH_TAB) {
    newUserTour.isShowLoTrinh = true
  }
  if (currentTabLoTrinh === LO_TRINH_CUA_BAN_TAB) {
    newUserTour.isShowLoTrinhCuaBan = true
  }

  const handleOpenTour = () => {
    dispatch(setUserTour(newUserTour));

  }
  return (
    <>
      <div className="flex items-center h-full space-x-2 " id="dropdownUser">
        <button className="trigger" onClick={toggleSidebar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            fontSize="large"
            className="fill-current text-color-title"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
          </svg>
        </button>
        <NavLink to="/dashboard">
          <LogoCyber />
        </NavLink>
      </div>

      <div className="h-full flex items-center space-x-7 text-color-navigate  relative">
        {HeaderView() !== "/" ? <Bar_Xp_Health /> : ""}

        <DropdowThongBao />

        <div className="flex items-center justify-center space-x-1">
          <ToolTipLevel capDo={userInfor?.capDo} />
          <ItemCoin loop={false} />

        </div>
        <DropdowUser />
        <Switch_Theme />

        <BtnHelp
          onShowHelp={() => {
            handleOpenTour()
          }}
        />
      </div>
    </>
  );
}
