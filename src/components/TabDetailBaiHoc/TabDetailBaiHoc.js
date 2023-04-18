import React from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import StaticBaiTapKhoaHoc from "../BaiTap/StaticBaiTapKhoaHoc";
import CardThaoLuanQ_A from "../CardThaoLuanQ_A/CardThaoLuanQ_A";
const { TabPane } = Tabs;
function TabDetailBaiHoc() {
  const { khoaHocContent, allLessons } = useSelector((state) => state.khoaHoc);
  const khoaHoc = useSelector((state) => state.khoaHoc);
  const diemAndBaiTap = khoaHoc.diemAndBaiTap
  let totalBaiTap = 0;
  let totalPhut = 0;
  for (let index = 0; index < allLessons.length; index++) {
    const lesson = allLessons[index];
    if (lesson.maLoaiBaiHoc === "VIDEO_FPT") {
      totalPhut = totalPhut + lesson.thoiLuong;
    }
    if (
      lesson.maLoaiBaiHoc === "QUIZ" ||
      lesson.maLoaiBaiHoc === "QUIZ_WRITE"
    ) {
      totalBaiTap = totalBaiTap + lesson.thoiLuong;
    }
  }
  return (
    <div
      className=" bg-transparent w-full h-max-content  "
      data-tour="detail-step-5"
    >
      <div className="w-full h-full card_theme_item  ">
        <Tabs className="w-full bg-transparent h-max-content  px-10 py-3">
          <TabPane
            tab={<span className="text-lg">Mô tả khóa học</span>}
            key="1"
            className="bg-transparent"
          >
            <div className="col-md-12 text-lg space-y-4  text-color-title card_theme_item  rounded p-5">
              <div className="text-lg ">
                {khoaHocContent?.tenKhoaHoc}
                <hr />
              </div>
              <div className="col-4">Khoá học này bao gồm </div>
              <div className="space-y-2 text-base">
                <p>
                  {" "}
                  <i className="fa fa-clock" /> Thời lượng: {totalPhut} phút{" "}
                </p>
                <p>
                  {" "}
                  <i className="fa fa-book" /> Tổng bài học: {allLessons.length}{" "}
                </p>
                <p>
                  {" "}
                  <i className="fa fa-list-alt" /> Số bài tập: {totalBaiTap}{" "}
                </p>
                <p>
                  {" "}
                  <i className="fa fa-comments" /> Thảo luận cùng với giảng viên
                  và những người học cùng bạn.{" "}
                </p>
                {khoaHocContent.moTa ? (
                  <div>
                    Mô tả:{" "}
                    <p className="text-base">
                      {ReactHtmlParser(khoaHocContent.moTa)}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <hr />
            </div>
          </TabPane>
          <TabPane tab={<span className="text-lg">Điểm bài tập</span>} key="2">
            <StaticBaiTapKhoaHoc data={diemAndBaiTap}></StaticBaiTapKhoaHoc>
          </TabPane>
          <TabPane
            tab={<span className="text-lg">Q&A</span>}
            key="3"
            className="w-full"
          >
            <CardThaoLuanQ_A idLoTrinh={khoaHoc.khoaHocContent.maLoTrinh}></CardThaoLuanQ_A>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
export default TabDetailBaiHoc = React.memo(TabDetailBaiHoc);
