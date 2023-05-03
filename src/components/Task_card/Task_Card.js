import React from "react";

export default function Task_Card({ data, color }) {
  return (
    <div
      style={{ backgroundColor: color.bg }}
      className="cart-mobile-item w-full  p-2 px-3  min-h-22 justify-between flex items-center relative rounded-lg shadow-lg"
    >
      <div className="w-max pl-6 h-full flex flex-col  relative ">
        <p className="text-gray-600">{data.tenKhoaHoc}</p>
        <p className="text-color-title font-medium text-sm lg:text-base">{data.tenBaiTap}</p>
        <p className="text-gray-800 font-normal">Deadline {data.ngayHetHan}</p>
        <div
          style={{ backgroundColor: color.line }}
          className="h-4/5 w-1 left-2 top-1/2 transform absolute rounded-lg -translate-y-1/2"
        ></div>
      </div>
      <div className="w-max  h-full flex space-x-5 items-center justify-center  pr-2">
        {/* <button className="card_theme shadow rounded-lg text-blue-theme font-medium border-none p-3 w-24 text-center">
          Xem Task
        </button>
        <button className="  shadow rounded-lg btn-theme font-medium border-none p-3 text-center w-24 text-white ">
          Nộp bài
        </button> */}
      </div>
    </div>
  );
}
