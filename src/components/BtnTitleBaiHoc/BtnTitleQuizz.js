import { Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";
import { checkDemoUser } from "../../utils/HocDemoUtils";

export default function BtnTitleQuizz({ lesson, hightLightcss, isLearned, isCancelUserClick, onToggle, isCanWatch, isLock }) {
  const dispatch = useDispatch();
  const getContent = () => {
    let newLesson = { ...lesson };
    dispatch(setCurrentLesson(newLesson));
    if (onToggle)
      onToggle();
  };
  let disableXemdemo = checkDemoUser() && !lesson.xemDemo;

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
          "lession-menu-item cursor-pointer card_theme rounded-none flex flex-col   justify-center items-center  px-1 min-h-16    w-full   transform duration-100 border-gray-200  border-b-1 border-l-0 border-r-0 " +
          hightLightcss
        }
        key={lesson.id + "menuItem"}
        onClick={() => {
          !isLock && getContent();
        }}
      >
        <button
          className=" items-center h-full  flex  px-2  justify-center   p-0 min-h-16     transform duration-300  rounded-lg w-full "

        >
          <div className="btn-icon break-words text-center px-1 font-normal text-base lg:text-lg text-blue-theme flex items-center space-y-1  justify-start w-6 h-6 left-6  flex-shrink-0 rounded-full bg-gray-300 mr-2">
            {renderIcon()}
          </div>
          <div className="flex flex-col w-full justify-start h-6">
            <span
              className={
                "w-full text-left text-sm lg:text-base " + color + hightLightcss
              }
            >
              {lesson.tenBaiHoc}
            </span>
          </div>
        </button>
      </div>
    );
  };
  return !isLock ? renderButton() :
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
      // overlayClassName="bg-red-500"
      onVisibleChange={(visible) => {
        // console.log(visible);
      }}
    // visible={isShowToolTip}ƒ
    // trigger={Object.keys(this.state.trigger)}
    >
      {renderButton()}
    </Tooltip>
}
