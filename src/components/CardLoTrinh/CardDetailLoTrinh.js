import { Progress } from "antd";
import moment from "moment";
import React from "react";
// import Registed_Users_Bar from "../Registed_Users_Bar/Registed_Users_Bar";
import StartEndDay from "./StartEndDay";
var dayjs = require("dayjs");

function CardDetailLoTrinh({ loTrinhDetail }) {
  const percentPhut = Math.floor(
    (loTrinhDetail.soPhutHoanThanh / loTrinhDetail.tongPhut) * 100
  );
  const percentBaiTapNop = Math.floor(
    (loTrinhDetail.baiTapNopHoanThanh / loTrinhDetail.tongBaiTapNop) * 100
  );
  const percentTracNghiem = Math.floor(
    (loTrinhDetail.tracNghiemHoanThanh / loTrinhDetail.tongTracNghiem) * 100
  );
  var start = moment(moment(loTrinhDetail.ngayBatDau).format("YYYY-MM-DD"));
  var end = moment(moment(loTrinhDetail.ngayKetThuc).format("YYYY-MM-DD"));
  var now = moment(moment().format("YYYY-MM-DD"));

  const totalDays = moment.duration(end.diff(start)).asDays();
  const remainDay = moment.duration(end.diff(now)).asDays() + 1;

  const dayDaHoc = totalDays - remainDay;
  const percentDay = Math.floor((dayDaHoc / totalDays) * 100);
  return (
    <div className="w-full h-full card_theme  flex md:p-2 lg:p-5 flex-col">
      <div className="flex-shrink-0 flex-grow flex justify-between items-center ">
        <div className="flex w-full flex-shrink-0 h-full  justify-between items-center ">
          <div className="flex flex-col items-center  h-full justify-center space-y-3  w-1/4 lg:w-1/5">
            <Progress
              format={(percent) => (
                <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
              )}
              strokeColor={"rgb( 117, 95, 211)"}
              trailColor={"rgba( 117, 95, 211,0.3)"}
              type="circle"
              className="md:w-24  lg:w-28 xl:w-32"
              strokeWidth={10}
              percent={percentPhut}
            />
            <div className="text-base flex flex-col items-center">
              <span className="font-medium">
                {loTrinhDetail.soPhutHoanThanh}/{loTrinhDetail.tongPhut}
              </span>
              <span className="text-sm">Phút video </span>
            </div>
          </div>
          <div className="flex flex-col items-center  h-full justify-center space-y-3 w-1/4 lg:w-1/5 ">
            <Progress
              format={(percent) => (
                <span style={{ color: "rgb( 70, 220, 216)" }}>{percent}% </span>
              )}
              strokeColor={"rgb( 70, 220, 216)"}
              trailColor={"rgba( 70, 220, 216,0.3)"}
              type="circle"
              className="md:w-24  lg:w-28 xl:w-32"
              strokeWidth={10}
              percent={percentTracNghiem}
            />
            <div className="text-base flex flex-col items-center">
              <span className="font-medium">
                {loTrinhDetail.tracNghiemHoanThanh}/
                {loTrinhDetail.tongTracNghiem}{" "}
              </span>
              <span className="text-sm">Trắc nghiệm </span>
            </div>
          </div>
          <div className="flex flex-col items-center  h-full justify-center space-y-3 w-1/4 lg:w-1/5">
            <Progress
              format={(percent) => (
                <span style={{ color: "rgb(234, 83, 172)" }}>{percent}% </span>
              )}
              strokeColor={"rgb(234, 83, 172)"}
              trailColor={"rgba(234, 83, 172,0.3)"}
              type="circle"
              className="md:w-24  lg:w-28 xl:w-32"
              strokeWidth={10}
              percent={percentBaiTapNop}
            />

            <div className="text-base flex flex-col items-center">
              <span className="font-medium">
                {loTrinhDetail.baiTapNopHoanThanh}/{loTrinhDetail.tongBaiTapNop}{" "}
              </span>
              <span className="text-sm"> Bài tập nộp</span>
            </div>
          </div>
          <div className="flex flex-col items-center  h-full justify-center space-y-3 w-1/4 lg:w-1/5 md:hidden lg:flex ">
            <Progress
              format={(percent) => (
                <span className="" style={{ color: "rgba(253, 206, 0, 1)" }}>
                  {percent}%{" "}
                </span>
              )}
              strokeColor={"rgb(253, 206, 0)"}
              trailColor={"rgba(253, 206, 0, 0.3)"}
              type="circle"
              className="md:w-24  lg:w-28 xl:w-32"
              strokeWidth={10}
              percent={percentDay}
              format={() => (
                <span
                  style={{ color: "rgb(253, 206, 0)" }}
                  className="text-sm font-medium"
                >
                  {" "}
                  <span className="text-base">
                    {remainDay < 0 ? "Hết hạn" : remainDay}
                  </span>{" "}
                  ngày
                </span>
              )}
            />
            <StartEndDay loTrinh={loTrinhDetail} />
          </div>
        </div>
      </div>

      {/* <div className="flex space-x-5 items-center  mb-8">
        <p className="text-base font-normal text-color-title w-max flex-shrink-0">
          Học viên đã đăng kí
        </p>{" "}
        <Registed_Users_Bar
          dsAvatar={loTrinhDetail.dsAvatar}
          totalUser={loTrinhDetail.tongHocVien}
        />
      </div> */}
    </div>
  );
}

export default CardDetailLoTrinh = React.memo(CardDetailLoTrinh);
