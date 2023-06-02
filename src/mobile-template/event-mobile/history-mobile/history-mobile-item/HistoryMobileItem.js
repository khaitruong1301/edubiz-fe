import React from "react";
import dayjs from "dayjs";
import { getIconThongBao } from "../../../../utils/GetIconSuKien";
import HtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
var localizedFormat = require("dayjs/plugin/localizedFormat");
dayjs.extend(localizedFormat);

function HistoryMobileItem({ data, typeThongBao }) {
    let type = typeThongBao ? data.loaiThongBao : data.phanLoai

    const renderThongBao = (noiDung) => {
        const objNoiDung = JSON.parse(noiDung);
        if (objNoiDung.SuKien == 'TIENTRINH') {
            return <Link to="/series">Bạn đã được ghi danh vào lộ trình {objNoiDung.NoiDung}</Link>
        }
    }

    return (
        <div className="flex  my-3 items-center space-x-3 card_theme_item  border-none shadow min-h-16 py-2 h-max-content">
            <div className=" w-10 lg:w-16 flex-shrink-0 flex items-center justify-center ">
                {getIconThongBao(type)}
            </div>
            <div>
                <p className="font-medium text-sm text-color-title">
                    {
                         data.loaiThongBao == 'HOCTAP' ||  data.phanLoai == 'GHIDANH' ? renderThongBao(data.noiDung) : HtmlParser(data.noiDung)
                    }
                </p>
                <p className="text-color-content">
                    {dayjs(data.ngayTao).format("DD/MM/YYYY LT")}
                </p>
            </div>
        </div>
    );
}

export default HistoryMobileItem;