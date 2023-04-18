import React from "react";
import { Table, Tooltip } from "antd";
import ReactHtmlParser from "react-html-parser";
import GetTagStatusBaiTap from "../../utils/GetTagStatusBaiTap";
import { QUIZ } from "../../utils/Constant";

const columns = [
  {
    title: "Tên Bài tập",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Trạng thái",
    key: "trangThai",
    dataIndex: "trangThai",
    render: (trangThai) => {
      return GetTagStatusBaiTap(trangThai);
    },
  },
  {
    title: "Loại bài tập",
    dataIndex: "loaiBaiTap",
    key: "loaiBaiTap",
  },
  {
    title: "Điểm",
    dataIndex: "diem",
    key: "diem",
  },
  //   {
  //     title: "Bài làm",
  //     dataIndex: "baiLam",
  //     key: "baiLam",
  //     render: (baiLam) => {
  //       if (baiLam == 0) {
  //         return "";
  //       } else {
  //         return (
  //           <Tooltip
  //             // placement={this.state.placement}
  //             mouseEnterDelay={0}
  //             mouseLeaveDelay={0.5}
  //             trigger={["click"]}
  //             placement="top"
  //             animation="zoom"
  //             overlayClassName="  "
  //             color="white"
  //             title={
  //               <p className="text-blue-theme  p-1  text-center">
  //                 {ReactHtmlParser(baiLam)}
  //               </p>
  //             }
  //             // overlayClassName="bg-red-500"
  //             onVisibleChange={(visible) => {
  //               console.log(visible);
  //             }}
  //           >
  //             <i className="fa fa-folder-open text-blue-theme cursor-pointer text-xl"></i>
  //           </Tooltip>
  //         );
  //       }
  //     },
  //   },
  {
    title: "Nhận xét",
    dataIndex: "nhanXet",
    key: "nhanXet",
    render: (nhanXet) => {
      if (!nhanXet) {
        return "";
      } else {
        return (
          <Tooltip
            // placement={this.state.placement}
            mouseEnterDelay={0}
            mouseLeaveDelay={0.5}
            trigger={["click"]}
            placement="top"
            animation="zoom"
            overlayClassName="  "
            color="white"
            title={
              <p className="text-blue-theme  p-1  text-center">
                {ReactHtmlParser(nhanXet)}
              </p>
            }
            // overlayClassName="bg-red-500"
            onVisibleChange={(visible) => {
              // console.log(visible);
            }}
          >
            <i className="fa fa-comment-dots text-blue-theme text-xl cursor-pointer"></i>
          </Tooltip>
        );
      }
    },
  },
];
export default function TableDiemChungNhan({ data }) {
  let dataSource = data?.map((baiTap, index) => {
    return {
      key: index,
      name: baiTap.tenBaiTap,
      //   diemBaiTap: baiTap.diem,
      //   loaiBaiTap: baiTap.loaiBaiTap,
      //   baiLam: baiTap.baiLam,
      trangThai: baiTap,
      nhanXet: baiTap.nhanXet ? baiTap.nhanXet : null,
      diem: baiTap.diem ? baiTap.diem : "",
      loaiBaiTap: baiTap.loaiBaiTap === QUIZ ? "Trắc nghiệm" : "Nộp",
    };
  });
  return (
    <div className="w-full">
      <Table
        pagination={{

          pageSize: 3,
          showSizeChanger: false,
        }}
        columns={columns}
        dataSource={dataSource}
        className="w-full text-center rounded-lg shadow-lg overflow-hidden p-2"
      />
    </div>
  );
}
