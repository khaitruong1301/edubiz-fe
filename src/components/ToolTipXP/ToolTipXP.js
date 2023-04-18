import React from "react";

import { Tooltip, Progress } from "antd";
import { iconXp } from "../../assets/icons";

function ToolTipXP({ userInfor, width }) {
  const percentKinhNghiem =
    (userInfor?.kinhNghiem / userInfor?.kinhNghiemToiDa) * 100;
  return (
    <Tooltip
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      trigger={["click", "hover"]}
      placement="top"
      animation="zoom"
      overlayClassName=" w-max "
      overlayStyle={{ maxWidth: "900px" }}
      color="white"
      title={
        <div className="flex items-center w-max p-3 justify-center">
          <div className=" text-base  w-72 space-y-3 text-gray-800">
            <p>Đây là khu vực hiển thị điểm kinh nghiệm của bạn</p>
            <p>
              Bạn sẽ nhận được điểm kinh nghiệm sau khi hoàn thành lộ trình,
              khoá học, bài học, bài tập,...
            </p>
          </div>
        </div>
      }
    >
      <div className="flex items-center space-x-2 cursor-pointer text-color-blue-white">
        {iconXp}

        <Progress
          strokeLinecap="square"
          trailColor={"rgba(68, 66, 178, 0.1)"}
          strokeWidth={15}
          strokeColor={{
            "0%": "#5B86E5",
            "100%": "#36D1DC",
          }}
          percent={percentKinhNghiem}
          className={width}
          showInfo={false}
        />
        <span className=" text-sm lg:text-base hidden lg:inline-block">

          {userInfor?.kinhNghiem}/{userInfor?.kinhNghiemToiDa} XP{" "}
        </span>
      </div>
    </Tooltip>
  );
}
export default ToolTipXP = React.memo(ToolTipXP);
