import React, { useState } from "react";
import mtImg from "../../../assets/img/CMND_truoc.7460b9e4.jpg";
import msImg from "../../../assets/img/CMND_sau.11d7fa83.jpg";
import { Modal } from "antd";
export default function Modal_MinhHoa() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <span
        className="text-blue-600 font-medium cursor-pointer"
        onClick={showModal}
      >
        (<span>Ảnh minh hoạ</span>)
      </span>
      <Modal
        // title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="w-max"
      >
        <div className="flex">
          <div className="w-1/2 p-5">
            <p className="text-xl">Mặt trước</p>
            <img src={mtImg} className="w-full object-contain " alt="" />
          </div>
          <div className="w-1/2 p-5">
            <p className="text-xl">Mặt sau</p>
            <img src={msImg} className="w-full object-contain " alt="" />
          </div>
        </div>
      </Modal>
    </>
  );
}
