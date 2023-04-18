import React, { useState, useEffect } from "react";

import { Route } from "react-router-dom";
import { Layout } from "antd";

import Navbar_template from "../../components/Header/Navbar_template";
import Navbar_DetailKhoaHoc from "../../components/Header/Navbar_DetailKhoaHoc";
import Flash_sale from "../../components/Flash_Sale/Flash_sale";
import Sider_HomeTemplate from "../../components/Sider/Sider_HomeTemplate";
import localStorageServ from "../../services/locaStorage.service";
import useWindowSize from "../../hook/useWindowSize";
export default function HomeTemplate(props) {
  let { Component, isCurrentDetailPage } = props;
  const { Header, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [isOpenFlashSale, setIsOpenFlashSale] = useState(false);
  // const [isOpenFlashSale, setIsOpenFlashSale] = useState(
  //   isCurrentDetailPage ? false : true
  // );

  const toggle = () => {
    setCollapsed(!collapsed);
  };
  const eableFlashSale = !isCurrentDetailPage;

  useEffect(() => {
    eableFlashSale && setTimeout(() => {}, 1000);
  }, []);

  useEffect(() => {
    if (!localStorageServ.userDemo.get() && !localStorageServ.userInfor.get()) {
      window.location.href = "/lms";
    }
  }, []);
  const { widthWindow, heightWindow } = useWindowSize();
  return (
    <Route
      {...props}
      render={(propsComponent) => {
        return (
          <Layout
            style={{
              minHeight: "100vh",
            }}
            className=" bg-transparent  "
          >
            {!isCurrentDetailPage ? (
              <Sider_HomeTemplate
                collapsed={collapsed}
                isOpenFlashSale={isOpenFlashSale}
                toggleSidebar={toggle}
              />
            ) : (
              ""
            )}

            <Layout
              style={
                !isCurrentDetailPage
                  ? collapsed
                    ? { marginLeft: widthWindow < 992 ? 70 : 80 }
                    : { marginLeft: widthWindow < 992 ? 120 : 150 }
                  : {}
              }
              className=" bg-transparent duration-200 h-full flex flex-col"
            >
              <Header className="header_theme  bg-transparent  flex justify-between items-center h-max-content z-40  p-0 text-gray-800   w-full  flex-col ">
                <div
                  className={
                    isOpenFlashSale
                      ? "w-full h-20   transform duration-500 relative"
                      : "h-0  transform duration-100 w-full overflow-hidden"
                  }
                >
                  <Flash_sale />
                  <button
                    className="absolute right-10 top-1/2 transform -translate-y-1/2"
                    onClick={() => {
                      setIsOpenFlashSale(false);
                    }}
                  >
                    <i className="fa fa-times text-white text-lg"></i>
                  </button>
                </div>
                <div className=" flex justify-between items-center px-2 lg:px-10 text-gray-800 h-20 bg-transparent w-full dark:border-dard_theme_boder_color">
                  {isCurrentDetailPage ? (
                    <Navbar_DetailKhoaHoc toggleSidebar={toggle} />
                  ) : (
                    <Navbar_template toggleSidebar={toggle} />
                  )}
                </div>
              </Header>
              <div
                className={
                  isOpenFlashSale
                    ? "w-full h-40  transform duration-500"
                    : `w-full h-20`
                }
              ></div>

              <Content className="site-layout-background bg-transparent w-full  h-full   m-0 flex flex-col ">
                <Component {...propsComponent}></Component>
              </Content>
            </Layout>
          </Layout>
        );
      }}
    />
  );
}
