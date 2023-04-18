import React from "react";
import Lottie from "lottie-react";
import coin_lottie from "../../assets/lottie_json/18089-gold-coin.json";
import { Popconfirm } from "antd";
export default function Button_GiaHan({ text, handleClick }) {
  return (
    <Popconfirm
      placement="top"
      title={
        <div>
          <p>{text}</p>
          <div className="flex items-center ">
            <span> Chi phí:</span>
            <Lottie
              animationData={coin_lottie}
              style={{ width: 50, height: 50 }}
              className="transform -translate-x-2 "
            />{" "}
            <span className="text-blue-theme font-medium transform -translate-x-3">
              20
            </span>{" "}
          </div>
        </div>
      }
      onConfirm={handleClick}
      okText="Đồng ý"
      cancelText="Huỷ"
    >
      <button
        // onClick={handleClick}
        className=" cursor-pointer btn-theme p-1 px-3 shadow-lg font-medium text-lg text-white border-none rounded-lg flex space-x-1 items-center"
      >
        <span>{text}</span>{" "}
        <Lottie
          loop={false}
          animationData={coin_lottie}
          style={{ width: 50, height: 50 }}
          className="transform translate-x-2 "
        />{" "}
        <span className="text-white">20</span>
      </button>
    </Popconfirm>
  );
}
