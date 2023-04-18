import React from "react";
import { Progress, Tooltip } from "antd";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { useDispatch, useSelector } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { LO_TRINH_CUA_BAN_TAB } from "../../utils/Constant";
import { setCurrentTabLoTrinh } from "../../redux/reducer/layoutReducer";

export default function ItemLoTrinhDashboard({ loTrinh }) {
  const dispatch = useDispatch();

  const { tatCaLoTrinh } = useSelector((state) => state.loTrinh);

  let loTrinhChuaDangKi = tatCaLoTrinh.filter((item) => {
    return !item.daDangKy;
  });
  let widthLeftContainer =
    loTrinhChuaDangKi.length === 0 ? " w-1/2 justify-evenly" : "w-max";
  const percentPhut = Math.floor(
    (loTrinh.soPhutHoanThanh / loTrinh.tongPhut) * 100
  );
  const percentBaiTapNop = Math.floor(
    (loTrinh.baiTapNopHoanThanh / loTrinh.tongBaiTapNop) * 100
  );
  const percentTracNghiem = Math.floor(
    (loTrinh.tracNghiemHoanThanh / loTrinh.tongTracNghiem) * 100
  );

  const renderButton = () => {
    return checkDemoUser() ? (
      <Tooltip
        mouseEnterDelay={0}
        mouseLeaveDelay={0.3}
        trigger={["click", "hover"]}
        placement="right"
        animation="zoom"
        overlayClassName="  "
        color="white"
        title={
          <p className="text-blue-theme  p-1  text-center">
            Bạn cần đăng kí lộ trình để sử dụng được tính năng này
          </p>
        }
      >
        <button className="btn-theme text-white rounded-lg  py-1 px-1.5 lg:py-1.5 text-xs font-bold lg:text-sm">
          Đi đến lộ trình
        </button>
      </Tooltip>
    ) : (
      <HashLink
        onClick={() => {
          dispatch(setCurrentTabLoTrinh(LO_TRINH_CUA_BAN_TAB));
        }}
        to={`/lo-trinh#${loTrinh.id}`}
      >
        <button className="btn-theme shadow-lg text-white rounded-lg  py-1 px-1.5 lg:py-1.5 text-xs font-bold lg:text-sm">
          Đi đến lộ trình
        </button>
      </HashLink>
    );
  };
  return (
    <div className="w-full  h-48 p-3 Card_LoTrinh_DashBoard  flex card_theme_item border-transparent text-color-title  ">
      <div className=" flex flex-col flex-grow max-w-max-w-1/2 lg:p-2 py-2 space-y-5 items-start justify-center ">
        <p className=" text-base">{loTrinh.tenLoTrinh}</p>
        <div className="w-max   ">{renderButton()}</div>
      </div>
      <div
        className={"flex  flex-shrink-0 space-x-3 lg:space-x-5 h-full " + widthLeftContainer}
      >
        <div className="flex flex-col items-center  h-full justify-center space-y-2 lg:space-y-3">
          <Progress
            format={(percent) => (
              <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
            )}
            strokeColor={"rgb( 117, 95, 211)"}
            trailColor={"rgba( 117, 95, 211,0.3)"}
            type="circle"
            className="w-16 lg:w-22"
            strokeWidth={10}
            percent={percentPhut}
          />
          <div className=" text-sm lg:text-base flex flex-col items-center">
            <span className="font-medium">
              {loTrinh.soPhutHoanThanh}/{loTrinh.tongPhut}
            </span>
            <span>Phút video </span>
          </div>
        </div>

        <div className="flex flex-col items-center  h-full justify-center space-y-2 lg:space-y-3">
          <Progress
            format={(percent) => (
              <span style={{ color: "rgb( 70, 220, 216)" }}>{percent}% </span>
            )}
            strokeColor={"rgb( 70, 220, 216)"}
            trailColor={"rgba( 70, 220, 216,0.3)"}
            type="circle"
            className="w-16 lg:w-22"
            strokeWidth={10}
            percent={percentTracNghiem}
          />
          <div className=" text-sm lg:text-base flex flex-col items-center">
            <span className="font-medium">
              {loTrinh.tracNghiemHoanThanh}/{loTrinh.tongTracNghiem}{" "}
            </span>
            <span>Trắc nghiệm </span>
          </div>
        </div>
        <div className="flex flex-col items-center  h-full justify-center space-y-2 lg:space-y-3">
          <Progress
            format={(percent) => (
              <span style={{ color: "rgb(234, 83, 172)" }}>{percent}% </span>
            )}
            strokeColor={"rgb(234, 83, 172)"}
            trailColor={"rgba(234, 83, 172,0.3)"}
            type="circle"
            className="w-16 lg:w-22"
            strokeWidth={10}
            percent={percentBaiTapNop}
          />

          <div className=" text-sm lg:text-base flex flex-col items-center">
            <span className="font-medium">
              {loTrinh.baiTapNopHoanThanh}/{loTrinh.tongBaiTapNop}{" "}
            </span>
            <span> Bài tập nộp</span>
          </div>
        </div>
      </div>
    </div>
  );
}
