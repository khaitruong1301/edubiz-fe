import React from "react";
import { Progress } from "antd";
import environment from "../../environments/environment";
import { getHinhAnh } from "../../utils/GetHinhanh";
export default function User_Top_Avatar({
  user,
  width_Badge = "8",
  positon_Bot_Badge = "4",
}) {
  const widthBadge = "w-" + width_Badge;
  const heigthBadge = "h-" + width_Badge;
  const positon_Bottom_Badge = positon_Bot_Badge * 4;
  return (
    <div className="relative w-full h-full max-w-max-avatar-user max-h-max-avatar-user  rounded-full custom_circl_ant">
      <img
        src={user.avatar}
        className="w-full h-full  block rounded-full m-0 object-cover "
        alt=""
      />
      <img
        style={{ bottom: `-${positon_Bottom_Badge}px` }}
        src={`${environment.baseUrl}/${user.huyHieu}`}
        className={`${widthBadge} ${heigthBadge} m-0  absolute left-1/2 transform -translate-x-1/2  z-10`}
        alt=""
      />

      <Progress
        type="circle"
        strokeColor={{
          "0%": "#5B86E5",
          "100%": "#36D1DC",
        }}
        percent={100}
        showInfo={false}
        className="absolute w-full h-full center-position scale-125 origin-center rotate-180"
        // trailColor="transparent"
        trailColor={"rgba(68, 66, 178, 0.1)"}
      />
    </div>
  );
}
