import React from "react";
import Lottie from "lottie-react";
import login_bg from "../../assets/lottie_json/login-bg.json";
import "../../css/loginPage.css";
import BtnLoginFacebook from "../../components/BtnLoginFacebook/BtnLoginFacebook";
import LogoCyber from "../../components/LogoCyber/LogoCyber";
import Switch_Theme from "../../components/Buttons/Switch_Theme";
import { NavLink } from "react-router-dom";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function LoginPageDeskTop() {
  return (
    <div

      className="w-screen h-screen  overflow-hidden bg-cover  flex-col  bg-fixed p-10 flex "
    >
      <div className="card_theme_item w-full flex-grow flex flex-col relative overflow-hidden">
        <div className="w-full flex flex-grow  relative">
          <div className="absolute bottom-3 space-x-3 left-1/2 transform -translate-x-1/2 z-20">
            <a href="https://cybersoft.edu.vn/" target="_blank" className="text-color-content border-b-1 border-gray-700">
              CyberSoft
            </a>
            <a href="https://cyberlearn.vn/" target="_blank" className="text-color-content border-b-1 border-gray-700">
              CyberLearn
            </a>

            <NavLink to={"/baomat"}  target="_blank" className="text-color-content border-b-1 border-gray-700">
              Privacy Policy
            </NavLink>
          </div>
          <div className="h-full w-3/5 flex-shrink-0 border-none p-5 flex flex-col items-start ">
            <LogoCyber />
            <div className="  flex-grow  w-full flex flex-col justify-center space-y-7  ml-10 pb-24 relative z-10">
              <p className="title_login ">Hệ thống học tập Edubiz</p>
              {/* <BtnLoginFacebook /> */}
              <LoginForm />
            </div>
          </div>
          <div className="w-2/5 h-full flex items-center justify-center relative ‹  ">
            <img
              src="https://hubspot.iqonic.design/hubfs/raw_assets/public/xamin-theme/images/banner/circle-white.png"
              className="absolute border-t-0 -right-1/3  object-contain scale-150 transform"
              alt=""
            />
            <div className="w-full h-full   transform translate-y-32 -translate-x-32  scale-150">
              <Lottie
                loop={false}
                animationData={login_bg}
                style={{ width: 600, height: 600 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
