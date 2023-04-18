import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import User_Avatar_Badge from "../User_Avatar_Badge/User_Avatar_Badge";
import { ConvertNameUser } from "../../utils/ConvertNameUser";
import localStorageServ from "../../services/locaStorage.service";
import { useHistory } from "react-router";
import { handleLogoutAction } from "../../utils/LogOut";
function DropdowUser() {
  const { userInfor } = useSelector((state) => state.authUser);
  let history = useHistory();

  const handleLogout = () => {
    handleLogoutAction()
  };
  return (
    <Menu as="div" className="relative  text-left  flex items-center z-50">
      <Menu.Button className="border-0 inline-flex justify-center w-full rounded-md    text-sm font-medium text-color-blue-white ">
        <div className="space-x-3 text-color-navigate  flex items-center">
          <div className="w-14 h-14">
            <User_Avatar_Badge width_Badge={6} positon_Bot_Badge={2} />
          </div>
          <span className="text-lg text-color-blue-white ">{ConvertNameUser(userInfor?.hoTen)}</span>
          <i className="fa fa-angle-down text-lg"></i>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-left absolute right-0 mt-40 w-48 rounded-md shadow-lg card_theme  ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 p-3 card_theme">
            <div
              onClick={handleLogout}
              className=" cursor-pointer flex items-center justify-start space-x-2 text-color-navigate
        "
            >
              <p className=" text-color-title"> Đăng xuất</p>{" "}
              <i className="fa fa-sign-out-alt  "></i>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
export default DropdowUser = memo(DropdowUser);
