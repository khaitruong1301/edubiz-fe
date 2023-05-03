import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Task_Card from "../../../components/Task_card/Task_Card";
import Task_Submitted_Card from "../../../components/Task_Submitted_card/Task_Submited_card";
import httpServ from "../../../services/http.service";
import { useDispatch, useSelector } from "react-redux";
import { setDanhSachDeadline } from "../../../redux/reducer/dashboardReducer";
import './EventContent.css'

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

function EventContent({ userId }) {
    const dispatch = useDispatch();
    const { danhSachDeadline } = useSelector((state) => state.dashboard);
    const [allBaiTapDaLam, setAllBaiTapDaLam] = useState([]);

    useEffect(() => {
        httpServ
            .getTatCaBaiTapDaLam(userId)
            .then((res) => {
                setAllBaiTapDaLam(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
        httpServ
            .getDanhSachDeadline(userId)
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
        <div className='event-content'>
            <Tabs
                defaultActiveKey="1"
                className="w-full flex-grow lg:p-3"
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

                            return <Task_Card key={index} data={item} color={colors[colorIndex]} />;
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
                                <Task_Submitted_Card key={index} data={item} color={colors[colorIndex]} />
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
                                <Task_Submitted_Card key={index} data={item} color={colors[colorIndex]} />
                            );
                        })}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default EventContent;