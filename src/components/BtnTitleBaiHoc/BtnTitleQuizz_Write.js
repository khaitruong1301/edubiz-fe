import { Tooltip } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setBaiTapNop,
  setCurrentLesson,
} from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";

export default function BtnTitleQuizz_Write({
  lesson,
  hightLightcss,
  isLearned,
  isDemoUser

}) {
  const dispatch = useDispatch();



  const userInfor = localStorageServ.userInfor.get();
  let disableXemdemo = isDemoUser && !lesson.xemDemo;
  let color = !disableXemdemo ? "text-color-title" : "text-color-content";
  const renderButton = () => {
    return (
      <div
        className={
          "cursor-pointer card_theme rounded-none flex flex-col   justify-center items-center  px-1 min-h-16    w-full   transform duration-100 border-gray-200  border-b-1 border-l-0 border-r-0 " +
          hightLightcss
        }
        key={lesson.id + "menuItem"}
        onClick={() => {
          !isDemoUser && dispatch(setCurrentLesson(lesson));
          !isDemoUser &&
            httpServ
              .getThongTinBaiTapNop(userInfor?.id, lesson.id)
              .then((res) => {
                dispatch(setBaiTapNop(res.data.content));
              })
              .catch((err) => {
                console.log(err);
              });
        }}
      >
        <button
          className={"  flex  px-2  justify-center items-center  p-0 min-h-16     transform duration-300  rounded-lg w-full "}

        // onClick={() => {
        //   getUrlVideo(lesson.noiDung);
        // }}
        >
          <div className="   break-words text-center px-1 font-normal  text-base lg:text-lg  text-blue-theme flex items-center space-y-1  justify-start w-6 h-6 left-6  flex-shrink-0 rounded-full bg-gray-300 mr-2">
            <i
              className={
                isLearned
                  ? "fa fa-check mr-3 text-sm flex-shrink-0 text-green-600"
                  : "fa fa-check mr-3 text-sm flex-shrink-0 text-transparent"
              }
            ></i>
          </div>
          <div
            className={
              "flex items-center w-full justify-start space-x-2 " + color
            }
          >
            <i className="fa fa-pen-square"></i>
            <span
              className={
                "w-full text-left text-sm lg:text-base " + color + hightLightcss
              }
            >
              {lesson.tenBaiHoc}
            </span>
            {/* <div className="flex space-x-1  justify-start items-center w-full">
          <div className=" card_theme bg-gray-400  h-6 rounded-full leading-6 w-6 flex justify-center items-center transform scale-75 relative overflow-hidden  ">
            <i className="fa fa-play text-blue-theme text-xs opacity-75"></i>
          </div>
          <span className=" text-gray-500 h-6 transform translate-y-0.5">
            {" "}
            {lesson.thoiLuong} phút
          </span>
        </div> */}
          </div>
        </button>
      </div>
    );
  };
  return !disableXemdemo ? (
    renderButton()
  ) : (
    <Tooltip
      mouseEnterDelay={0}
      mouseLeaveDelay={0.3}
      trigger={["click", "hover"]}
      placement="right"
      animation="zoom"
      overlayClassName="  "
      color="white"
      title={
        <p className="text-blue-theme  p-1  text-center">
          Bạn cần đăng kí lộ trình để xem được video này
        </p>
      }
    >
      {renderButton()}
    </Tooltip>
  );
}
