import React from "react";
import "./CardLoTrinh_design_code.css";
import { getHinhAnh } from "../../utils/GetHinhanh";
import StartEndDay from "./StartEndDay";
import LazyLoad from "react-lazyload";
import ReportPDF from "../ReportPDF/ReportPDF";

export default function IntroLoTrinh({
  loTrinh,
  isHoverActive,
  btn_tuVan,
  isBlackFridayDay = false,
}) {
  return (
    <div
      className={
        isHoverActive
          ? `HandbookCard__Wrapper-sc-7b5434-1 hoyCxl  cursor-pointer card_design_code activeHover h-full`
          : `HandbookCard__Wrapper-sc-7b5434-1 hoyCxl  cursor-pointer card_design_code h-full  `
      }
    >
      <div className=" iusqHF flex flex-col justify-between    space-y-3 lg:space-y-5 ">
        <div className="grid grid-cols-5 gap-2 lg:gap-3 bg ">
          {/* {
            JSON.parse(loTrinh.iconNgonNgu).map((icon) => {
              return (
                <LazyLoad>
                  <div className=" md:w-6 md:h-6 lg:w-8 lg:h-8">
                    <img src={getHinhAnh(icon)} alt="" />
                  </div>
                </LazyLoad>
              );
            })} */}
        </div>

        <div className="HandbookCard__TextWrapper-sc-7b5434-5 kqcNFY">
          <h3 className="TextStyles__H3H5-h7d1e3-6 HandbookCard__Title-sc-7b5434-7 hpcBLU md:text-lg lg:text-xl">
            {loTrinh.tenLoTrinh}
          </h3>
          <p className="TextStyles__SmallText-h7d1e3-12 HandbookCard__Description-sc-7b5434-8 jslvrh"></p>
          {btn_tuVan ? (
            <div className="flex  space-y-2 items-start  flex-col flex-shrink-0  font-medium">
              Thời hạn truy xuất : {loTrinh.thoiHan} tháng
            </div>
          ) : (
            <div className="lg:hidden">
              <StartEndDay loTrinh={loTrinh} />
            </div>
          )}
        </div>
        <button className="  xem-lo-trinh-btn  border-none rounded-2xl block    h-15 w-max  text-blue-theme  mx-auto  p-3 px-4 text-base  font-medium z-10 shadow_designCode btn_xemLoTrinh_designCode">
          {/* {
            btn_tuVan
              ? isBlackFridayDay
                ? "Xem thêm"
                : "HỌC THỬ"
              : "Tiếp tục học"
          } */}
          Xem thêm
        </button>
        {/* <ReportPDF loTrinhId={loTrinh.id} /> */}
      </div>
      <div
        color="linear-gradient(180deg, #408DD5 0%, #630B8C 100%)"
        className="HandbookCard__SecondBackground-sc-7b5434-3 lcvTnr  cursor-pointer card_design_code_bg"
      />
    </div>
  );
}
