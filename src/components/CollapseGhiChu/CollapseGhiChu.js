import React from "react";
import { Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import HtmlParser from "react-html-parser";
const { Panel } = Collapse;

function CollapseGhiChu({ data }) {
  return (
    <Collapse
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      className="bg-transparent shadow-none "
    >
      <Panel
        header={
          <button className="p-1 font-medium  rounded-md text-color-blue-white ">
            Xem ghi chú
          </button>
        }
        key="1"
        className="bg-transparent"
      >
        <div className=" flex flex-col space-y-7 w-full">
          <p className="text-color-blue-white">{HtmlParser(data)}</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            odio. Pariatur commodi corrupti ratione rerum obcaecati tempora quod
            dolores quibusdam possimus distinctio. Illo necessitatibus quo natus
            excepturi obcaecati, blanditiis impedit?
          </p>
        </div>
      </Panel>
    </Collapse>
  );
}
export default CollapseGhiChu = React.memo(CollapseGhiChu);
