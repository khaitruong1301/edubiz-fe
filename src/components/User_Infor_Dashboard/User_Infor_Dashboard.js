import React from "react";
import "./User_Infor_Dashboard.css";
import User_Avatar_Badge from "../User_Avatar_Badge/User_Avatar_Badge";
import { useSelector } from "react-redux";
import GetGameItem from "../../utils/GetGameItem";
import { KN, TC } from "../../utils/Constant";
import ToolTipCoin from "../ToolTipCoin/ToolTipCoin";
import ToolTipLevel from "../ToolTipLevel/ToolTipLevel";
import ToolTipDanhHieu from "../ToolTipDanhHieu/ToolTipDanhHieu";
import ToolTipHuyHieu from "../ToolTipHuyHieu/ToolTipHuyHieu";
import ToolTipXP from "../ToolTipXP/ToolTipXP";
import ToolTipHp from "../ToolTipHp/ToolTipHp";
import { DesktopResponsive, TabletResponsive } from "../../HOC/Responsive";

export default function User_Infor_Dashboard() {
  const { userInfor } = useSelector((state) => state.authUser);

  return (
    <div
      className="flex items-center space-x-3 lg:space-x-5 "
      data-tour="db-step1"
    >
      <div className="relative flex flex-col justify-center items-center h-full  w-32 lg:w-36 space-y-6  ">
        <div className=" w-24 lg:w-36  flex justify-center ">
          <DesktopResponsive>
            <User_Avatar_Badge width_Badge={12} positon_Bot_Badge={6} />
          </DesktopResponsive>
          <TabletResponsive>
            <User_Avatar_Badge width_Badge={10} positon_Bot_Badge={4} />
          </TabletResponsive>
        </div>
        <div className="text-lg text-color-title transform   w-full text-center font-medium flex justify-center items-center space-x-2">
          <ToolTipDanhHieu userInfor={userInfor} />
        </div>
      </div>
      <div className=" flex flex-col w-max space-y-2 font-medium">
        <div className="flex space-x-2 items-center">
          <ToolTipHuyHieu userInfor={userInfor} />
          <div>
            <p className=" text-color-title text-base lg:text-lg">
              {userInfor?.hoTen}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 h-8 overflow-hidden">
          <p
            style={{ color: "#4884ee" }}
            className="text-base lg:text-lg font-medium mr-2  "
          >
            <ToolTipLevel capDo={userInfor?.capDo} />
          </p>

          <ToolTipCoin />
          <span className="text-base lg:text-lg text-color-title transform -translate-x-3 font-medium">
            {userInfor?.coin}
          </span>
        </div>
        <div className="flex items-center space-x-3 text-color-title">
          {" "}
          <span className="w-max ">Tích cực</span>{" "}
          <span className=" text-sm  lg:hidden">
            {userInfor?.tichCuc}/{userInfor?.tichCucToiDa} XP{" "}
          </span>
          <div className="flex">{<GetGameItem types={[TC]} size="7" />}</div>
        </div>
        <DesktopResponsive>
          <ToolTipHp userInfor={userInfor} width={"w-48"} />
        </DesktopResponsive>
        <TabletResponsive>
          <ToolTipHp userInfor={userInfor} width={"w-36"} />
        </TabletResponsive>
        <div className="flex items-center space-x-3">
          {" "}
          <span className="w-max text-color-title">Kinh nghiệm</span>{" "}
          <span className=" text-sm  lg:hidden">
            {userInfor?.kinhNghiem}/{userInfor?.kinhNghiemToiDa} XP{" "}
          </span>
          <div className="flex">{<GetGameItem types={[KN]} size="7" />}</div>
        </div>
        <DesktopResponsive>
          <ToolTipXP userInfor={userInfor} width={"w-48"} />
        </DesktopResponsive>
        <TabletResponsive>
          <ToolTipXP userInfor={userInfor} width={"w-36"} />
        </TabletResponsive>
      </div>
    </div>
  );
}
