import React from "react";
import environment from "../../environments/environment";

import { Tooltip } from "antd";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { useSelector } from "react-redux";

function ToolTipHuyHieu({ userInfor }) {

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
            {checkDemoUser() ?
              <p>
                Đây là danh hiệu hiện tại của bạn, level càng cao thì danh hiệu
                càng xịn, bạn sẽ được thay đổi thay đổi danh hiệu sau khi tăng  level
              </p> :
              <p>
                Đây là danh hiệu hiện tại của bạn, level càng cao thì danh hiệu
                càng xịn, bạn sẽ được thay đổi thay đổi danh hiệu sau khi tăng mỗi
                {userInfor.capTangDanhHieu} level
              </p>
            }
          </div>
        </div>
      }
    >
      <img
        src={`${environment.baseUrl}/${userInfor?.huyHieu}`}
        className={`w-12  lg:w-16 h-12 lg:h-16 m-0 hover cursor-pointer`}
        alt=""
      />
    </Tooltip>
  );
}
export default ToolTipHuyHieu = React.memo(ToolTipHuyHieu);
