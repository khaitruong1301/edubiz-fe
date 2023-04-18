import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { icons } from "../../assets/icons";

import ItemCoin from "../ItemCoin/ItemCoin";
import Bar_Xp_Health_DetailKhoaHoc from "../Bar_Xp_Health/Bar_Xp_Health_DetaiKhoaHoc";
import BtnHelp from "../BtnHelp/BtnHelp";
import { useDispatch, useSelector } from "react-redux";
import { setUserTour } from "../../redux/reducer/tourReducer";
import useWindowSize from "../../hook/useWindowSize";
import Modal_Course_Outline from "../Modal_Course_Outline/Modal_Course_Outline";
import Switch_Theme from "../Buttons/Switch_Theme";

function Navbar_DetailKhoaHoc() {
  const dispatch = useDispatch();
  const { userTour } = useSelector((state) => state.tour);
  let newUserTour = { ...userTour };
  const handleOpenTour = () => {
    newUserTour.isShowDetail = true;
    dispatch(setUserTour(newUserTour));

  }
  let { widthWindow, heightWindow } = useWindowSize()

  return widthWindow > 635 ? (
    <div
      className="w-full h-full flex items-center justify-between sm:px-1 lg:px-5"
      data-tour="detail-step-6"
    >
      <NavLink
        to="/dashboard"
        className="flex  items-center justify-center h-full  card_them text-color-blue-white card_theme_hover"
      >
        <button className="flex items-center justify-center h-full  card_them text-color-blue-white space-x-2 sm:px-1 lg:px-3">
          <span className="">{icons.dashboard}</span>
          <p className="">Quay về Dashboard</p>
        </button>
      </NavLink>
      <Bar_Xp_Health_DetailKhoaHoc />
      <span data-tour="detail-step-1">
        <ItemCoin loop={false} />
      </span>
      <BtnHelp
        onShowHelp={() => {
          handleOpenTour()
        }}
      />
      <Switch_Theme />
      <Modal_Course_Outline />
      <NavLink
        to={"/lo-trinh"}
        className="flex  items-center justify-center h-full  card_them text-color-blue-white card_theme_hover"
      >
        <button className="flex items-center justify-center h-full  card_them text-color-blue-white space-x-2 sm:px-1 lg:px-3">

          <span className="">{icons.loTrinh}</span>
          <p className="bg-red-000">Quay về Lộ trình</p>
        </button>
      </NavLink>

    </div>
  ) : (
    <div
      className="w-full h-full flex items-center justify-between sm:px-1 lg:px-5"
      data-tour="detail-step-6"
    >
      <NavLink
        to="/"
        className="flex  items-center justify-center h-full  card_them text-color-blue-white card_theme_hover"
      >
        <button className="flex items-center justify-center h-full  card_them text-color-blue-white space-x-2 sm:px-1 lg:px-3">
          <span className="">{icons.dashboard}</span>
          <p className="">Quay về Dashboard</p>
        </button>
      </NavLink>

      <NavLink
        to={"/lo-trinh"}
        className="flex  items-center justify-center h-full  card_them text-color-blue-white card_theme_hover"
      >
        <button className="flex items-center justify-center h-full  card_them text-color-blue-white space-x-2 sm:px-1 lg:px-3">

          <span className="">{icons.loTrinh}</span>
          <p className="bg-red-000">Quay về Lộ trình</p>
        </button>
      </NavLink>

    </div>
  )
}
export default memo(Navbar_DetailKhoaHoc);
