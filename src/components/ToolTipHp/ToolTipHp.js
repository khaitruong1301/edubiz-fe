import React from "react";

import { Progress, Tooltip } from "antd";
import { iconTichCuc } from "../../assets/icons";

function ToolTipHP({ userInfor, width }) {
  const percentTichCuc = (userInfor?.tichCuc / userInfor?.tichCucToiDa) * 100;

  return (
    <Tooltip
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.1}
      trigger={["click", "hover"]}
      placement="top"
      animation="zoom"
      overlayClassName=" w-max rounded-lg"
      overlayStyle={{ maxWidth: "900px" }}
      color="white"
      title={
        <div className="flex items-center w-max p-3 justify-center">
          <div className=" text-base  w-72 space-y-3 text-gray-800">
            <p>Đây là khu vực hiển thị điểm tích cực của bạn</p>
            <p>
              Bạn sẽ nhận được điểm kinh nghiệm sau khi hoàn thành lộ trình,
              khoá học, bài học, bài tập,...
            </p>
            <p>
              Bạn sẽ bị trừ điểm tích cực sau khi không học trong 1 khoảng thời
              gian, nộp bài quá hạn, làm sai trắc nghiệm,..
            </p>
          </div>
        </div>
      }
    >
      <div className="flex items-center space-x-2 cursor-pointer text-color-blue-white">
        {iconTichCuc}
        <Progress
          strokeLinecap="square"
          trailColor={"rgba(68, 66, 178, 0.1)"}
          strokeWidth={15}
          strokeColor={{
            "0%": "#fb8085",
            "100%": "#f53844",
          }}
          // strokeColor={"#f74e52"}
          percent={percentTichCuc}
          className={width}
          showInfo={false}
        />
        <span className=" text-sm lg:text-base hidden lg:inline-block">
          {userInfor?.tichCuc}/{userInfor?.tichCucToiDa} HP{" "}
        </span>
      </div>
    </Tooltip>
  );
}
export default ToolTipHP = React.memo(ToolTipHP);
