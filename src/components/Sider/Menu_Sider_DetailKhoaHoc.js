import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./Menu_Sider_DetailKhoaHoc.css";
import SubMenu_Sider_DetailKhoaHoc from "./SubMenu_Sider_DetailKhoaHoc";
import { useSelector } from "react-redux";

export default function Menu_Sider_DetailKhoaHoc() {
  const listChuongHoc = useSelector(
    (state) => state.khoaHoc.khoaHocContent?.danhSachChuongHoc
  )

  return (
    <div className=" w-full h-ful ">

      {listChuongHoc?.map((item, index_ChuongHoc) => {
        return <SubMenu_Sider_DetailKhoaHoc key={index_ChuongHoc} course={item} />;
      })}
    </div>
  );
}
