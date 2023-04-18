import React from "react";
import dayjs from "dayjs";
import { getIconThongBao } from "../../utils/GetIconSuKien";
import HtmlParser from "react-html-parser";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);
export default function ItemThongBaoPage({ data, typeThongBao = true }) {
  let type = typeThongBao ? data.loaiThongBao : data.phanLoai
  return (
    <div className="flex  my-3 items-center space-x-3 card_theme_item  border-none shadow min-h-16 py-2 h-max-content">
      <div className=" w-10 lg:w-16 flex-shrink-0 flex items-center justify-center ">
        {getIconThongBao(type)}
      </div>
      <div>
        <p className="font-medium text-sm text-color-title">{HtmlParser(data.noiDung)}</p>
        <p className="text-color-content">
          {dayjs(data.ngayTao).format("DD/MM/YYYY LT")}
        </p>
      </div>
    </div>
  );
}
