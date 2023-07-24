import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tabs } from "antd";
import List_Top_UserTicCuc from "../List_Top_User/List_Top_User";
import List_Top_User_Learned_Time from "../List_Top_User_Learned_Time/Use_Top_Learned_Time";
import httpServ from "../../services/http.service";
import { setTopUpser } from "../../redux/reducer/dashboardReducer";
import { disableSetLoading } from "../../constants/httpServContant";
const { TabPane } = Tabs;
export default function Tab_Top_Users() {
  const dispatch = useDispatch();

  const dashboard = useSelector((state) => state.dashboard);
  const topUsers = { ...dashboard.topUsers };
  const handleChangeTopUsers = (idFilter) => {
    httpServ
      .getStatisTopUser(idFilter, disableSetLoading)
      .then((res) => {
        if (idFilter == 0) {
          topUsers.tichCuc = res.data.content;
        }
        if (idFilter == 1) {
          topUsers.hocGioi = res.data.content;
        }
        if (idFilter == 2) {
          topUsers.capDo = res.data.content;
        }
        dispatch(setTopUpser(topUsers));
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  useEffect(() => {
    handleChangeTopUsers(0);
  }, []);
  return (
    <div
      className="card_theme w-full lg:h-full    xl:h-max-content "
    // data-tour="db-step-6"
    >
      <div className=" w-full relative h-full  ">
        <div className="wfull flex items-center justify-between p-3 pb-0">
          <p className="text-color-title text-lg  ">Top Users</p>
        </div>
        <div
          style={{ height: "470px" }}
          className="relative z-10 list_khoaHoc  "
        >
          <Tabs
            className=" w-full p-3"
            // centered
            defaultActiveKey="1"
            onChange={() => { }}
          >
            <TabPane
              tab={
                <p
                  className="font-medium px-3 "
                  onClick={() => {
                    handleChangeTopUsers(0);
                  }}
                >
                  Tích cực
                </p>
              }
              key="1"
            >
              <List_Top_UserTicCuc tab={0} listUser={topUsers.tichCuc} />
            </TabPane>

            <TabPane
              tab={
                <p
                  className="font-medium px-3"
                  onClick={() => {
                    handleChangeTopUsers(1);
                  }}
                >
                  Tổng điểm
                </p>
              }
              key="3"
            >
              <List_Top_User_Learned_Time tab={1} listUser={topUsers.hocGioi} />
            </TabPane>
            <TabPane
              tab={
                <p
                  className="font-medium px-3"
                  onClick={() => {
                    handleChangeTopUsers(2);
                  }}
                >
                  Cấp độ
                </p>
              }
              key="2"
            >
              <List_Top_UserTicCuc tab={2} listUser={topUsers.capDo} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
