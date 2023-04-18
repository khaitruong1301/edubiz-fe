import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import httpServ from "../../services/http.service";
import { Modal, Button } from "antd";
import { Content } from "./ContentHTML";
export default function ReportPDF({ loTrinhId, chungNhan = {} }) {
  const { userInfor } = useSelector((state) => state.authUser);
  const [dataReport, setDataReport] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    httpServ
      .getReportLoTrinh(userInfor.id, loTrinhId)
      .then((res) => {
        setDataReport(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <button className=" outline-none" onClick={showModal}>
        Xem report
      </button>
      <Modal
        visible={visible}
        title="Report lộ trình học"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width="90%"
        height="90%"
        style={{ top: 10 }}
      >
        <div style={{ height: "85vh" }} className=" w-full overflow-y-scroll ">
          <Content loTrinh={dataReport} user={userInfor} />
        </div>
      </Modal>
    </>
  );
}
