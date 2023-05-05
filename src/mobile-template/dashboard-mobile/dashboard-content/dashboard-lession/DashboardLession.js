import React from "react";
import { Progress } from "antd";
import { useDispatch } from "react-redux";
import { CustomLink, URL_PAGE } from "../../../common";
import { setIdBaiDangHocDashboard } from "../../../../redux/reducer/baiHocContentReducer";
import './DashboardLession.css'

export default function DashboardLession({ lesson }) {
  const dispatch = useDispatch();

  return (
    <div className="dashboard-lession mt-2">
      <p className="dashboard-lession_series">{lesson.loTrinhChu}</p>
      <p className="dashboard-lession_course mt-1">{lesson.khoaHocChu}</p>
      <div className="dashboard-lession_bottom">
        <div className="dashboard-lession_process">
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
        <div className="dashboard-lession_lession">
          <p className="mb-2">{lesson.baiHocChu}</p>
          <CustomLink onClick={() => { dispatch(setIdBaiDangHocDashboard(lesson.baiHocId)); }} to={`${URL_PAGE.COURSE}/${lesson.khoaHocId}`}>
            Tiếp tục học
          </CustomLink>
        </div>
      </div>
    </div>
  )
}