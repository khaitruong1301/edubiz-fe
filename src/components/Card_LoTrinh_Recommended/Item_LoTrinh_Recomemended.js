import { Tooltip } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { HashLink } from "react-router-hash-link";
import { setCurrentTabLoTrinh } from "../../redux/reducer/layoutReducer";
import { TAT_CA_LO_TRINH_TAB } from "../../utils/Constant";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import Icon_Animation from "../Icon_Animation/Icon_Animation";
import Registed_User_Avatar from "../Registed_User_Avatar/Registed_User_Avatar";

export default function Item_LoTrinh_Recomemended({ loTrinh }) {
  const dispatch = useDispatch();

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
          dispatch(setCurrentTabLoTrinh(TAT_CA_LO_TRINH_TAB));
        }}
        to={`/lo-trinh#${loTrinh.id}`}
      >
        <button className="btn-theme text-white rounded-lg  py-1 px-1.5 lg:py-1.5 text-xs font-bold lg:text-sm">
          Đi đến lộ trình
        </button>
      </HashLink>
    );
  };
  return (
    <div className="w-full flex card_theme_item border-transparent h-48 p-2 lg:p-3 ">
      <div className="w-full h-full flex flex-col space-y-1 justify-between  ">
        <div className="flex space-x-3 flex-grow items-center">
          <div className="max-h-max-content min-w-max flex-shrink-0">
            <Icon_Animation />
          </div>
          <p className="text-base text-color-title">{loTrinh.tenLoTrinh}</p>
        </div>
        <div className="w-full space-y-2 lg:space-y-3 ">
          <div className="flex justify-end  ">
            {/* <p className="text-color-content font-medium text-sm lg:text-base">
              Học viên đã đăng kí
            </p>{" "} */}
            {renderButton()}
          </div>
          {/* <div className="flex w-full h-7 lg:h-8 items-center space-x-2">
            <div className="flex space-x-2 w-full flex-wrap h-full overflow-hidden ">
              {loTrinh.dsAvatar.map((item) => {
                return (
                  <div className="h-7 lg:h-8 w-7 lg:w-8 flex-shrink-0">
                    <Registed_User_Avatar src_img={item} />;
                  </div>
                );
              })}
            </div>
            <span className="text-white bg-purple-900 rounded-full px-2 py-1 text-sm lg:text-base font-medium flex-shrink-0 ">
              +{loTrinh.tongHocVien}
            </span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
