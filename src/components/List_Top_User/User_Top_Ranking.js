import React from "react";
import { iconXp } from "../../assets/icons";
import { getHinhAnh } from "../../utils/GetHinhanh";
import User_Top_Avatar from "../User_Top_Avatar/User_Top_Avatar";
import LazyLoad from "react-lazyload";

const User_Top_Ranking = React.memo(({ user, index, tab }) => {
  let extraCss = "";
  let arrName = user.hoTen.split(" ");
  if (arrName.length > 3) {
    arrName = [
      arrName[1],
      arrName[arrName.length - 2],
      arrName[arrName.length - 1],
    ];
  }

  const renderText = () => {
    switch (tab) {
      case 0:
        return <span>{user.tongThoiGian} <small>phút</small></span>
      case 1:
        return <span>{user.tongDiem} <small>điểm</small></span>
      case 2:
        return <>{iconXp} {user.kinhNghiem}</>
      default:
        break;
    }
  }

  return (
    <div
      className={`w-full flex items-center   px-2 h-20 ${extraCss} bg-opacity-20 relative border-b   border-white shadow py-4 `}
    >

      <div className="flex-grow h-full items-center flex space-x-3 ">
        <span className="w-10 text-color-content">#{index + 1}</span>
        <div className="w-12 h-12  flex-shrink-0">
          <User_Top_Avatar user={user} width_Badge={6} positon_Bot_Badge={3} />
        </div>
        <div className=" w-full">
          <p className="ml-2 text-color-content">{arrName.join(" ")}</p>
          <div className="flex space-x-1 items-center text-color-content">
            <p className="ml-2">{user.danhHieu}</p>{" "}
            {/* <LazyLoad once={true} >
              <img
                src={getHinhAnh(user.danhHieuHinh)}
                alt=""
                className="m-0 p-0 inline-block w-4 h-4"
              />
            </LazyLoad> */}

          </div>
        </div>
      </div>
      <div className="flex flex-col items-cetner  justify-between h-full flex-shrink-0 w-16">


        <div className="  p-0 m-0 flex justify-center text-color-content ">
          {/* {iconXp} {user.kinhNghiem} */}
          {
            renderText()
          }
        </div>
        <p style={{ color: "#4884ee" }} className="pl-2 text-xs font-medium text-color-content ">
          Level: {user.capDo}
        </p>
      </div>

    </div>
  );
});
export default User_Top_Ranking;
