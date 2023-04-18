import React, { useEffect, useState } from "react";
import Task_Card from "../components/Task_card/Task_Card";
import { Tabs } from "antd";
import Task_Submitted_Card from "../components/Task_Submitted_card/Task_Submited_card";
import httpServ from "../services/http.service";
import { useDispatch, useSelector } from "react-redux";

import ListSuKien from "../components/ListSuKien/ListSuKien";
import { setDanhSachDeadline } from "../redux/reducer/dashboardReducer";

const { TabPane } = Tabs;

const colors = [
  {
    bg: "#FEF2EA",
    line: "#E87E53",
  },
  {
    bg: "#FDF3CD",
    line: "#DBB536",
  }
];

export default function ThongBao_TaskPage() {
  const { userInfor } = useSelector((state) => state.authUser);
  const { danhSachDeadline } = useSelector((state) => state.dashboard);

  const [allBaiTapDaLam, setAllBaiTapDaLam] = useState([]);
  const [lichSuHoatDong, setLichSuHoatDong] = useState([]);
  const [allThongBao, setAllThongBao] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    httpServ
      .getAllThongBao(userInfor.id)
      .then((res) => {
        setAllThongBao(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
    httpServ
      .getLichSuHoatDong(userInfor.id)
      .then((res) => {
        setLichSuHoatDong(res.data.content)
      })
      .catch((err) => {
        console.log(err);
      });
    httpServ
      .getTatCaBaiTapDaLam(userInfor.id)
      .then((res) => {
        setAllBaiTapDaLam(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
    httpServ
      .getDanhSachDeadline(userInfor?.id)
      .then((res) => {
        dispatch(setDanhSachDeadline(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const listSapToiHan = danhSachDeadline.filter((item) => {
    return !item.hetHan;
  });
  const listHetHan = danhSachDeadline.filter((item) => {
    return item.hetHan;
  });

  return (
    <div className="w-full h-full flex-grow   p-3 space-x-3 flex">
      <div className="w-1/2 flex-grow card_theme p-5 space-y-5 flex flex-col">
        <p
          className="text-lg text-color-title  font-medium  flex-shrink-0 
        "
        >
          Thông báo & Lịch sử
        </p>
        <div className="flex-grow space-y-3 card_theme p-3 border-none">

          <Tabs
            defaultActiveKey="1"
            className="lg:p-3"
            className="w-full felx flex-col flex-grow "
          >
            <TabPane
              tab={<p className="font-medium px-1 lg:px-3">Thông báo</p>}
              key="1"
              className="w-full h-full "
            >

              <ListSuKien listData={allThongBao} />

            </TabPane>

            <TabPane
              tab={<p className="font-medium px-1 lg:px-3">Lịch sử</p>}
              key="2"
              className="h-full "
            >
              <div className="space-y-2 h-full w-full  ">
                <ListSuKien listData={lichSuHoatDong} typeThongBao={false} />

              </div>
            </TabPane>

          </Tabs>
        </div>
      </div>
      <div className="w-1/2 flex-grow  card_theme p-5 space-y-5 flex flex-col">
        <p className="text-lg text-color-title  font-medium ">Sự kiện</p>
        <div className="w-full flex-grow  overflow-y-auto list_khoaHoc ">
          <Tabs
            defaultActiveKey="1"
            className="lg:p-3"
            className="w-full flex-grow "
          >
            <TabPane
              tab={<p className="font-medium px-1 lg:px-3">Sắp tới hạn</p>}
              key="1"
              className="w-full h-full"
            >
              <div className="space-y-2 h-full w-full overflow-y-auto">
                {listSapToiHan.length === 0 ? (
                  <p className="text-color-content text-center mt-10">
                    Không có bài tập đến hạn
                  </p>
                ) : (
                  ""
                )}
                {listSapToiHan.map((item, index) => {
                  let colorIndex = index % 2

                  return <Task_Card data={item} color={colors[colorIndex]} />;
                })}
              </div>
            </TabPane>

            <TabPane
              tab={<p className="font-medium px-1 lg:px-3">Đã hoàn thành</p>}
              key="2"
              className="h-full "
            >
              <div className="space-y-2 h-full w-full  ">
                {allBaiTapDaLam.length === 0 ? (
                  <p className="text-color-content text-center mt-10">
                    Không có bài tập đã làm
                  </p>
                ) : (
                  ""
                )}

                {allBaiTapDaLam.map((item, index) => {
                  let colorIndex = index % 2

                  return (
                    <Task_Submitted_Card data={item} color={colors[colorIndex]} />
                  );
                })}
              </div>
            </TabPane>
            <TabPane
              tab={<p className="font-medium px-1 lg:px-3">Hết hạn</p>}
              key="4"
              className=""
            >
              <div className="space-y-2 max-h-screen w-full  overflow-y-auto">
                {listHetHan.length === 0 ? (
                  <p className="text-color-content text-center mt-10">
                    Không có bài tập hết hạn
                  </p>
                ) : (
                  ""
                )}
                {listHetHan.map((item, index) => {
                  let colorIndex = index % 2
                  return (
                    <Task_Submitted_Card data={item} color={colors[colorIndex]} />
                  );
                })}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
