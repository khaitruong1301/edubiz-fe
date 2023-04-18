import React, { useState } from "react";
import Lottie from "lottie-react";
import login_bg from "../../assets/lottie_json/login-bg.json";
import "../../css/loginPage.css";
import BtnLoginFacebook from "../../components/BtnLoginFacebook/BtnLoginFacebook";
import LogoCyber from "../../components/LogoCyber/LogoCyber";


export default function LoginPageMobile() {
  return (
    <div
      className="w-screen min-h-screen card_theme overflow-hidden bg-cover  flex-col  bg-fixed p-5 flex "
    >
      <div className="card_theme w-full flex-grow flex flex-col relative">
        <div className="w-full flex flex-grow flex-col justify-between relative p-5 px-10">
          <div className="w-full flex-shrink-0 border-none  flex flex-col items-start ">
            <LogoCyber />
          </div>
          <div className="flex flex-col justify-center space-y-5 pb-5 items-center">
            <p className="title_login  text-xl">Hệ thống học tập CyberLearn</p>
            <div className="w-full flex items-center justify-center relative ‹  ">

              <div className="w-2/3 h-1/3  flex items-center justify-center">
                <div className="    scale-150">
                  <Lottie
                    animationData={login_bg}
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
            <div className="    w-full flex flex-col justify-center items-center space-y-3  relative z-10">
              <p className="text-color-content text-base">
                Vui lòng đăng nhập bằng Facebook để học tập
              </p>
              <BtnLoginFacebook />
            </div>
          </div>
          <div className="flex items-center space-x-5 w-full justify-center ">
            <a href="https://cybersoft.edu.vn/" target="_blank" className="text-color-content border-b-1 border-gray-700">
              CyberSoft
            </a>
            <a href="https://cyberlearn.vn/" target="_blank" className="text-color-content border-b-1 border-gray-700">
              CyberLearn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
