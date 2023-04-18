import React from "react";
import { Collapse } from "antd";
import { arrBg_LinearGgradient } from "../../assets/bg-linear-gradient";

import Item_List_DiemKhoaHoc from "../Item_List_DiemKhoaHoc/  Item_List_DiemKhoaHoc";
import { CaretRightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import HeaderPanel from "./HeaderPanel";
import ChungNhanPDF from "../ChungNhanPDF/ChungNhanPDF";
const { Panel } = Collapse;
export default function Item_ListDiem_LoTrinh({ loTrinh, tienTinh }) {
  const { userInfor } = useSelector((state) => state.authUser);

  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel
        header={<HeaderPanel loTrinh={loTrinh} />}
        key="1"
        className="bg-transparent"
      >
        <div className=" flex flex-col  space-y-7 w-full">
          {loTrinh.danhSachKhoaHoc.map((khoaHoc, index) => {
            return (
              <Item_List_DiemKhoaHoc
                bg_color={arrBg_LinearGgradient[index]}
                khoaHoc={khoaHoc}
                key={index}
              ></Item_List_DiemKhoaHoc>
            );
          })}
        </div>
      </Panel>
    </Collapse>
  );
}
