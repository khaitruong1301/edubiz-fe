import React, { Component } from "react";
import chuky from "../../assets/img/chuKi.png";
import logo from "../../assets/logo_opcacity.png";
import "./table.css";
let diemTB = 0;

const TITLE = "HỆ THỐNG ĐÀO TẠO TRỰC TUYẾN EDUBIZ";
const WEBSITE = 'https://edubiz.vn/' 

export default class LayOutInBangDiem extends Component {
  xuatBaiNop = () => {
    const { loTrinh } = this.props;

    let noiDung = [];
    let iSTT = 0;
    let maKhoaHoc = 0;
    let tongDiem = 0;
    let slBaiTap = 0;
    loTrinh?.danhSachKhoaHoc.map((khoaHoc) => {
      let demBaiHoc = khoaHoc.danhSachBaiTap.length;

      slBaiTap += demBaiHoc;
      khoaHoc.danhSachBaiTap.map((baitap) => {
        let diem = baitap.diem ? baitap.diem * 1 : 0;
        tongDiem += diem;
        noiDung.push(
          <tr>
            <td style={{ padding: 10, textAlign: "center" }}>{++iSTT}</td>
            <td style={{ padding: 10, width: '25%' }}>{baitap.tenBaiTap}</td>
            <td style={{ padding: 10, textAlign: "center" }}>
              {Number(baitap.diem)}
            </td>
            <td style={{ padding: 10, textAlign: "center" }}>
              {Number(baitap.diem) / 10}
            </td>
            {maKhoaHoc != khoaHoc.tenKhoaHoc && (
              <td
                rowSpan={demBaiHoc}
                style={{ padding: 10, textAlign: "center", width: '25%' }}
              >
                {khoaHoc.tenKhoaHoc}
              </td>
            )}
          </tr>
        );
        // gan ma khoa hoc de hien ten 1 lan
        maKhoaHoc = khoaHoc.tenKhoaHoc;
      });
    });
    // console.log(tongDiem);
    diemTB = (tongDiem / 10 / slBaiTap).toFixed(1);
    // }
    return noiDung;
  };

  render() {
    const { nguoiDung } = this.props;
    let dNow = new Date();

    if (diemTB == 0) this.xuatBaiNop();

    let xepLoai = "Dưới Trung Bình";

    if (diemTB >= 5) xepLoai = "Trung Bình";
    if (diemTB >= 6) xepLoai = "Trung Bình Khá";
    if (diemTB >= 7) xepLoai = "Khá";
    if (diemTB >= 8) xepLoai = "Giỏi";
    if (diemTB >= 9) xepLoai = "Xuất sắc";

    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
        className="bg-white "
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            // background: `url(${logo}) center center / 80% no-repeat`,
          }}
        >
          <b style={{ fontSize: "18px", textAlign: "center", width: "100%", margin: '1rem 0' }}>
            { TITLE }
            <br />
            <br />
            BẢNG ĐIỂM
          </b>
          <table style={{ margin: "0 18px" }}>
            <tbody>
              <tr>
                <td>
                  <u>Họ tên:</u> <b> {nguoiDung.hoTen}</b>
                </td>
                <td>
                  <u>Thời gian học:</u>{" "}
                  <b>{this.props.loTrinh?.thoiGianDaoTao} tháng</b>
                </td>
              </tr>
              <tr>
                <td>
                  <u>Lộ trình: </u> <b> {this.props.loTrinh?.tenLoTrinh}</b>{" "}
                </td>
                <td>
                  <u>Hình thức học:</u>
                  <b> Online trực tuyến</b>{" "}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            border={1}
            style={{
              margin: "18px",
              border: "1px solid black",
              borderCollapse: "collapse",
              width: '100%'
            }}
            className="table_BangDiem"
          >
            <tbody>
              <tr style={{ textAlign: "center", fontWeight: "bold" }}>
                <td style={{ padding: 10 }}>STT</td>
                <td style={{ padding: 10 }} width="25%">Tên bài tập/dự án </td>
                <td style={{ padding: 10 }}>Điểm</td>
                <td style={{ padding: 10 }}>Hệ 10</td>
                <td style={{ padding: 10 }} width="25%">
                  Khóa học
                </td>
              </tr>

              {this.xuatBaiNop()}
            </tbody>
          </table>
          <table style={{ margin: "18px " }} className="w-full b">
            <tbody>
              <tr>
                <td
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    width: "30%",
                  }}
                >
                  Điểm trung bình toàn khóa:{" "}
                </td>
                <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {" "}
                  {diemTB}
                </td>
              </tr>
              <tr>
                <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {" "}
                  Xếp loại:{" "}
                </td>
                <td style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {" "}
                  {xepLoai}
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ textAlign: "center" }}>
            <tbody>
              <tr>
                <td style={{ width: "50%" }}> </td>
                <td style={{ fontSize: "18px" }} className="">
                  Ngày {dNow.getDate()} tháng {dNow.getMonth() + 1} năm{" "}
                  {dNow.getFullYear()}
                  {/* <br />
                  <br />
                  <b style={{ fontSize: "20px", padding: "0 18px" }}>
                    GIÁM ĐỐC
                  </b>
                  <br />
                  <br />
                  <img
                    src={chuky}
                    width="30%"
                    className="m-0 inline-block p-0 "
                  />
                  <br />
                  <b style={{ fontSize: "20px" }}> Lê Quang Song</b> */}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          style={{
            padding: 20,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span>{WEBSITE}</span>
          <span>{WEBSITE}</span>
        </div>
      </div>
    );
  }
}
