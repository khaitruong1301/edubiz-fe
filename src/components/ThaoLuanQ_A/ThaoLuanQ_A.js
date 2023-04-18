import React from "react";
import { Collapse } from "antd";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { GetTagQA } from "../../utils/GetTagQ&A";
const { Panel } = Collapse;

// const callback = (key) => {
//   console.log(key);
// };
export default function ThaoLuanQ_A({ data }) {
  // console.log("data", data);
  return (
    <div className=" card_theme_item text-color-title  border-none rounded-xl  mb-3">
      <Collapse
        // onChange={callback}
        bordered={false}
        // expandIcon={({ isActive }) => (
        //   <CaretRightOutlined rotate={isActive ? 90 : 0} />
        // )}
        ghost
        className=""
      >
        <Panel
          // header={ <span>Câu hỏi: </span> {data.tieuDe}}
          key="1"
          className="rounded-xl overflow-hidden"
          header={
            <div className="space-y-5 text-color-title ">
              <p>Câu hỏi: {data.tieuDe}</p>
              <div>{GetTagQA(JSON.parse(data.tags))}</div>
            </div>
          }
        >
          <div className="space-y-2">
            <p className="font-light text-sm noiDung_QA text-color-title ">
              {ReactHtmlParser(data.noiDung)}
            </p>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}
