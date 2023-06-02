import { List } from "antd";
import React from "react";
import ItemThongBaoPage from "../ItemThongBao/ItemThongBaoPage";
import "./listSuKien.css";

export default function ListSuKien({ listData, typeThongBao = true }) {
  return (
    <List
      itemLayout="vertical"
      size="large"
      className="p-0"
      pagination={{

        pageSize: 7,
        showSizeChanger: false,
      }}
      dataSource={listData}
      renderItem={(item) => (

        <ItemThongBaoPage typeThongBao={typeThongBao} data={item} />
      )}
    />
  );
}
