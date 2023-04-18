import React, { useMemo, useState } from "react";

import { Tabs } from "antd";

import IntroLoTrinh from "./IntroLoTrinh";
import CardKhoaHoc_DesignCode from "../CardKhoaHoc/CardKhoaHoc_DesignCode";
import { arrBg_LinearGgradient } from "../../assets/bg-linear-gradient";
import Static_Public from "./Static_Public";
import CardDetailLoTrinh from "./CardDetailLoTrinh";
import Curved_Button from "../Buttons/Curved_Button";
import StaticBaiTapKhoaHoc from "../BaiTap/StaticBaiTapKhoaHoc";
import CardThaoLuanQ_A from "../CardThaoLuanQ_A/CardThaoLuanQ_A";
import HtmlParser from "react-html-parser";
import { checkDemoUser } from "../../utils/HocDemoUtils";

const { TabPane } = Tabs;
export default function CardLoTrinh({ btn_tuVan, loTrinh, isBlackFridayDay = false }) {
  const [collapsed, setCollapsed] = useState(true);
  let isDemoUser = useMemo(() => checkDemoUser() || isBlackFridayDay, [])


  return (
    <div
      className="w-full  mb-16  animation_loTrinh "
      // ref={ref_Props}
      id={loTrinh.id}
    >
      <div
        className="  "
        // data-tour="loTrinh-step2"
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
              isBlackFridayDay={isBlackFridayDay}
              isShowDate={false}
              loTrinh={loTrinh}
              isHoverActive={!collapsed}
              btn_tuVan={btn_tuVan}
            />
          </div>
          <div
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className="w-full h-full flex  justify-between  relative     cursor-pointer"
          >
            {btn_tuVan ? (
              <Static_Public isBlackFridayDay={isBlackFridayDay} loTrinhPublic={loTrinh}></Static_Public>
            ) : (
              <CardDetailLoTrinh
                loTrinhDetail={loTrinh}
                collapsed={collapsed}
              />
            )}
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
                    // <div className="md:w-40 ">
                    <CardKhoaHoc_DesignCode
                      bg_color={arrBg_LinearGgradient[index]}
                      khoaHoc={item}
                      id_tool_tip={index}
                      key={index}
                      loTrinh={loTrinh}
                      isDemoUser={isDemoUser}
                      isBlackFridayDay={isBlackFridayDay}
                    ></CardKhoaHoc_DesignCode>
                    // </div>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab="Giới thiệu lộ trình" key="5">
              <div className=" p-3 lg:p-5  card_theme_item text-color-gioi-thieu text-color-title">{loTrinh.moTa ? HtmlParser(loTrinh.moTa) : ""}</div>
            </TabPane>
            <TabPane tab="Q&A" key="3" className="">
              <CardThaoLuanQ_A idLoTrinh={loTrinh.id} />
            </TabPane>

            {loTrinh.daDangKy && !isDemoUser ? (
              <TabPane tab="Bài tập và điểm" key="4" className="">
                <StaticBaiTapKhoaHoc loTrinh={loTrinh} />
              </TabPane>
            ) : (
              ""
            )}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
