import React, { useEffect, useState } from "react";

import { Tabs } from "antd";

import ThaoLuan from "../Chat/ThaoLuan";
import IntroLoTrinh from "./IntroLoTrinh";
import CardKhoaHoc_DesignCode from "../CardKhoaHoc/CardKhoaHoc_DesignCode";
import { arrBg_LinearGgradient } from "../../assets/bg-linear-gradient";
import Static_Public from "./Static_Public";
import CardDetailLoTrinh from "./CardDetailLoTrinh";
import ThaoLuanQ_A from "../ThaoLuanQ_A/ThaoLuanQ_A";
import StaticBaiTapKhoaHoc from "../BaiTap/StaticBaiTapKhoaHoc";
import httpServ from "../../services/http.service";
import Curved_Button from "../Buttons/Curved_Button";
const { TabPane } = Tabs;
export default function CardLoTrinh_Gridview({
  btn_tuVan,
  ref_Props,
  loTrinh,
}) {
  const [collapsed, setCollapsed] = useState(true);
  const [QandA_data, setQandA_data] = useState([]);
  useEffect(() => {
    httpServ
      .getQandA_KhoacHoc(loTrinh.id)
      .then((res) => {
        const QandA = res.data.content;
        setQandA_data(QandA);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const widthCard = collapsed ? " 280px" : "100%";
  return (
    <div
      style={{ width: widthCard }}
      className={
        collapsed
          ? "mb-10  animation_loTrinh  "
          : "mb-10  animation_loTrinh order-first"
      }
      ref={ref_Props}
      onClick={() => {
        setCollapsed(!collapsed);
      }}
    >
      <div style={{ width: widthCard }} className="flex h-84">
        <div
          onClick={() => {
            setCollapsed(!collapsed);
          }}
          className="flex-shrink-0 mr-5 relative"
        >
          <IntroLoTrinh
            isShowDate={false}
            loTrinh={loTrinh}
            isHoverActive={!collapsed}
            btn_tuVan={btn_tuVan}
          />
        </div>
        <div
          style={{ display: collapsed ? "none" : "block" }}
          className={
            !collapsed
              ? "w-full h-full  flex justify-between space-x-5 relative   cursor-pointer"
              : "w-0 "
          }
        >
          {" "}
          {btn_tuVan ? (
            <Static_Public loTrinhPublic={loTrinh}></Static_Public>
          ) : (
            <div className="h-full w-full flex flex-col space-y-2 justify-between">
              <CardDetailLoTrinh
                loTrinhDetail={loTrinh}
                collapsed={collapsed}
              />
            </div>
          )}
          <div className="   z-40 absolute bottom-0 translate-y-1/2 left-1/2 transform -translate-x-1/2 ">
            <Curved_Button collapsed={collapsed} />
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
      >
        <Tabs defaultActiveKey="1" className="p-3">
          <TabPane tab="Khoá học trong lộ trình" key="1">
            <div className="grid grid-cols-3 gap-10 place-content-center w-full  place-items-center py-10">
              {loTrinh?.danhSachKhoaHoc.map((item, index) => {
                return (
                  <CardKhoaHoc_DesignCode
                    bg_color={arrBg_LinearGgradient[index]}
                    khoaHoc={item}
                    // title={item.title}
                    id_tool_tip={index}
                    key={index}
                    loTrinh={loTrinh}
                  ></CardKhoaHoc_DesignCode>
                );
              })}
            </div>
          </TabPane>
          <TabPane tab="Giới thiệu lộ trình" key="5"></TabPane>
          <TabPane tab="Q&A" key="3" className="">
            {QandA_data.map((item) => {
              return <ThaoLuanQ_A data={item}></ThaoLuanQ_A>;
            })}
          </TabPane>

          {loTrinh.daDangKy ? (
            <TabPane tab="Bài tập và điểm" key="4" className="">
              <StaticBaiTapKhoaHoc loTrinh={loTrinh} />
            </TabPane>
          ) : (
            ""
          )}
        </Tabs>
      </div>
    </div>
  );
}
