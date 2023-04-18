import Sider from "antd/lib/layout/Sider";
import Menu from "rc-menu/lib/Menu";
import React from "react";
import { NavLink } from "react-router-dom";
import { sidebar_Mobie_Route } from "../../routes";

export default function Sider_HomeTemplate_Mobie({
  collapsed,
  isOpenFlashSale,
  toggleSidebar,
}) {
  return (
    <Sider
      breakpoint={"lg"}
      style={{
        // overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
      className={` card_theme rounded-t-none rounded-b-none  z-50 `}
      width={250}
      trigger={null}
      collapsible
      collapsed={collapsed}
      collapsedWidth={0}
      onBreakpoint={(broken) => {
        // console.log("broken", broken);
      }}
      onCollapse={(collapsed, type) => {
        // console.log(collapsed, type);
      }}
    >
      <Menu
        theme="dark"
        // inlineIndent={0}
        defaultSelectedKeys={["1"]}
        className={
          "font-medium rounded-sm ring-blue-400 flex flex-col items-center px-2 z-10 relative"
        }
      >
        {sidebar_Mobie_Route.map((item, index) => {
          return (
            <NavLink
              key={index}
              exact
              to={item.path}
              activeClassName="selected_menu"
              className="flex   px-2  justify-start items-center  p-0 h-20 m-0  w-full  hover:text-white transform duration-300  rounded-lg card_theme_hover"
            >
              <button className="menu_icon_sidebar text-blue-theme">
                {" "}
                {item.icon}
              </button>
              <span className=" rounded-sm  break-words w-max text-center px-1 font-normal text-blue-theme">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </Menu>
      {collapsed ? (
        ""
      ) : (
        <div
          className="absolute z-0 w-screen h-screen  bg-dark opacity-50 top-0 right-0 transform translate-x-full"
          onClick={toggleSidebar}
        ></div>
      )}
    </Sider>
  );
}
