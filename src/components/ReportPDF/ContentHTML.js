import * as React from "react";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import "./style.css";
import CircleHeader from "./CircleHeader";
import KhoaHoc from "./KhoaHoc";

export const Content = ({ loTrinh, user }) => {
  const container = React.useRef(null);
  const pdfExportComponent = React.useRef(null);

  const exportPDFWithComponent = () => {
    let element = container.current || document.body;
    savePDF(element, {
      paperSize: "auto",
      margin: 40,
      fileName: `CyberSoft ${new Date().getFullYear()}`,
    });
  };

  return (
    <div className="w-full h-full space-y-2">
      <div className=" flex justify-end">
        <button
          className=" px-2 py-1 bg-blue-theme text-white rounded shadow hover:shadow-lg transition"
          onClick={exportPDFWithComponent}
        >
          <i class="fa fa-file-export text-white mr-2"></i> Export PDF
        </button>
        {/* <button
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
          onClick={exportPDFWithMethod}
        >
          Export with method
        </button> */}
      </div>
      <div id="contentReport" style={{ left: "200%" }} className=" ">
        <PDFExport
          ref={pdfExportComponent}
          margin={20}
          fileName={`CyberLearn ${new Date().getFullYear()}`}
          // author="KendoReact Team"
        >
          <div ref={container} className=" ">
            <div className="border-1  border-black border-b-0">
              <div className="space-y-2  p-3">
                <p style={{}} className=" font-medium  ">
                  Tên lộ trình:{loTrinh?.tenLoTrinh}
                </p>
                <p style={{}} className=" font-medium  ">
                  Học viên:{user?.hoTen}
                </p>
              </div>

              {/* percent */}

              <div className="flex justify-evenly py-4">
                <CircleHeader
                  number={loTrinh?.tongBaiTapNop}
                  title="Bài tập nộp"
                />
                <CircleHeader number={loTrinh?.tongKhoaHoc} title="Khoá học" />
                <CircleHeader
                  number={loTrinh?.tongTracNghiem}
                  title="Trắc nghiệm"
                />
                <CircleHeader number={loTrinh?.tongVideo} title="Video" />
                <CircleHeader number={loTrinh?.tongPhut} title="Phút" />
              </div>
            </div>

            <div className="">
              {loTrinh?.chiTietKhoaHoc.map((item, index) => {
                return <KhoaHoc data={item} key={index} />;
              })}
            </div>

            <div className="bg-black w-full h-px"></div>
          </div>
        </PDFExport>
      </div>
    </div>
  );
};
// {
//   "tenKhoaHoc": "Khóa 2: ReactJS chuyên sâu trên nhiều component",
//   "lanHocCuoi": "",
//   "thoiGianThamGia": "11/23/2021 4:06:15 PM",
//   "chiTietChuongHoc": [
//       {
//           "tenChuong": "BÀI KIỂM TRA ĐẦU VÀO",
//           "thoiGianHoc": 483,
//           "hoanThanh": "100%",
//           "tongDiemDuAn": 0,
//           "tongTracNghiem": 71
//       },
//       {
//           "tenChuong": "TRUYỀN NHẬN DỮ LIỆU GIỮA CÁC COMPONENT THÔNG QUA THUỘC TÍNH PROPS",
//           "thoiGianHoc": 1292,
//           "hoanThanh": "100%",
//           "tongDiemDuAn": 0,
//           "tongTracNghiem": 0
//       }
//   ],
//   "danhSachDiem": [
//       {
//           "tenBaiTap": "Trắc nghiệm khóa 1",
//           "trangThai": 0,
//           "diem": "71",
//           "loaiBaiTap": "",
//           "nhanXet": ""
//       },
//       {
//           "tenBaiTap": "Bài tập redux ứng dụng order burger",
//           "trangThai": 0,
//           "diem": "0",
//           "loaiBaiTap": "",
//           "nhanXet": ""
//       }
//   ]
// }
