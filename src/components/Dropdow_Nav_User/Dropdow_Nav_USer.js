import { Menu } from "antd";
import React from "react";
import { withRouter } from "react-router-dom";
import { handleLogoutAction } from "../../utils/LogOut";

const Dropdow_Nav_USer = React.memo(() => {

  const handleLogout = () => {
    handleLogoutAction();
  };
  return (
    <Menu className="rounded-lg bg-transparent card_theme  shadow-lg">
      <div className="space-y-8 h-max-content card_theme p-5">
        <div
          onClick={handleLogout}
          className=" cursor-pointer flex items-center justify-start space-x-2 group"
        >
          <p className="group-hover:text-blue-theme"> Đăng xuất</p>{" "}
          <i className="fa fa-sign-out-alt group-hover:text-blue-theme"></i>
        </div>
      </div>
    </Menu>
  );
});
export default withRouter(Dropdow_Nav_USer);
