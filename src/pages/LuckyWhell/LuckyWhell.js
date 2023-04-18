import axios from "axios";
import React, { useState, useRef } from "react";
import backGrountTemplate from "../../assets/img/background.png";
import { Modal } from "antd";
import logo from "../../assets/img/logo.png";

// import WheelComponent from "./WhellCustom";
import WheelComponent from "./LuckyDraw/WhellCustom";
import {
  DesktopResponsive,
  TabletResponsive,
  MobileResponsive,
} from "../../HOC/Responsive";

export default function LuckyWhell() {
  const segments = [
    {
      label: "Giải 1",
      value: "Giảm giá 50% + Tặng thêm 1 tháng gia hạn",
    },
    {
      label: "Giải 2",
      value: "Giảm giá 55% +  Tặng thêm 1 tháng gia hạn",
    },
    {
      label: "Giải 3",
      value: "Giảm giá 65% +  Tặng thêm 1 tháng gia hạn",
    },
    // {

    //     label: "Giải 4",
    //     value: 'Giảm giá 50% + Tặng thêm 1 tháng gia hạn',
    // },
    // {

    //     label: "Giải 5",
    //     value: 'Giảm 60% + Tặng thêm 1 tháng gia hạn'
    // },
    // {

    //     label: "Giải 6",
    //     value: 'Giảm 65% + Tặng thêm 1 tháng gia hạn',
    // },
  ];
  const segColors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
  ];
  const onFinished = (winner) => {
    // console.log(winner)
  };
  const [valuesForm, setValuesForm] = useState({
    email: "",
    code: "",
  });
  const btnStartRef = useRef();
  const [message, setMessage] = useState("");

  const handleGetValueForm = (event) => {
    const { name, value } = event.target;
    setValuesForm({ ...valuesForm, [name]: value });
  };
  const handleCheckGmail = (callback) => {
    axios({
      method: "GET",
      url: `https://apicrm.cybersoft.edu.vn/api/quyen/checkuser/0/tranquangsigl@gmail.com`,
    })
      .then((res) => {
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div
      style={{
        backgroundImage: `url(${backGrountTemplate})`,
      }}
      className="w-full   min-h-screen  card_theme overflow-y-auto bg-cover  flex-col  bg-fixed  p-5  lg:p-5 xl:p-7 flex   "
    >
      <div className=" h-full w-full flex flex-grow card_theme p-3 space-y-3   justify-center flex-col  py-20 lg:py-0 ">
        <div className="absolute bottom-3 space-x-3 left-1/2 transform -translate-x-1/2 z-20">
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
        <img
          src={logo}
          alt=""
          className="h-14 object-contain  inline-block p-2 rounded absolute left-5 top-5  md:left-10 md:top-10"
        />
        <p className="text-center mt-5  md:mt-20 text-lg md:text-xl ">
          BLACK FRIDAY - 2021 - ÁP DỤNG CHO KHÓA HỌC TẠI{" "}
          <a
            className="text-blue-theme font-medium underline"
            href="https://cyberlearn.vn/"
            target="_blank"
          >
            CYBERLEARN.VN
          </a>
        </p>
        <DesktopResponsive>
          <div className="flex justify-center items-center space-x-5">
            <WheelComponent
              textSize={0.8}
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              width={600}
              height={600}
              heightContainer={700}
              widthContainer={600}
              buttonText="Bắt đầu"
              isOnlyOnce={false}
              size={230}
              upDuration={100}
              downDuration={1000}
              fontFamily="Arial"
              ref={btnStartRef}
            />
            <div className="space-y-3 p-3 card_theme border-none">
              {segments.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2">
                    {" "}
                    <span
                      className=" inline-block h-10 w-10  flex-shrink-0"
                      style={{ backgroundColor: segColors[index] }}
                    ></span>{" "}
                    <p className="">
                      <span className="font-medium">{item.label}</span>:{" "}
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </DesktopResponsive>
        <TabletResponsive>
          <div className="flex justify-center items-center space-x-5">
            <WheelComponent
              textSize={0.8}
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              width={400}
              height={400}
              heightContainer={700}
              widthContainer={400}
              buttonText="Bắt đầu"
              isOnlyOnce={false}
              size={190}
              upDuration={100}
              downDuration={1000}
              fontFamily="Arial"
              ref={btnStartRef}
            />
            <div className="space-y-3 p-3 card_theme border-none">
              {segments.map((item, index) => {
                return (
                  <div className="flex items-center space-x-2">
                    {" "}
                    <span
                      className=" inline-block h-10 w-10  flex-shrink-0"
                      style={{ backgroundColor: segColors[index] }}
                    ></span>{" "}
                    <p className="">
                      <span className="font-medium">{item.label}</span> :{" "}
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </TabletResponsive>
        <MobileResponsive>
          <div className="flex justify-center items-center space-y-3 flex-col">
            <WheelComponent
              textSize={0.7}
              sizeBtnStart={40}
              segments={segments}
              segColors={segColors}
              onFinished={(winner) => onFinished(winner)}
              primaryColor="black"
              contrastColor="white"
              width={320}
              height={320}
              heightContainer={700}
              widthContainer={320}
              buttonText="Bắt đầu"
              isOnlyOnce={false}
              size={150}
              upDuration={100}
              downDuration={1000}
              fontFamily="Arial"
              ref={btnStartRef}
            />
            <div className="space-y-1 p-3 card_theme border-none w9">
              {segments.map((item, index) => {
                return (
                  <div className="flex items-center justify-start space-x-2 ">
                    {" "}
                    <span
                      className="  h-7 w-7 flex-shrink-0"
                      style={{ backgroundColor: segColors[index] }}
                    ></span>{" "}
                    <p className="">
                      <span className="font-medium">{item.label}</span> :{" "}
                      {item.value}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </MobileResponsive>
      </div>
    </div>
  );
}
