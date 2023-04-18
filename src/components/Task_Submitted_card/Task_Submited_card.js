import React from "react";
import { QUIZ_WRITE } from "../../utils/Constant";
import { Tooltip } from "antd";

import './suKienCss.css'
import ReactHtmlParser from "react-html-parser";

export default function Task_Submitted_Card({ data, color }) {
  return (
    <div
      style={{ backgroundColor: color?.bg }}
      className="w-full  p-2 px-3 min-h-22  justify-between flex items-center relative rounded-lg shadow-sm"
    >
      <div className="w-max pl-6 h-full flex flex-col relative justify-center ">
        <p className="text-gray-600">{data?.khoaHoc}</p>
        <p className="text-dark font-medium text-sm lg:text-base">{data.tenBaiTap} </p>

        <div
          style={{ backgroundColor: color?.line }}
          className="h-4/5 w-1 left-2 top-1/2 transform absolute rounded-lg -translate-y-1/2"
        ></div>
      </div>
      {!data.hetHan && (
        <div className="w-max  h-full flex flex-col lg:flex-row space-x-2 lg:space-x-5 items-center justify-center  lg:pr-2">

          {data.loaiBaiTap === QUIZ_WRITE ? (
            data.nhanNhet && <Tooltip
              mouseEnterDelay={0}
              mouseLeaveDelay={0.5}
              trigger={["click"]}
              placement="top"
              animation="zoom"
              overlayClassName="  "
              color="white"
              title={
                <p className="text-blue-theme  p-1  text-center">
                  {ReactHtmlParser(data.nhanXet)}
                </p>
              }
            // overlayClassName="bg-red-500"

            >
              <button className="w-28 flex-shrink-0 shadow rounded-lg btn-theme border-none p-2 lg:p-3 text-center text-white text-sm lg:text-sm ">
                Xem nhận xét
              </button>
            </Tooltip>

          ) : (
            <div className=" flex-shrink-0 h-5 w-28 "></div>
          )}
          <span className=" w-28  font-medium border-none p-3  text-center text-dark">
            {data.diem} điểm
          </span>
        </div>
      )}
    </div>
  );
}
