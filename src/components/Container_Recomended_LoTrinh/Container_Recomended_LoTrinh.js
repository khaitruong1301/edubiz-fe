import React from "react";
import { useSelector } from "react-redux";
import Card_LoTrinh_Recommended from "../Card_LoTrinh_Recommended/Card_LoTrinh_Recommended";

export default function Container_Recomended_LoTrinh() {
  const { tatCaLoTrinh } = useSelector((state) => state.loTrinh);

  let loTrinhChuaDangKi = tatCaLoTrinh.filter((item) => {
    return !item.daDangKy;
  });
  return loTrinhChuaDangKi.length === 0 ? (
    ""
  ) : (
    <div
      className="w-2/5 card_theme p-3 flex-shrink-0 h-full "
      data-tour="db-step-8"
    >
      <p className="text-lg text-color-title flex-shrink-0 mb-1 ">
        Lộ trình phù hợp với bạn
      </p>
      <Card_LoTrinh_Recommended />
    </div>
  );
}
