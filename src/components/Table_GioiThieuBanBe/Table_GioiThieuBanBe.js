import React from "react";
import { Table, Tag, Space } from "antd";
import { iconCoin } from "../../assets/icons";
export default function Table_GioiThieuBanBe() {
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Lộ trình đã đăng kí",
      dataIndex: "loTrinh",
      key: "loTrinh",
    },
    {
      title: "Ngày đăng kí thành công",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Số coin nhận được",
      dataIndex: "coin",
      key: "coin",
    },
  ];

  const data = [
    {
      key: "1",
      name: "Đình Sang",
      loTrinh: "Bootcamp FrontEnd",
      date: "22-08-2021",
      coin: (
        <div className="flex items-center">
          <span>30</span>
          {iconCoin}
        </div>
      ),
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      className="w-full h-max-content "
    />
  );
}
