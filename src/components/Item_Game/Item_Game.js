import Lottie from "lottie-react";
import React from "react";
import { useDispatch } from "react-redux";
import { setDialogItem } from "../../redux/reducer/dashboardReducer";
import coin_lottie from "../../assets/lottie_json/18089-gold-coin.json";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { Tooltip } from "antd";
import { getHinhAnh } from "../../utils/GetHinhanh";

const Item_Game = React.memo(({ item, canBuyItem, canOpenDialog = true }) => {
  const dispatch = useDispatch();
  const handleSetDataDialog = () => {
    canOpenDialog &&
      dispatch(
        setDialogItem({
          isShow: true,
          canBuyItem: canBuyItem,
          dataItem: item,
        })
      );
  };
  const renderContent = () => {
    return (
      <div
        style={{
          boxShadow:
            " 0 1px 3px 0 rgb(26 24 29 / 12%), 0 1px 2px 0 rgb(26 24 29 / 24%)",
        }}
        className="w-22 lg:w-24 h-22 lg:h-24 flex-shrink-0 rounded bg-white flex flex-col relative  transform scale-90 items-center cursor-pointer"
        onClick={() => {
          !checkDemoUser() && handleSetDataDialog();
        }}
      >
        <img
          src={getHinhAnh(item.hinhAnh)}
          className="w-16 lg:w-20 h-16 lg:h-20 object-contain transform scale-75"
          alt=""
        />

        <div className="btn-theme w-full h-6 flex items-center justify-center  flex-shrink-0 absolute left-0 bottom-0">
          {canBuyItem ? (
            !item.loaiChiPhi ? (
              <>
                <Lottie
                  loop={false}
                  animationData={coin_lottie}
                  style={{ width: 50, height: 50 }}
                  className="transform -translate-x-1"
                />
                <span className="font-bold transform -translate-x-3 text-white">
                  {item.chiPhi}
                </span>
              </>
            ) : (
              <>
                <i className="fa fa-dollar-sign text-green-theme"></i>
                <span className="font-bold  text-white">{item.chiPhi}</span>
              </>
            )
          ) : (
            <span className="font-bold text-white ">{item.ngayHetHan}</span>
          )}
        </div>
      </div>
    );
  };
  return checkDemoUser() ? (
    <Tooltip
      // placement={this.state.placement}
      className="p-0"
      mouseEnterDelay={0.1}
      mouseLeaveDelay={0.3}
      trigger={["click"]}
      placement="top"
      animation="zoom"
      overlayClassName="  "
      color="white"
      title={
        <p className="text-blue-theme  p-1  text-center">
          Bạn cần đăng kí lộ trình để dùng được tính năng này!
        </p>
      }
      onVisibleChange={(visible) => {
      }}
    >
      {renderContent()}
    </Tooltip>
  ) : (
    renderContent()
  );
});
export default Item_Game;
