import React, { useMemo, useState } from "react";
import AnimateHeight from "react-animate-height";
import BtnTitleBaiHoc from "../BtnTitleBaiHoc/BtnTitleBaiHoc";
import { checkDemoUser } from "../../utils/HocDemoUtils";

const SubMenu_Sider_DetailKhoaHoc = ({ course, onToggle }) => {
  const [collapsed, setCollapsed] = useState(false);
  let isDemoUser = useMemo(() => checkDemoUser(), [])
  return (
    course ? <div>

      <div
        className="chapter-menu-item cursor-pointer px-3  pr-7 card_theme border-t-0 border-r-0 border-l-0 rounded-none border-b-1 border-gray-400  text-color-title-theme w-full py-3   whitespace-normal text-lg   h-max-content  hover:text-blue-theme duration-300 min-h-16 flex  justify-between items-start space-x-1 pl-3"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        <p className="text-color-title">
          {course.tenChuongHoc}

        </p>

        <i
          style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
          className=" fa fa-angle-down text-color-title  transition  duration-100 text-base flex-shrink-0"
        ></i>
      </div>

      <AnimateHeight
        id="example-panel"
        duration={500}
        height={collapsed ? 0 : "auto"} // see props documentation below
      >
        { course.danhSachBaiHoc?.map((lesson, index) => {
          return <BtnTitleBaiHoc onToggle={onToggle} key={index} lesson={lesson} isDemoUser={isDemoUser} />;
        })}
      </AnimateHeight>
    </div> : null

  );
};

export default SubMenu_Sider_DetailKhoaHoc;
