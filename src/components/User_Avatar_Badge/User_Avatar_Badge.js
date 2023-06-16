import React, { memo } from "react";
import { Progress } from "antd";
import { useSelector } from "react-redux";
import environment from "../../environments/environment";

let User_Avatar_Badge = ({ width_Badge = "8", positon_Bot_Badge = "4" }) => {
  const { userInfor } = useSelector((state) => state.authUser);

  const percentTichCuc = (userInfor?.tichCuc / userInfor?.tichCucToiDa) * 100;
  const percentKinhNghiem =
    (userInfor?.kinhNghiem / userInfor?.kinhNghiemToiDa) * 100;

  const widthBadge = "w-" + width_Badge;
  const heigthBadge = "h-" + width_Badge;
  const positon_Bottom_Badge = positon_Bot_Badge * 4;
  return (
    <div className="relative w-full h-full max-w-max-avatar-user max-h-max-avatar-user  rounded-full custom_circl_ant">
      <div className="avatar-image">
        {
          userInfor && userInfor.avatar ?
            <img
              src={`${environment.baseUrl}${userInfor.avatar}`}
              className="w-full h-full  block rounded-full m-0  object-cover "
              alt=""
            />
            :
            <img
              src={process.env.PUBLIC_URL + '/img/User-Icon.jpg'}
              className="w-full h-full  block rounded-full m-0  object-cover "
              alt=""
            />
        }
      </div>
      {/* <img
        style={{ bottom: `-${positon_Bottom_Badge}px` }}
        src={`${environment.baseUrl}/${userInfor?.huyHieu}`}
        className={`${widthBadge} ${heigthBadge} m-0  absolute left-1/2 transform -translate-x-1/2  z-10`}
        alt=""
      /> */}
      <Progress
        type="circle"
        strokeColor={{
          "0%": "#fb8085",
          "100%": "#f53844",
        }}
        percent={percentTichCuc}
        showInfo={false}
        className="absolute w-full h-full center-position scale-110"
        trailColor={"rgba(68, 66, 178, 0.1)"}
      />
      <Progress
        type="circle"
        strokeColor={{
          "0%": "#5B86E5",
          "100%": "#36D1DC",
        }}
        percent={percentKinhNghiem}
        showInfo={false}
        className="absolute w-full h-full center-position scale-125 origin-center rotate-180"
        trailColor={"rgba(68, 66, 178, 0.1)"}
      />
    </div>
  );
};

export default User_Avatar_Badge = memo(User_Avatar_Badge);
