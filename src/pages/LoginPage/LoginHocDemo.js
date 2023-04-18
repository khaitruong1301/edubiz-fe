import React, { useState } from "react";
import Lottie from "lottie-react";
import login_bg from "../../assets/lottie_json/login-bg.json";
import backGrountTemplate from "../../assets/img/background.png";
import "../../css/loginPage.css";
import Form_Login_Demo from "../../components/Form_Login_Demo/Form_Login_Demo";
import LogoCyber from "../../components/LogoCyber/LogoCyber";
import Switch_Theme from "../../components/Buttons/Switch_Theme";

export default function LoginPageDemo() {
  return (
    <div

      className="w-screen min-h-screen  overflow-hidden bg-cover flex flex-col  bg-fixed p-10 relative "
    >
      <div className="card_theme_item w-full flex-grow flex flex-col overflow-hidden">
        <div className="w-full  flex-grow  relative">
          <div className="absolute bottom-3 space-x-3 left-1/2 transform -translate-x-1/2">
            <a href="" className="text-color-content border-b-1 text-color-content">
              CyberSoft
            </a>
            <a href="" className="text-color-content border-b-1 text-color-content">
              CyberLearn
            </a>
          </div>
          <div className="h-full w-3/5 flex-shrink-0 border-none p-5 flex flex-col items-start ">
            <LogoCyber />
            <div className="  flex-grow  w-full flex flex-col justify-center space-y-7  md:ml-10 pb-24 relative z-10">
              <p className="title_login ">Hệ thống học tập CyberLearn</p>

              <Form_Login_Demo />
            </div>
          </div>
          <div className="w-2/5 h-full flex items-center justify-center relative overflow-hidden  ">
            <img
              src="https://hubspot.iqonic.design/hubfs/raw_assets/public/xamin-theme/images/banner/circle-white.png"
              className="absolute border-t-0 -right-1/3  object-contain scale-150 transform"
              alt=""
            />
          </div>
          <div className="   top-1/2 transform -translate-y-1/2 md:right-0  scale-150 absolute">
            <Lottie
              loop={false}
              animationData={login_bg}
              style={{ width: 600, height: 600 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
