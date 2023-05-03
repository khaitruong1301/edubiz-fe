import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { Progress, Tooltip } from "antd";
import ReactTooltip from "react-tooltip";
import "./CardKhoaHoc_DesignCode.css";
import { getHinhAnh } from "../../utils/GetHinhanh";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import LazyLoad from "react-lazyload";
function CardKhoaHoc_DesignCode({ khoaHoc, bg_color, id_tool_tip, loTrinh, isDemoUser = false, isBlackFridayDay = false, urlCourse = '/detail-khoa-hoc' }) {
  let isDisableUserClick = loTrinh?.daHetHan || !loTrinh?.daDangKy;
  if (checkDemoUser()) {
    isDisableUserClick = false;
  }
  if (isBlackFridayDay) {
    isDisableUserClick = true
  }
  const renderCard = () => {
    return (
      <div
        style={{ background: bg_color }}
        className="card_khoa_hoc_design_code_wrapper ds-code gYFusV p-3 lg:p-4 md:w-72 lg:w-80 lg:max-w-max-w-9/10 flex flex-col justify-between md:h-80 lg:h-84 mx-auto"
      >
        <LazyLoad once={true} >
          <div className="wrapper_img md:h-32 lg:h-36 flex-shrink-0 mx-auto flex justify-center">
            <img src={getHinhAnh(khoaHoc.hinhAnh)} alt="" />
          </div>
        </LazyLoad>
        <div className="  w-full text-white my-2  flex flex-col justify-between ">
          <p className=" text-base  text-center font-medium h-20  ">
            {khoaHoc.tenKhoaHoc}
          </p>

          <ReactTooltip
            className="tooltip"
            backgroundColor={"rgba(0, 0, 0, 0.5)"}
            id={id_tool_tip.toString() + "totalLesstion"}
          />
          <ReactTooltip
            className="tooltip"
            id={id_tool_tip.toString() + "totalTracNghiem"}
          />
          <ReactTooltip
            className="tooltip"
            id={id_tool_tip.toString() + "totalTime"}
          />
          <ReactTooltip
            className="tooltip"
            id={id_tool_tip.toString() + "totalHoneWrok"}
          />
        </div>
        <div className="mb-2 px-1">
          <div className="flex w-full justify-between items-end text-gray-300   mb-1">
            <div className="font-medium text-sm flex items-start  flex-col ">
              <p
                data-tip={` Số bài tập trắc nghiệm: ${khoaHoc?.tongTracNghiem}`}
                data-for={id_tool_tip.toString() + "totalTracNghiem"}
              >
                <span className="ml-2">
                  <i className="fa fa-dumbbell  mr-1 "></i>{" "}
                  {khoaHoc?.tongTracNghiem}
                </span>
              </p>

              <p
                data-tip={`Thời lượng khóa học:${khoaHoc?.tongSoPhut} phút `}
                data-for={id_tool_tip.toString() + "totalTime"}
              >
                <span className="ml-2">
                  <i className="fa fa-clock mr-2"></i>
                  {khoaHoc?.tongSoPhut}
                </span>
              </p>
            </div>
            <div className="font-medium text-sm flex items-start  flex-col ">
              <p
                data-tip={`Tổng bài học:${khoaHoc?.tongBaiHoc}`}
                data-for={id_tool_tip.toString() + "totalLesstion"}
              >
                <span className="ml-2">
                  <i className="fab fa-leanpub mr-2"></i>
                  {khoaHoc?.tongBaiHoc}
                </span>
              </p>

              <p
                data-tip={` Số bài tập luyện & nộp: 
                ${khoaHoc?.tongBaiTap}
                `}
                data-for={id_tool_tip.toString() + "totalHoneWrok"}
              >
                <span className="ml-2">
                  <i className="fa fa-book-reader mr-2"></i>
                  {khoaHoc?.tongBaiTap}
                </span>
              </p>
            </div>
          </div>
          {!isDemoUser && <Progress
            className="w-full px-2"
            trailColor="rgb(156, 163, 175)"
            percent={Math.floor(
              (khoaHoc.soBaiDaHoanThanh / khoaHoc.tongBaiHoc) * 100
            )}
            status="active"
          />}
        </div>
      </div>
    );
  };
  return isDisableUserClick ? (
    <Tooltip
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.3}
      trigger={["click", "hover"]}
      placement="top"
      animation="zoom"
      color="white"
      overlay={
        <p className="text-blue-theme  p-1  text-center">
          {!loTrinh?.daDangKy
            ? "Bạn cần đăng ký lộ trình để xem được khoá học này"
            : "Bạn cần gia hạn lộ trình để xem được khoá học này"}
        </p>
      }
      // overlayClassName="bg-red-500"
      onVisibleChange={(visible) => {
        console.log(visible);
      }}
    >
      <a>
      {renderCard()}
      </a>
    </Tooltip>
  ) : (
    <NavLink
      className=""
      to={`${urlCourse}/${khoaHoc.id}`}
      style={{ color: "inherit", textDecoration: "inherit" }}
    >
      {renderCard()}
    </NavLink>
  );
}
export default memo(CardKhoaHoc_DesignCode);
