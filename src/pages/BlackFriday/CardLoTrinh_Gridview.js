import React, { useEffect, useState } from "react";

import { Tabs } from "antd";

import IntroLoTrinh from "../../components/CardLoTrinh/IntroLoTrinh";
import CardKhoaHoc_DesignCode from "../../components/CardKhoaHoc/CardKhoaHoc_DesignCode";
import { arrBg_LinearGgradient } from "../../assets/bg-linear-gradient";
import Static_Public from "../../components/CardLoTrinh/Static_Public";
import CardDetailLoTrinh from "../../components/CardLoTrinh/CardDetailLoTrinh";

import httpServ from "../../services/http.service";
import Curved_Button from "../../components/Buttons/Curved_Button";
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
            btn_tuVan={true}
            isBlackFridayDay={true}
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
          <Static_Public loTrinhPublic={loTrinh}></Static_Public>

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

        </Tabs>
      </div>
    </div>
  );
}
