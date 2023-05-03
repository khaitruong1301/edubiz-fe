import React from "react";
import { useSelector } from "react-redux";
import { LoTrinhCuaBan_Fake_Data } from "../../../../fakeData/LoTrinhCuaBan_Fake_Data";
import { checkDemoUser } from "../../../../utils/HocDemoUtils";
// import "./Card_LoTrinh_Dashboard.css";
import DashboardSeries from "../dashboard-series/DashboardSeries";

function DashboardListSeries() {
  let listLoTrinh = [];
  let listLoTrinhCuaBan = useSelector((state) => state.loTrinh.loTrinhDaDangKi);
  listLoTrinh = checkDemoUser() ? LoTrinhCuaBan_Fake_Data : listLoTrinhCuaBan;
  return (
    <div>
      {listLoTrinh.map((loTrinh, index) => {
        return <DashboardSeries key={index} loTrinh={loTrinh} />;
      })}
    </div>
  );
};

export default DashboardListSeries;
