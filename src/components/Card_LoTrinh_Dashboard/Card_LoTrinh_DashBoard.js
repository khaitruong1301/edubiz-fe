import React from "react";
import { useSelector } from "react-redux";
import { LoTrinhCuaBan_Fake_Data } from "../../fakeData/LoTrinhCuaBan_Fake_Data";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import "./Card_LoTrinh_Dashboard.css";
import ItemLoTrinhDashboard from "./ItemLoTrinhDashboard";

const Card_LoTrinh_DashBoard = () => {
  let listLoTrinh = [];

  let listLoTrinhCuaBan = useSelector((state) => state.loTrinh.loTrinhDaDangKi);

  listLoTrinh = checkDemoUser() ? LoTrinhCuaBan_Fake_Data : listLoTrinhCuaBan;

  let extraCss = listLoTrinh.length > 2 ? "list_khoaHoc" : "";

  console.log(listLoTrinhCuaBan);
  return (
    <div className={"w-full space-y-3  h-full " + extraCss}>
      {
        listLoTrinh.map((loTrinh) => {
          return <ItemLoTrinhDashboard loTrinh={loTrinh} />;
        })
      }
    </div>
  );
};

export default Card_LoTrinh_DashBoard;
