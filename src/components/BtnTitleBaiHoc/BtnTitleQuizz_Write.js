import { Tooltip } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  setBaiTapNop,
  setCurrentLesson,
} from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";

export default function BtnTitleQuizz_Write({ lesson, hightLightcss, isLearned, isDemoUser, onToggle, isCanWatch, isLock }) {
  const dispatch = useDispatch();



  const userInfor = localStorageServ.userInfor.get();
  let disableXemdemo = isDemoUser && !lesson.xemDemo;
  let color = !disableXemdemo ? "text-color-title" : "text-color-content";

  const renderIcon = () => {
    if (hightLightcss)
      return <i className="fa fa-play mr-3 flex-shrink-0" style={{ color: 'rgb(16 185 129)' }}></i>
    else if (isLearned) {
      return <i className="fa fa-check mr-3 text-sm flex-shrink-0 text-green-600"></i>
    }
    else if (isCanWatch)
      return <i className="mr-3 flex-shrink-0"></i>
    else
      return <i className="fa fa-lock mr-3 flex-shrink-0"></i>
  }

  const renderButton = () => {
    return (
      <div
        className={
          "lession-menu-item cursor-pointer card_theme rounded-none flex flex-col   justify-center items-center  px-1 min-h-16    w-full   transform duration-100 border-gray-200  border-b-1 border-l-0 border-r-0 " +
          hightLightcss
        }
        key={lesson.id + "menuItem"}
        onClick={() => {
          !isLock && dispatch(setCurrentLesson(lesson));
          !isLock &&
            httpServ
              .getThongTinBaiTapNop(userInfor?.id, lesson.id)
              .then((res) => {
                dispatch(setBaiTapNop(res.data.content));
                if (onToggle)
                  onToggle();
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
          <div className="btn-icon break-words text-center px-1 font-normal  text-base lg:text-lg  text-blue-theme flex items-center space-y-1  justify-start w-6 h-6 left-6  flex-shrink-0 rounded-full bg-gray-300 mr-2">
            { renderIcon() }
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

  return !isLock ? (
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
          Bạn hãy hoàn thành các bài học trước để có thể học bài này!
        </p>
      }
    >
      {renderButton()}
    </Tooltip>
  );
}
