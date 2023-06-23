import React from "react";
import { useSelector } from "react-redux";
import TabDetailBaiHoc from "../TabDetailBaiHoc/TabDetailBaiHoc";

import { Layout } from "antd";
import Content_QuizzWrite from "../Content_QuizzWrite/Content_QuizzWrite";
const { Content } = Layout;

export default function ContentQuizzWrite_DetailKhoaHoc() {
  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
  return (
    <Content className="w-full h-max-content space-y-3 flex-shrink-0 relative overflow-hidden flex flex-col justify-start">
      <div className="w-full flex-grow  rounded-none border-none">
        <div className="w-full h-full card_theme border-none">
          <Content_QuizzWrite currentLesson={currentLesson} />
        </div>
      </div>
    </Content>
  );
}
