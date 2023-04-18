import { Progress } from "antd";
import React from "react";
import { useSelector } from "react-redux";
export default function Bar_Xp_Health_DetailKhoaHoc() {
  let userInfor = useSelector((state) => state.authUser.userInfor);
  const percentTichCuc = (userInfor.tichCuc / userInfor.tichCucToiDa) * 100;
  const percentKinhNghiem =
    (userInfor.kinhNghiem / userInfor.kinhNghiemToiDa) * 100;
  return (
    <div
      className="h-full flex flex-col font-medium items-start text-color-blue-white justify-center  text-base lg:text-lg "
      data-tour="detail-step-2"
    >
      <div className="flex items-center space-x-2 transform ">
        <Progress
          strokeLinecap="square"
          trailColor={"rgba(68, 66, 178, 0.1)"}
          strokeWidth={15}
          // strokeColor={"#f74e52"} background-color: #42378f;
          strokeColor={{
            "0%": "#fb8085",
            "100%": "#f53844",
          }}
          // strokeColor={"#f74e52"}
          percent={percentTichCuc}
          className="w-20 md:w-28 lg:w-52 "

          showInfo={false}
        />
        <span className=" text-sm lg:text-base">
          {userInfor.tichCuc}/{userInfor.tichCucToiDa} HP{" "}
        </span>
      </div>
      <div className="flex items-center space-x-2 transform ">
        <Progress
          strokeLinecap="square"
          trailColor={"rgba(68, 66, 178, 0.1)"}
          strokeWidth={15}
          strokeColor={{
            "0%": "#5B86E5",
            "100%": "#36D1DC",
          }}

          percent={percentKinhNghiem}
          className="w-20 md:w-28 lg:w-52 "
          showInfo={false}
        />
        <span className=" text-sm lg:text-base">
          {userInfor.kinhNghiem}/{userInfor.kinhNghiemToiDa} XP{" "}
        </span>
      </div>
    </div>
  );
}
