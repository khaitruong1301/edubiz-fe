import moment from "moment";
import React from "react";
import { convertMinsToHrsMins } from "./ReportUltil";

export default function KhoaHoc({ data = {} }) {
  let diemTb = 0;
  data.danhSachDiem?.forEach((item) => {
    diemTb += item.diem * 1;
  });
  if (data.danhSachDiem.length > 0) {
    diemTb = diemTb / data.danhSachDiem.length;
  }
  return (
    <div className="border-1  border-black border-b-0">
      <div className="flex">
        {/* start left */}

        <div className=" flex-grow ">
          <div className="p h-32 ">
            <p className="m-0 text-lg p-3 ">{data?.tenKhoaHoc}</p>

            <div className="flex   justify-evenly  items-center">
              <div className=" flex flex-col space-y-3 ">
                <p className=" flex  space-x-3 items-center">
                  <span>Đánh giá :</span>
                  <span className=" inline-block font-medium">
                    <span>{Math.floor(diemTb / 10)}</span>/
                    <span className="">10 </span>
                  </span>
                </p>

                <p>
                  Tổng thời gian học:{" "}
                  {convertMinsToHrsMins(data?.chiTietChuongHoc)}
                </p>
              </div>
              <div className=" space-y-3">
                <div className="space-x-3">
                  <span>Hoàn thành</span>
                  <span className=" border-b-2 border-blue-700 inline-block text-2xl">
                    100%
                  </span>
                </div>

                {data?.lanHocCuoi && (
                  <div className=" space-x-3">
                    <span>Lần học cuối cùng</span>
                    <span>
                      {moment(data?.lanHocCuoi, "DD/MM/YYYY HH:mm").format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                    {/* <p>{data?.lanHocCuoi}</p> */}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* start table  */}
          <div className="w-full h-px bg-black"></div>
          <table className=" border-t-1 border-black w-full text-center border-collapse border">
            <thead>
              <tr className="h-16">
                <td className="border">Chương</td>
                <td className="border">Thời gian học</td>
                <td className="border">Hoàn thành</td>
                <td className="border">Dự án</td>
                <td className="border">Trắc nghiệm</td>
              </tr>
            </thead>

            <tbody>
              {data.chiTietChuongHoc?.map((item) => {
                return (
                  <tr className="  h-16 min-h-16  border-b-1">
                    <td className="border w-1/3">{item.tenChuong}</td>
                    <td className="border">{item.thoiGianHoc}</td>
                    <td className="border">{item.hoanThanh}</td>
                    <td className="border">{item.tongDiemDuAn}</td>
                    <td className="border">{item.tongTracNghiem}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* hoanThanh: "100%"
tenChuong: "TỔNG QUAN VỀ KHOÁ HOC VÀ DỰ ÁN "
thoiGianHoc: 4546
tongDiemDuAn: 0
tongTracNghiem: 0 */}
          {/* end table */}
        </div>
        {/* end left */}

        {/*start right */}

        <div className=" border-l-1 border-black w-2/5  flex-shrink-0">
          {/* start title */}

          <div className=" p-3 flex flex-col h-32 justify-center items-start space-y-3">
            <div>
              <p>
                {data?.thoiGianThamGia && (
                  <div className=" space-x-3">
                    <span> Thời gian bắt đầu học </span>
                    <span>
                      {moment(data?.thoiGianThamGia, "DD/MM/YYYY HH:mm").format(
                        "DD/MM/YYYY"
                      )}
                    </span>
                    {/* <p>{data?.lanHocCuoi}</p> */}
                  </div>
                )}
              </p>
            </div>

            <div className=" space-x-3 flex items-center ">
              <span>Tổng điểm</span>

              <span className=" inline-block font-medium">
                {" "}
                <span className="">{diemTb}</span>/<span className="">100</span>{" "}
              </span>
            </div>
          </div>
          {/* end title */}
          <div>
            {data.danhSachDiem?.map((item) => {
              return (
                <div className="border-t-1 border-black  flex justify-between h-max-content min-h-16  items-center">
                  <p className="px-3">{item.tenBaiTap}</p>{" "}
                  <p className="w-20 min-h-16   border-black  border-l-1  flex items-center justify-center text-center">
                    <p>{item.diem}</p>
                  </p>
                </div>
              );
            })}

            <div className="w-ful h-px  bg-black"></div>
          </div>
        </div>

        {/* end right */}
      </div>
    </div>
  );
}
