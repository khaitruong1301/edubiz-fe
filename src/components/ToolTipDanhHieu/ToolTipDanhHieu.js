import React from "react";
import environment from "../../environments/environment";

import { Tooltip } from "antd";

function ToolTipDanhHieu({ userInfor }) {
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
              Đây là danh hiệu và hình danh hiệu hiện tại của bạn, level càng
              cao thì danh hiệu càng xịn, bạn sẽ được thay đổi thay đổi danh
              hiệu và hình danh hiệu sau khi tăng level
            </p>
          </div>
        </div>
      }
    >
      <div className="text-lg text-color-title transform   w-full text-center font-medium flex justify-center items-center space-x-2 cursor-pointer">
        <span>{userInfor?.danhHieu}</span>{" "}
        {/* <img
          src={`${environment.baseUrl}/${userInfor?.danhHieuHinh}`}
          alt=""
          className="w-8 h-8  m-0 "
        /> */}
      </div>
    </Tooltip>
  );
}
export default ToolTipDanhHieu = React.memo(ToolTipDanhHieu);
