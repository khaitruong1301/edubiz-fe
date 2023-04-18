import React, { useState } from "react";
import Lottie from "lottie-react";
import login_bg from "../../assets/lottie_json/login-bg.json";
import "../../css/loginPage.css";
import BtnLoginFacebook from "../../components/BtnLoginFacebook/BtnLoginFacebook";
import LogoCyber from "../../components/LogoCyber/LogoCyber";
import Switch_Theme from "../../components/Buttons/Switch_Theme";

export default function LoginPageTablet() {
  return (
    <div className="w-screen h-screen  overflow-hidden bg-cover flex flex-col  bg-fixed p-10  ">
      <div className="card_theme_item w-full flex-grow flex flex-col relative">
        <div className="w-full flex flex-grow flex-col relative overflow-hidden">
          <div className="absolute bottom-3 space-x-3 left-1/2 transform -translate-x-1/2">
            <a
              href="https://cybersoft.edu.vn/"
              target="_blank"
              className="text-color-content border-b-1 border-gray-700"
            >
              CyberSoft
            </a>
            <a
              href="https://cyberlearn.vn/"
              target="_blank"
              className="text-color-content border-b-1 border-gray-700"
            >
              CyberLearn
            </a>
          </div>
          <div className=" w-full flex-shrink-0 border-none p-5 flex flex-col items-start ">
            <LogoCyber />
            <div className="  flex-grow  w-full flex flex-col justify-center space-y-7  ml-10 pb-24 relative z-10">
              <p className="title_login ">Hệ thống học tập CyberLearn</p>
              <p className="text-color-content text-base">
                Vui lòng đăng nhập bằng Facebook để học tập
              </p>
              <BtnLoginFacebook />
            </div>
          </div>
          <div className="w-full flex items-center justify-center relative  ">
            <img
              src="https://hubspot.iqonic.design/hubfs/raw_assets/public/xamin-theme/images/banner/circle-white.png"
              className="absolute border-t-0 -right-1/3  object-contain  transform"
              alt=""
            />
            <div className="h-96 w-96 flex items-center justify-center ">
              <div className=" transform  scale-150">
                <Lottie
                  animationData={login_bg}
                  style={{ width: 500, height: 500 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
