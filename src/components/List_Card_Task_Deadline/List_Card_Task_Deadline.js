import React, { useEffect } from "react";
import httpServ from "../../services/http.service";
import Card_Task_Deadline from "../Card_Task_Deadline/Card_Task_Deadline";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, ConfigProvider } from "antd";
import localeVn from "antd/es/locale/vi_VN";
import "moment/locale/vi";
import moment from "moment";
import { setDanhSachDeadline } from "../../redux/reducer/dashboardReducer";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { Tooltip } from "antd";
const colors = [
  {
    bg: "#FEF2EA",
    line: "#E87E53",
  },
  {
    bg: "#E6F7FE",
    line: "#3AABD2",
  },
];

export default function List_Card_Task_Deadline() {
  let userInfor = useSelector((state) => state.authUser.userInfor);

  const dispatch = useDispatch();
  const deadlines = useSelector((state) => state.dashboard.danhSachDeadline);

  useEffect(() => {
    !checkDemoUser() &&
      httpServ
        .getDanhSachDeadline(userInfor?.id)
        .then((res) => {
          dispatch(setDanhSachDeadline(res.data.content));
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  return (
    <div
      className="DeadlineMobile .card_theme_mobile h-max-content  lg:h-full  xl:h-max-content w-80 lg:w-96 xl:w-84 flex-shrink-0  card_theme p-3 flex flex-col justify-start space-y-3 relative"
    // data-tour="db-step-3"
    >
      <div className="flex justify-between items-center">
        <p className="text-lg text-color-title flex-shrink-0 mb-1  ">
          Task và Deadline
        </p>
        {/* <button className="text-white btn-theme px-2 py-0.5 text-sm font-medium rounded-xl">
          Xem tất cả
        </button> */}
      </div>
      <ConfigProvider locale={localeVn}>
        <Calendar
          fullscreen={false}
          className="w-full "
          // dateFullCellRender={(data) => ""}
          dateFullCellRender={(date) => {
            let taskIndex = deadlines?.findIndex((task) => {
              let deadline = moment(task.ngayHetHan);
              return (
                deadline.get("year") === date.get("year") &&
                deadline.get("month") === date.get("month") &&
                deadline.get("date") === date.get("date")
              );
            });
            if (taskIndex !== -1) {
              let colorIndex = taskIndex % 2
              return (
                <Tooltip
                  placement="topLeft"
                  color="transparent"
                  overlayStyle={{ padding: 0 }}
                  overlayClassName="bg-transparent p-0"
                  title={
                    <Card_Task_Deadline
                      deadline={deadlines[taskIndex]}
                      color={colors[1]}
                    />
                  }
                  getPopupContainer={(trigger) => trigger.parentElement}
                >
                  <span
                    style={{
                      color: colors[colorIndex]?.line,
                      backgroundColor: colors[colorIndex]?.bg,
                    }}
                    className="inline-block font-medium rounded-full h-6 w-6 leading-6 text-center"
                  >
                    {moment(deadlines[taskIndex].ngayHetHan).date()}
                  </span>
                </Tooltip>
              );
            }
            return <span>{date.date()}</span>;
          }}
          locale={localeVn}
          headerRender={() => {
            return "  ";
          }}
        />
      </ConfigProvider>

      <div className="space-y-2 h-max-content max-h-40 overflow-y-auto list_khoaHoc">
        {" "}
        {deadlines?.map((item, index) => {

          let colorIndex = index % 2

          return <Card_Task_Deadline deadline={item} color={colors[colorIndex]} />;
        })}
      </div>
    </div>
  );
}
