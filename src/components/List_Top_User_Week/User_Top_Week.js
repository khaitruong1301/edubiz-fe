import Lottie from "lottie-react";
import React from "react";
import { iconXp } from "../../assets/icons";
import coin_lottie from "../../assets/lottie_json/18089-gold-coin.json";
import diamond_lottie from "../../assets/lottie_json/8214-diamond.json";
import User_Top_Avatar from "../User_Top_Avatar/User_Top_Avatar";

export default function User_Top_Week({ user, increase }) {
  return (
    <div className="w-full flex items-center space-x-4 py-2">
      {/* <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-400 flex items-center justify-center">
        <img
          src="https://w7.pngwing.com/pngs/701/23/png-transparent-black-and-brown-gorilla-illustration-discord-avatar-twitch-youtube-profile-mammal-face-heroes-thumbnail.png"
          alt=""
          className="rounded-full w-10 h-10 m-0"
        />
      </div> */}
      <User_Top_Avatar />
      <div className="w-full">
        <p className="ml-2 text-lg">{user.name}</p>
        <p className="ml-2">{user.title}</p>
      </div>
      <div className="flex flex-col items-start flex-shrink-0">
        {/* <div className="flex items-center transform translate-y-2 -translate-x-4">
          <Lottie
            animationData={coin_lottie}
            style={{ width: 50, height: 50 }}
            autoplay={false}
          />
          {user.coin}{" "}
        </div> */}
        <div className="flex items-center ">
          {iconXp} {user.coin}{" "}
          <p
            style={{ color: "#54E346" }}
            className="flex items-center space-x-1 ml-3 "
          >
            <i className="  fa fa-long-arrow-alt-up"></i>
            <span>{increase * 10} XP</span>
          </p>
        </div>
        <div className="flex items-center"> {user.coin} phút</div>
      </div>
      {/* <div className="flex flex-col items-start">
        <div className="flex items-center"></div>
         <div className="flex items-center"> {user.coin} phút</div> 
      </div> */}

      <i className="fa fa-ellipsis-v"></i>
    </div>
  );
}
