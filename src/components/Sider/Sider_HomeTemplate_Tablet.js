import Sider from "antd/lib/layout/Sider";
import Menu from "rc-menu/lib/Menu";
import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarRoute } from "../../routes";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
export default function Sider_HomeTemplate_Tablet({
  isOpenFlashSale,
  collapsed,
}) {
  return (
    <>
      <Sider
        breakpoint={"lg"}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: isOpenFlashSale ? 160 : 80,
        }}
        className={` z-0 bg-transparent sider_theme rounded-t-none border-t-0 dark:border-dard_theme_boder_color`}
        width={120}
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={70}
      >
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          className={
            collapsed
              ? `font-medium rounded-sm ring-blue-400 colapped  flex flex-col items-center   `
              : "font-medium rounded-sm ring-blue-400 flex flex-col items-center px-2 "
          }
        >
          {sidebarRoute.map((item, index) => {
            let cssBtn = item.disable
              ? " text-color-content  cursor-not-allowed"
              : " text-color-navigate ";
            return item.disable ? (
              <Tooltip
                mouseEnterDelay={0}
                mouseLeaveDelay={0.1}
                trigger={["click"]}
                placement="right"
                animation="zoom"
                overlay={
                  <span>
                    Bạn cần đăng kí lộ trình để sử dụng được tính năng này
                  </span>
                }
                onVisibleChange={(visible) => {
                  // console.log(visible);
                }}
              >
                <div
                  key={index}
                  className="flex flex-col  p-2 py-3 justify-center items-center  h-20 m-0  w-full space-y-1 transform duration-300  rounded-lg  my-1"
                >
                  <button className={"menu_icon_sidebar " + cssBtn}>
                    {" "}
                    {item.icon}
                  </button>
                  <span
                    className={
                      collapsed
                        ? `font-medium rounded-sm  colapped hidden`
                        : `  rounded-sm  break-words w-max text-center px-1 font-normal  ${cssBtn}`
                    }
                  >
                    {item.title}
                  </span>
                </div>
              </Tooltip>
            ) : (
              <NavLink
                key={index}
                exact
                to={item.path}
                activeClassName="selected_menu shadow-lg"
                className="flex flex-col   p-2 py-3 justify-center items-center  h-20 m-0  w-full space-y-1  transform duration-300  rounded-lg  my-1"
              >
                <button className={"menu_icon_sidebar " + cssBtn}>
                  {" "}
                  {item.icon}
                </button>
                <span
                  className={
                    collapsed
                      ? `font-medium rounded-sm  colapped hidden`
                      : `  rounded-sm  break-words w-max text-center px-1 font-normal  ${cssBtn}`
                  }
                >
                  {item.title}
                </span>
              </NavLink>
            );
          })}
        </Menu>
      </Sider>
    </>
  );
}
