import { Tooltip, message } from "antd";

import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
const BtnTitleVideo = React.memo(
  ({ lesson, isLearned, hightLightcss, isCancelUserClick, isDemoUser, onToggle, isCanWatch, isLock }) => {

    const dispatch = useDispatch();

    const getUrlVideo = (noiDung) => {
      httpServ.getUrlVideo_FPT(noiDung).then((res) => {
        dispatch(setCurrentLesson(lesson));
        if (onToggle)
          onToggle();
      });
    };

    let disableXemdemo = isDemoUser && !lesson.xemDemo;

    let color = isCancelUserClick ? "text-color-title" : "text-color-content";

    if (disableXemdemo) {
      color = "text-color-content";
    }


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
            "lession-menu-item cursor-pointer flex flex-col   justify-center h-max-content items-start  px-1 min-h-16   border-gray-200 rounded-none border-b-1 w-full border-l-0 border-r-0  transform duration-300 card_theme " +
            hightLightcss
          }
          key={lesson.id + "menuItem"}
          onClick={() => {
            // getUrlVideo(lesson.noiDung);
          }}
        >
          <button
            className=" items-center  flex  px-2  justify-center   p-1 min-h-16 h-max-content   transform duration-300  rounded-lg w-full "
            onClick={() => {
              !isLock && getUrlVideo(lesson.noiDung);
            }}
          >
            <div className="btn-icon break-words text-center px-1 font-normal text-sm lg:text-lg  text-blue-theme flex items-center space-y-1  justify-start w-6 h-6 left-6  flex-shrink-0 rounded-full bg-gray-300 mr-2">
              {renderIcon()}
            </div>
            <div className="flex  flex-col w-full justify-start  h-max-content">
              <span
                className={
                  "w-full text-left text-sm lg:text-base " + color + hightLightcss
                }
              >
                {lesson.tenBaiHoc}
              </span>
              <div className="flex  items-center w-full justify-between">
                <div className="flex space-x-1  justify-start items-center w-full ">
                  <div className=" card_theme bg-gray-400  h-6 rounded-full leading-6 w-6 flex justify-center items-center transform scale-75 relative overflow-hidden  ">
                    <i className="fa fa-play text-blue-theme text-xs opacity-75"></i>
                  </div>
                  <span className=" text-color-content h-6 transform translate-y-0.5">
                    {" "}
                    {lesson.thoiLuong} phút
                  </span>
                </div>
                {
                  lesson.moTa ? <a onClick={() => { 
                    if (lesson.moTa?.split('.').slice(-1)[0] === "pptx") return window.open(`https://docs.google.com/viewerng/viewer?url=https://backend.edubiz.vn${lesson.moTa}`, '_blank').focus();
                    return  window.open(`https://backend.edubiz.vn${lesson.moTa}`, '_blank').focus()
                   }}
                    // href={`https://backend.cyberlearn.vn/${lesson.moTa}`}
                    target="_blank"
                  >
                    <button className="flex items-center space-x-1 h-max-content rounded p-1 border-gray-600 w-max flex-shrink-0 border-1 text-color-content cursor-pointer hover:text-gray-900  px-2 transform duration-300 hover:border-gray-500">
                      <i className="fa fa-folder-open"></i>
                      <span>Tài nguyên</span>
                      <i className="fa fa-download"></i>
                    </button>
                  </a> : null
                }
              </div>
            </div>
          </button>
        </div>
      );
    };


    return (
      !isLock ? (
        renderButton()
      ) : (
        <Tooltip
          className="p-0"
          mouseEnterDelay={0.1}
          mouseLeaveDelay={0.3}
          trigger={["click"]}
          placement="top"
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
      )
    )
  }
);
export default BtnTitleVideo;
