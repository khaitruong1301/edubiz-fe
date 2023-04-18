import { Modal } from "antd";
import React from "react";

export default function PopUpAlertDemoUser({ isShowModal, handleOk }) {
  return (
    <Modal
      title="Sắp hết thời gian học thử"
      className="rounded-xl p-0 overflow-hidden felx flex-col items-center"
      visible={isShowModal}
      // onOk={handleOk}
      onCancel={() => {
        handleOk(false);
      }}
      footer={null}
    //   forceRender={isShowModal}
    >
      <div className="w-full flex flex-col  items-center justify-center  space-y-10 px-5">
        <p className="text-lg">
          Thời gian học thử của bạn sắp hết, để tiếp tục học lộ trình vui lòng
          đăng kí lộ trình
        </p>
        <button
          onClick={() => {
            handleOk(false);
          }}
          className=" cursor-pointer card_theme p-3 font-medium text-base text-blue-theme border-none shadow-design_code"
        >
          Đồng ý
        </button>
      </div>
    </Modal>
  );
}
