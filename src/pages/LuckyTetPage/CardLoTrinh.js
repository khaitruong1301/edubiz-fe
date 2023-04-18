import React, { useMemo, useState } from "react";

import { Tabs } from "antd";

import IntroLoTrinh from "../../components/CardLoTrinh/IntroLoTrinh";
import CardKhoaHoc_DesignCode from "../../components/CardKhoaHoc/CardKhoaHoc_DesignCode";

import { arrBg_LinearGgradient } from "../../assets/bg-linear-gradient";
import Static_Public from "../../components/CardLoTrinh/Static_Public";
import CardDetailLoTrinh from "../../components/CardLoTrinh/CardDetailLoTrinh";
import Curved_Button from "../../components/Buttons/Curved_Button";


import HtmlParser from "react-html-parser";
import { checkDemoUser } from "../../utils/HocDemoUtils";

const { TabPane } = Tabs;
export default function CardLoTrinh({ btn_tuVan, loTrinh, isBlackFridayDay }) {
  const [collapsed, setCollapsed] = useState(true);
  let isDemoUser = useMemo(() => checkDemoUser(), [])
  return (
    <div
      className="w-full  mb-16  animation_loTrinh "
      // ref={ref_Props}
      id={loTrinh.id}
    >
      <div
        className="  "
        data-tour="loTrinhCuaBan-step1"
      >
        <div
          className=" flex w-full h-72 lg:h-84  "
          data-tour="loTrinh-step2"
        // data-tour="loTrinhCuaBan-step1"
        >
          <div
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="flex-shrink-0 h-full  relative mr-5"
          >
            <IntroLoTrinh
              isShowDate={false}
              loTrinh={loTrinh}
              isHoverActive={!collapsed}
              btn_tuVan={true}
              isBlackFridayDay={true}
            />
          </div>
          <div
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="w-full h-full flex  justify-between  relative     cursor-pointer"
          >
            <Static_Public isBlackFridayDay={isBlackFridayDay} loTrinhPublic={loTrinh}></Static_Public>
            <div className="   z-40 absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 ">
              <Curved_Button collapsed={collapsed} />
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          height: collapsed ? 0 : "max-content",
          marginTop: collapsed ? "0" : "40px",
          opacity: collapsed ? "0" : "1",
        }}
        className={
          collapsed
            ? "w-full   duration-150  overflow-hidden"
            : "w-full   duration-200 border-fade card_theme"
        }
        data-tour="loTrinh-step3"
      >
        <div data-tour="loTrinhCuaBan-step2">
          <Tabs defaultActiveKey="1" className="p-3">
            <TabPane tab="Khoá học trong lộ trình" key="1">
              <div className="grid  md:grid-cols-2 xl:grid-cols-3 gap-10 place-content-center w-full  place-items-center py-10">
                {loTrinh.danhSachKhoaHoc.map((item, index) => {
                  return (
                    <CardKhoaHoc_DesignCode
                      bg_color={arrBg_LinearGgradient[index]}
                      khoaHoc={item}
                      id_tool_tip={index}
                      key={index}
                      loTrinh={loTrinh}
                      isDemoUser={isDemoUser}
                    ></CardKhoaHoc_DesignCode>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab="Giới thiệu lộ trình" key="5">
              <div className=" p-3 lg:p-5  card_theme_item text-color-title">{loTrinh.moTa ? HtmlParser(loTrinh.moTa) : ""}</div>
            </TabPane>

          </Tabs>
        </div>
      </div>
    </div>
  );
}
