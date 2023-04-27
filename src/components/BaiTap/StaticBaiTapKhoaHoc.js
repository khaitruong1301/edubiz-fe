import React, { useEffect, useState } from "react";
import { Table, Tag, Tooltip } from "antd";
import httpServ from "../../services/http.service";
import { useSelector } from "react-redux";
import ReactHtmlParser from "react-html-parser";

const columns = [
  {
    title: "Tên Bài tập",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },

  {
    title: "Thời gian làm",
    key: "deadline",
    dataIndex: "deadline",
    render: (deadline) => {
      if (deadline === "Hôm nay") {
        return (
          <Tag color="warning">
            <i className="fa fa-exclamation-triangle mr-1"></i>
            {deadline.toUpperCase()}
          </Tag>
        );
      }
      if (deadline === "Hết hạn nộp" || deadline === "Hoàn thành") {
        let color = "green";

        if (deadline === "Hết hạn nộp") {
          color = "volcano";
          return (
            <Tag color={color} key={deadline}>
              {deadline.toUpperCase()}
            </Tag>
          );
        }
        return (
          <Tag color={color} key={deadline}>
            <i className="fa fa-check mr-1"></i> {deadline.toUpperCase()}
          </Tag>
        );
      } else {
        return <span className="font-medium">{deadline}</span>;
      }
    },
  },
  {
    title: "Loại bài tập",
    dataIndex: "loaiBaiTap",
    key: "loaiBaiTap",
  },
  {
    title: "Điểm",
    dataIndex: "diemBaiTap",
    key: "diemBaiTap",
  },
  {
    title: "Bài làm",
    dataIndex: "baiLam",
    key: "baiLam",
    render: (baiLam) => {
      if (baiLam == 0) {
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
                {ReactHtmlParser(baiLam)}
              </p>
            }
          // overlayClassName="bg-red-500"

          >
            <i className="fa fa-folder-open text-blue-theme cursor-pointer text-xl"></i>
          </Tooltip>
        );
      }
    },
  },
  {
    title: "Nhận xét",
    dataIndex: "nhanXet",
    key: "nhanXet",
    render: (nhanXet) => {
      if (nhanXet === "") {
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
              console.log(visible);
            }}
          >
            <i className="fa fa-comment-dots text-blue-theme text-xl cursor-pointer"></i>
          </Tooltip>
        );
      }
    },
  },
];

export default function StaticBaiTapKhoaHoc({ data, loTrinh, idLoTrinh}) {
  const { userInfor } = useSelector((state) => state.authUser);
  useEffect(() => {
    if(!data && userInfor && idLoTrinh){
      httpServ.getDiemAndBaiTap(idLoTrinh, userInfor?.id).then((res) => {
        setDataRaw(res.data.content);
      });
    }
  }, []);

  const [dataRaw, setDataRaw] = useState([]);
  let dataMap = data ? data : dataRaw;
  let dataSource = dataMap?.map((baiTap, index) => {
    return {
      key: index,
      name: baiTap.tenBaiTap,
      diemBaiTap: baiTap.diem,
      loaiBaiTap: baiTap.loaiBaiTap,
      baiLam: baiTap.baiLam,
      deadline: baiTap.thoiGianLam,
      nhanXet: baiTap.nhanXet,
    };
  });
  return (
    <div className="w-full">
      <Table
        columns={columns}
        dataSource={dataSource}
        className="w-full text-center rounded-lg"
      />
    </div>
  );
}
