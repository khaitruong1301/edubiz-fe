import { Progress, Tooltip } from "antd"; 
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { setIdBaiDangHocDashboard } from "../../redux/reducer/baiHocContentReducer";
import { checkDemoUser } from "../../utils/HocDemoUtils";

export default function Card_Continue_Dashboard({ lesson }) {

  const dispatch = useDispatch();

  const renderButton = () => {
    return checkDemoUser() ? (
      <Tooltip
        mouseEnterDelay={0}
        mouseLeaveDelay={0.3}
        trigger={["click"]}
        placement="top"
        animation="zoom"
        overlayClassName="  "
        color="white"
        title={
          <p className="text-blue-theme  p-1  text-center">
            Bạn cần đăng kí lộ trình để xem được tính năng này
          </p>
        }
      >
        <div className="" onClick={() => { }}>
          <button
            className="text-white text-sm rounded-lg py-1 px-1.5 w-max shadow-lg btn-theme "
          >
            Tiếp tục học
          </button>
        </div>
      </Tooltip>
    ) : (
      <NavLink
        className=""
        to={`/detail-khoa-hoc/${lesson.khoaHocId}`}
        style={{ color: "inherit", textDecoration: "inherit" }}
        onClick={() => {
          dispatch(setIdBaiDangHocDashboard(lesson.baiHocId));
        }}
      >
        <button
          style={{ backgroundColor: "rgb(106, 201, 119)" }}
          className="text-white text-sm rounded-lg py-1 px-1.5 w-max shadow-lg btn-theme "
        >
          Tiếp tục học
        </button>
      </NavLink>
    );
  };
  return (
    <div className="flex loTrinh_Dashboard w-full card_theme_item h-max-content  p-2.5 border-0 border-none card_hover_designCode duration-700 cursor-pointer">
      <div className=" space-y-2 w-full flex flex-col justify-between flex-shrink-0">
        <p className="text-color-content  text truncate ">
          {lesson.loTrinhChu}
        </p>
        <p className="text-color-title  text truncate "> {lesson.khoaHocChu}</p>
        <div className="w-full flex justify-start items-center space-x-2">
          <div className="w-16 h-16 flex-shrink-0 ">
            <Progress
              type="circle"
              strokeColor="rgb(106, 201, 119)"
              percent={Math.floor(lesson.phanTram)}
              showInfo={true}
              className="w-full h-full"
              strokeWidth={10}
              trailColor="rgba(106, 201, 119,0.3)"
            />
          </div>
          <div className="flex flex-col flex-grow w-20  justify-center space-y-2 h-full">
            <p className="text-color-title  text truncate  text-lg w-full">
              {lesson.baiHocChu}
            </p>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
}
