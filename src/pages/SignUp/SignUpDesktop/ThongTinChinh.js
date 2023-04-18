import React, { useState } from "react";
import FormDieuKhoan from "./FormDieuKhoan";
import ModalDieuKhoan from "./ModalDieuKhoan";

export default function ThongTinChinh() {
  const [isShowDieuKhoan, setIsShowDieuKhoan] = useState(false);
  const handleCloseModal = () => {
    setIsShowDieuKhoan(false);
  };
  const handleOpenModal = () => {
    setIsShowDieuKhoan(true);
  };

  return (
    <div className="w-full h-full p-3 flex flex-col items-center space-y-5">
      <p className="uppercase  text-lg lg:text-xl">ĐĂNG KÝ THÔNG TIN CHÍNH</p>
      <div className="text-color-content text-base md:text-lg">
        <p>* Lưu ý:</p>
        <p>
          - Vui lòng đọc{" "}
          <span
            onClick={() => {
              setIsShowDieuKhoan(true);
            }}
            className="text-red-700 underline cursor-pointer"
          >
            ĐIỀU KHOẢN
          </span>{" "}
          trước khi đăng ký. Vui lòng cung cấp đầy đủ các thông tin để
          CyberLearn xét duyệt. CyberLearn chỉ cung cấp khóa học cho các tài
          khoản thật và có nhu cầu học thật sự.
        </p>
        <p>
          - Hệ thống đăng nhập bằng facebook, nên email bạn đăng ký phải là
          email facebook của bạn.
        </p>
      </div>
      <FormDieuKhoan handleOpenModal={handleOpenModal} />
      <ModalDieuKhoan
        isShowDieuKhoan={isShowDieuKhoan}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
