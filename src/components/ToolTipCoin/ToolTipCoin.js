import React from "react";
import Lottie from "lottie-react";
import coin_lottie from "../../assets/lottie_json/18089-gold-coin.json";
import { Tooltip } from "antd";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import moment from "moment";
import { useSelector } from "react-redux";

function ToolTipCoin({ loop = true }) {
  const { userInfor } = useSelector(state => state.authUser)
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
              Công dụng: Bạn có thể dùng coin để mua vật phẩm để đổi voucher
              hoặc tăng điểm tích cực và điểm kinh nghiệm. Bạn sẽ nhận được coin
              sau khi học bài, hoàn thành bài tập , hoàn hành trắc nghiệm,... và ngày tích lũy.
            </p>
            {!checkDemoUser() ? <p>
              - Lưu ý: Số coin của bạn sẽ được làm mới khi quá hạn tích lũy coin.
              <p>
                - Ngày làm mới coin: {moment(userInfor?.ngayTichLuyCoin).format("L")}
              </p>
            </p> : ""}
          </div>
        </div>
      }
    >
      <Lottie
        loop={loop}
        animationData={coin_lottie}
        style={{ width: 50, height: 50, cursor: "pointer" }}
      />{" "}
    </Tooltip>
  );
}
export default ToolTipCoin = React.memo(ToolTipCoin);
