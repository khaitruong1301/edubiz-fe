import React from "react";
import { Tooltip } from "antd";

function ToolTipLevel({ capDo }) {
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
          <div className=" text-base  w-64 space-y-3 text-gray-800">
            <p>
              Đây là level hiện tại của bạn, học càng nhiều, level càng cao, nếu
              bạn học giỏi sẽ được ghi danh vào TOP USER
            </p>
          </div>
        </div>
      }
    >
      <p
        style={{ color: "#4884ee" }}
        className="text-lg font-medium mr-2 cursor-pointer "
      >
        Level: {capDo}
      </p>
    </Tooltip>
  );
}
export default ToolTipLevel = React.memo(ToolTipLevel);
