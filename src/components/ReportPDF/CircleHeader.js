import { Button, Progress } from "antd";
import React from "react";

export default function CircleHeader({ number, title }) {
  return (
    <div
      style={{ width: "84px", height: "84px", borderRadius: "44px" }}
      className=" flex justify-center -space-y-1 items-center text-center border-4 border-green-theme flex-col"
    >
      {" "}
      <span className="text-lg m-0">{number}</span>
      <span style={{ fontSize: "10px" }} className="font-medium  ">
        {title}
      </span>
    </div>
  );
}
// chiTietKhoaHoc: (5) [{…}, {…}, {…}, {…}, {…}]
// tenLoTrinh: "Combo Lập trình Front End Master ReactJS"
// tongBaiTapNop: 6
// tongKhoaHoc: 5
// tongPhut: 5950
// tongTracNghiem: 1
// tongVideo: 261

// {
//   "tenKhoaHoc": "Khóa 1: React nền tảng qua demo dự án",
//   "lanHocCuoi": "17/10/2021 04:06",
//   "thoiGianThamGia": "10/11/2021 2:30:27 PM",
//   "chiTietChuongHoc": [
//       {
//           "tenChuong": "CHƯƠNG I: REACT KIẾN THỨC NỀN TẢNG",
//           "thoiGianHoc": 479,
//           "hoanThanh": "100%",
//           "tongDiemDuAn": 50,
//           "tongTracNghiem": 0
//       }
//   ],
//   "danhSachDiem": [
//       {
//           "tenBaiTap": "BÀI TẬP TỔNG KẾT KHÓA 1",
//           "trangThai": 0,
//           "diem": "50",
//           "loaiBaiTap": "",
//           "nhanXet": ""
//       }
//   ]
// }
