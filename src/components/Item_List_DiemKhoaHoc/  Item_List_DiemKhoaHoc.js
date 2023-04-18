import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import { getHinhAnh } from "../../utils/GetHinhanh";
import TableDiemChungNhan from "../TableDiemChungNhan/TableDiemChungNhan";
function Item_List_DiemKhoaHoc({ khoaHoc, bg_color }) {
  return (
    <div className="w-full flex h-max-content items-center lg:space-x-5 flex-col lg:flex-row">
      <div className="w-1/3 flex-shrink-0 flex flex-col items-center justify-center md:hidden lg:flex">
        <NavLink
          className=""
          to={`/detail-khoa-hoc/${khoaHoc.maKhoaHoc}`}
          style={{ color: "inherit", textDecoration: "inherit" }}
        >
          <div
            style={{ background: bg_color }}
            className="card_khoa_hoc_design_code_wrapper w-full ds-code gYFusV p-3  h-60 flex flex-col items-center justify-center"
          >
            <div className="flex w-full items-center ">
              <div className="w-1/2">
                <img
                  src={getHinhAnh(khoaHoc.hinhAnh)}
                  className="w-full object-cover"
                  alt=""
                />
              </div>
              <p className="text-lg w-1/2 text-center text-white">
                {khoaHoc.tenKhoaHoc}
              </p>
            </div>
          </div>
        </NavLink>

      </div>
      <p className="text-base w-2/3 text-center font-medium text-color-title block lg:hidden">
        {khoaHoc.tenKhoaHoc}
      </p>
      <TableDiemChungNhan data={khoaHoc.danhSachBaiTap} />

    </div>
  );
}
export default memo(Item_List_DiemKhoaHoc);
