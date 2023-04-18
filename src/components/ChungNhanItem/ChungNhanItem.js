import React from "react";
import "./ChungNhan.css";
import bground from "../../assets/img/bgChungNhan.jpg";
export default function ChungNhanItem({ chungNhan, userInfor }) {
  return (
    <div className="  bg-certificate print container  relative flex text-center">
      <img src={bground} className="imgCertificate " />
      <div className="absolute divFullName ">
        <h3 className="fullName ">{userInfor.hoTen} </h3>
      </div>
      <div className="absolute divTenChungNhan ">
        <h3 className="tenChungNhan">{chungNhan.tenChungNhan}</h3>
      </div>
      <div className="absolute divDuration">
        <h3 className="Duration">{chungNhan.thoiGianDaoTao} months</h3>
      </div>
      <div className="absolute divTimeTraining">
        <h3 className="TimeTraining">{chungNhan.thoiGianDaoTao} tháng</h3>
      </div>

      <div className="absolute divSoChungNhan">
        <h3 className="SoChungNhan">{chungNhan.soChungNhan} </h3>
      </div>
      <div className="absolute divCapNgay ">
        <h3 className="CapNgay">{chungNhan.ngayCap}</h3>
      </div>
    </div>
  );
}
