import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import backGrountTemplate from "../../assets/img/background.png";
import logo from "../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import ListLoTrinh from "./ListLoTrinh";

import {
  DesktopResponsive,
  TabletResponsive,
  MobileResponsive,
} from "../../HOC/Responsive";
import "./blackfriday.css";
// import imgBf from '../../assets/img/blackfriday/blAnimation.png'
import imgBannerDesktop from "../../assets/img/lucky_20_10_web.jpg";
import imgBannerMobie from "../../assets/img/lucky_20_10_mobie.png";

import { getTatCaLoTrinhAciton } from "../../redux/reducer/loTrinhReducer";
import WheelComponent from "./LuckyDraw/WhellCustom";
import { segColors, segments } from "./segmentArr";
import useWindowSize from "../../hook/useWindowSize";
import ListPrize from "./ListPrize";
export default function LuckyTetPage() {
  let { widthWindow, heightWindow } = useWindowSize();
  let userInfor = useSelector((state) => state.authUser.userInfor);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  useEffect(() => {
    dispatch(getTatCaLoTrinhAciton(userInfor?.id));
  }, []);

  const handleFocusForm = () => {
    inputRef.current && inputRef.current.focus();
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backGrountTemplate})`,
      }}
      className="w-full   min-h-screen  overflow-y-auto bg-cover  flex-col  bg-fixed    flex   "
    >
      <div className=" h-full w-full flex flex-grow border-none       flex-col   ">
        {/* <img
          src={logo}
          alt=""
          className="h-14 object-contain  inline-block p-2 rounded absolute left-5  top-5 z-10 md:left-6 md:top-6"
        /> */}

        <DesktopResponsive>
          <div className="flex justify-center items-center  relative w-full h-max-content m-0">
            {/* <img src={imgBf} className="tada_animation cursor-pointer w-44 block  absolute left-1/2 transform  bottom-10 " alt="" onClick={handleFocusForm} /> */}

            <img
              src={imgBannerDesktop}
              alt=""
              // style={{ height: "1000px" }}
              className="w-full inline-block   object-cover m-0 "
            />
            <p className="absolute bottom-2 text-center w-full ">
              {/* Chỉ áp dụng cho các khóa học tại CyberLearn.vn */}
            </p>
            <div
              style={{ bottom: "5px", left: "7%" }}
              className="w-max h-max-content  absolute "
            >
              <WheelComponent
                textSize={0.8}
                segments={segments}
                segColors={segColors}
                onFinished={(winner) => {}}
                primaryColor="black"
                contrastColor="white"
                width={widthWindow / 2.9}
                height={widthWindow / 2.9}
                heightContainer={widthWindow / 2.9 + 100}
                widthContainer={widthWindow / 2.9}
                buttonText="Bắt đầu"
                isOnlyOnce={false}
                size={widthWindow / 5.8 - 20}
                upDuration={100}
                downDuration={1000}
                fontFamily="Arial"
              />
            </div>
          </div>
          <div className="  flex justify-center flex-col space-y-5">
            <ListPrize />
          </div>
          <ListLoTrinh />
        </DesktopResponsive>
        <TabletResponsive>
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="flex justify-center items-center  relative w-full ">
              {/* <img src={imgBf} className="tada_animation cursor-pointer w-44 block  absolute left-1/2 transform  bottom-10 " alt="" onClick={handleFocusForm} /> */}

              <img
                src={imgBannerDesktop}
                alt=""
                className="w-full inline-block h-96 object-cover"
              />
              <p className="absolute bottom-2 text-center w-full ">
                {/* Chỉ áp dụng cho các khóa học tại CyberLearn.vn */}
              </p>
              <div
                // style={{ transform: "translateX(-165px) translateY(-11px)" }}
                style={{ bottom: "10px", left: "10%" }}
                className="w-max h-max-content  absolute "
              >
                <WheelComponent
                  textSize={0.7}
                  sizeBtnStart={20}
                  segments={segments}
                  segColors={segColors}
                  onFinished={(winner) => {}}
                  primaryColor="black"
                  contrastColor="white"
                  width={widthWindow / 3}
                  height={widthWindow / 3}
                  heightContainer={widthWindow / 3 + 100}
                  widthContainer={widthWindow / 3}
                  buttonText="Bắt đầu"
                  isOnlyOnce={false}
                  size={widthWindow / 6 - 20}
                  upDuration={100}
                  downDuration={1000}
                  fontFamily="Arial"
                />
              </div>
            </div>
            <div className="  flex justify-center flex-col space-y-5">
              <ListPrize />
            </div>
            <ListLoTrinh />
          </div>
        </TabletResponsive>
        <MobileResponsive>
          <div className="flex  items-center space-y-3 flex-col">
            <div className="flex justify-center  items-center  relative w-full ">
              {/* <img src={imgBf} className="tada_animation cursor-pointer w-44 block object-contain  absolute     left-1/3 md:left-1/2 bottom-10" alt="" onClick={handleFocusForm} /> */}

              <img
                src={imgBannerMobie}
                alt=""
                className="w-full inline-block object-cover "
              />
              <div
                // style={{ transform: "translateX(00px) translateY(200px)" }}
                className="w-max h-max-content  absolute  bottom-5 "
              >
                <WheelComponent
                  textSize={0.7}
                  sizeBtnStart={40}
                  segments={segments}
                  segColors={segColors}
                  onFinished={(winner) => {}}
                  primaryColor="black"
                  contrastColor="white"
                  width={widthWindow * 0.7}
                  height={widthWindow * 0.7}
                  heightContainer={widthWindow * 0.7}
                  widthContainer={widthWindow * 0.7}
                  buttonText="Bắt đầu"
                  isOnlyOnce={false}
                  size={(widthWindow * 0.7) / 2 - widthWindow * 0.05}
                  upDuration={100}
                  downDuration={1000}
                  fontFamily="Arial"
                />
              </div>
              <p className="absolute bottom-2 text-center w-full text-white ">
                {/* Chỉ áp dụng cho các khóa học tại CyberLearn.vn */}
              </p>
            </div>
            <div className="  flex justify-center flex-col space-y-3 w-full">
              {/* <FormDangKIBlackFiday inputRef={inputRef} /> */}
              <ListPrize />
            </div>
          </div>
        </MobileResponsive>
        <div className=" flex justify-center space-x-3 pb-5">
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
      </div>
    </div>
  );
}
