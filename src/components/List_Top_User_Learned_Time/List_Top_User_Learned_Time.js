import React from "react";
import { iconXp } from "../../assets/icons";
import User_Top_Avatar from "../User_Top_Avatar/User_Top_Avatar";
export default function User_Top_Learned_Time({ user, index }) {
  return (
    <div
      className={`w-full flex items-center space-x-4  px-2 h-20  bg-opacity-20 relative border-b   border-white shadow py-4 `}
    >
      {/* <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-400 flex items-center justify-center">
      <img
        src="https://w7.pngwing.com/pngs/701/23/png-transparent-black-and-brown-gorilla-illustration-discord-avatar-twitch-youtube-profile-mammal-face-heroes-thumbnail.png"
        alt=""
        className="rounded-full w-10 h-10 m-0"
      />
    </div> */}
      <span className="">#{index + 1}</span>
      {/* <div className="transform -translate-y-1"> */}
      <User_Top_Avatar />
      {/* </div> */}
      <div className=" w-full">
        <p className="ml-2">{user.hoTen}</p>
        <p className="ml-2">{user.danhHieu}</p>
        {/* <p className="ml-2">{user.title}</p> */}
      </div>
      <div className="flex flex-col items-start justify-between h-full flex-shrink-0">
        {/* <div className="flex items-center">
        {iconXp} {user.coin}
      </div>
      <div className="flex items-center"> {user.coin} phút</div> */}

        <div className="  flex">
          {iconXp} {user.kinhNghiem}
        </div>
        <p style={{ color: "#4884ee" }} className="pl-2 text-sm font-medium ">
          Level: {user.capDo}
        </p>
      </div>

      {/* <i className="fa fa-ellipsis-v"></i> */}
    </div>
  );
}
