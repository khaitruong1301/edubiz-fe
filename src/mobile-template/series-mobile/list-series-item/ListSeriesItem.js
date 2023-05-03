import React, { useState, useMemo } from "react";
import HtmlParser from "react-html-parser";
import { MenuTab, ShowAllBox } from "../../common";
import InfoSeries from "./info-series/InfoSeries";
import './ListSeriesItem.css';
import { arrBg_LinearGgradient } from "../../../assets/bg-linear-gradient";
import { checkDemoUser } from "../../../utils/HocDemoUtils";
import CardThaoLuanQ_A from "../../../components/CardThaoLuanQ_A/CardThaoLuanQ_A";
import StaticBaiTapKhoaHoc from "../../../components/BaiTap/StaticBaiTapKhoaHoc";
import CardKhoaHoc_DesignCode from "../../../components/CardKhoaHoc/CardKhoaHoc_DesignCode";

export default function ListSeriesItem({ loTrinh }) {
    let isDemoUser = useMemo(() => checkDemoUser() || false, [])
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = () => {
        setCollapse(!collapse);
    }

    return (
        <div className="listseriesitem">
            <div className="listseriesitem-item listseriesitem-head">
                <InfoSeries loTrinhDetail={loTrinh} isShow={collapse} onChange={handleCollapse} />
            </div>
            <div className="listseriesitem-item" style={{ display: collapse ? 'block' : 'none' }}>
                <div className="listseriesitem-body">
                    <MenuTab>
                        <div tabIndex={1} title="Khoá học">
                            <div className="listseriesitem-courses" >
                                {loTrinh.danhSachKhoaHoc.map((item, index) => {
                                    return (
                                        <CardKhoaHoc_DesignCode
                                            bg_color={arrBg_LinearGgradient[index]}
                                            khoaHoc={item}
                                            id_tool_tip={index}
                                            key={index}
                                            loTrinh={loTrinh}
                                            isDemoUser={isDemoUser}
                                            isBlackFridayDay={false}
                                            urlCourse='/course'
                                        ></CardKhoaHoc_DesignCode>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="listseriesitem-details" tabIndex={2} title="Giới thiệu">
                            <ShowAllBox>{loTrinh.moTa ? HtmlParser(loTrinh.moTa) : ""}</ShowAllBox>
                        </div>

                        <div tabIndex={3} title="Q&A">
                            <CardThaoLuanQ_A idLoTrinh={loTrinh.id} />
                        </div>
                        <div tabIndex={4} title="Bài tập và điểm">
                            <StaticBaiTapKhoaHoc loTrinh={loTrinh} />
                        </div>
                    </MenuTab>
                </div>
            </div>
        </div>
    )
}