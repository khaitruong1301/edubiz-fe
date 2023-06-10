import React, { useRef, memo, useMemo, useState } from "react";
import LayOutInBangDiem from "../TableBanDiemPrint/TableBanDiemPrint";
import ChungNhanItem from "../ChungNhanItem/ChungNhanItem";
import { useReactToPrint } from "react-to-print";
import { Progress, Tooltip, message } from "antd";
import { useSelector } from "react-redux";
import ChungNhanPDF from "../ChungNhanPDF/ChungNhanPDF";
import ReportPDF from "../ReportPDF/ReportPDF";
import CertificatePDF from "./CertificatePDF";

let HeaderPanel = ({ loTrinh }) => {
  const { userInfor } = useSelector((state) => state.authUser);
  const [visiblePDF, setVisiblePDF] = useState(false);

  // console.log({ loTrinh });
  let isDisable = false;
  loTrinh.danhSachKhoaHoc.map((khoaHoc) => {
    khoaHoc.danhSachBaiTap.map((item) => {
      if (!item.diem) {
        isDisable = true;
      }
    });
  });

  let diemTrungBinh = useMemo(() => {
    let tongDiem = 0;
    let slBaiTap = 0;
    loTrinh?.danhSachKhoaHoc.map((khoaHoc) => {
      let demBaiHoc = khoaHoc.danhSachBaiTap.length;

      slBaiTap += demBaiHoc;
      khoaHoc.danhSachBaiTap.map((baitap) => {
        let diem = baitap.diem ? baitap.diem * 1 : 0;
        tongDiem += diem;
      });
    });
    return (tongDiem / 10 / slBaiTap).toFixed(1);
  }, []);

  const componentRef = useRef();
  const componentRefBangDiem = useRef();

  const handlePrintBangDiem = useReactToPrint({
    content: () => componentRefBangDiem.current,
  });

  let percent = Math.floor(
    (loTrinh.soLuongHoanThanh / loTrinh.soLuongBaiTap) * 100
  ); 

  const handleDownloadChungNhan = (e) => {
    e.stopPropagation();
    if (!loTrinh.daHoanThanh)
      return message.warning('Bạn chưa được cấp chứng nhận do chưa hoàn thành tất cả khóa học!');

    if (diemTrungBinh < 7)
      return message.warning('Bạn chưa được cấp chứng nhận do điểm trung bình chưa đạt 7.0 !');

    setVisiblePDF(true)
  }

  return (
    <>
      <div className="lg:ml-5 w-full h-24  flex items-center justify-between bg-transparent space-x-1">
        <div className="hidden">
          <div className="" ref={componentRef}>
            <ChungNhanItem chungNhan={loTrinh} userInfor={userInfor} />
          </div>
          <div className="" ref={componentRefBangDiem}>
            <LayOutInBangDiem loTrinh={loTrinh} nguoiDung={userInfor} />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Progress
            format={(percent) => (
              <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
            )}
            strokeColor={"rgb( 117, 95, 211)"}
            trailColor={"rgba( 117, 95, 211,0.3)"}
            type="circle"
            className="w-20 lg:w-24 "
            strokeWidth={10}
            percent={percent}
          />
          <p className="text-color-title text-base lg:text-lg">
            {loTrinh.tenLoTrinh}
          </p>
        </div>
        <div className="flex flex-col justify-center items-center space-y-2 lg:space-y-3">
          <p className="text-color-content text-left text-sm lg:text-base">
            Bạn đã hoàn thành{" "}
            <span className="font-medium text-color-blue-white">
              {loTrinh.soLuongHoanThanh}/{loTrinh.soLuongBaiTap}{" "}
            </span>
            bài tập
          </p>

          <div className=" lg:space-x-3 w-max flex justify-between">
            <button
              className="text-white btn-theme transform hover:-translate-y-1 rounded-lg p-1 text-sm px-2 shadow-lg hover:shadow-xl transition duration-300"
              onClick={(e) => handleDownloadChungNhan(e)}
            >
              Xem chứng nhận
            </button>

            {isDisable ? (
              <Tooltip
                mouseEnterDelay={0}
                mouseLeaveDelay={0.1}
                trigger={["click"]}
                placement="top"
                animation="zoom"
                color="white"
                overlay={
                  <span className="text-blue-theme ">
                    Bạn chưa đạt điều kiện để xem bảng điểm
                  </span>
                }
              >
                <button
                  className="text-color-title card_theme btn_xemLoTrinh_designCode shadow-design_code  rounded-lg p-1 text-sm px-2  hover:shadow-xl transition duration-300"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  Xem bảng điểm
                </button>
              </Tooltip>
            ) : (
              <button
                className="text-color-title card_theme btn_xemLoTrinh_designCode shadow-design_code  rounded-lg p-1 text-sm px-2  hover:shadow-xl transition duration-300"
                onClick={(event) => {
                  event.stopPropagation();
                  handlePrintBangDiem();
                }}
              >
                Xem bảng điểm
              </button>
            )}
            {/* button report */}

            {/* {isDisable ? (
              <Tooltip
                mouseEnterDelay={0}
                mouseLeaveDelay={0.1}
                trigger={["click"]}
                placement="top"
                animation="zoom"
                color="white"
                overlay={
                  <span className="text-blue-theme ">
                    Bạn chưa đạt điều kiện để xem report
                  </span>
                }
              >
                <button
                  className="text-white btn-theme transform hover:-translate-y-1 rounded-lg p-1 text-sm px-2 shadow-lg hover:shadow-xl transition duration-300"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  Xem report
                </button>
              </Tooltip>
            ) : (
              <button
                className="text-white btn-theme transform hover:-translate-y-1 rounded-lg p-1 text-sm px-2 shadow-lg hover:shadow-xl transition duration-300"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <ReportPDF loTrinhId={loTrinh.loTrinhId} />
              </button>
            )} */}
          </div>
        </div>
      </div>

      {
        visiblePDF ?
          <CertificatePDF
            chungNhan={loTrinh.chungNhan}
            handleClose={setVisiblePDF}
            loTrinh={loTrinh}
            userInfo={userInfor}
          />
          : null
      }
    </>
  );
};

export default HeaderPanel = memo(HeaderPanel);
