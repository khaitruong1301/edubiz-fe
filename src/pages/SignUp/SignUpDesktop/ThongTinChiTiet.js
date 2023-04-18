import React from "react";
import FormThongTinChiTiet from "./FormThongTinChiTiet";

export default function ThongTinChiTiet() {
  return (
    <div className="w-full p-3 flex flex-col items-center space-y-5">
      <p className="uppercase text-xl">ĐĂNG KÝ THÔNG TIN CHÍNH</p>
      <FormThongTinChiTiet />
    </div>
  );
}
