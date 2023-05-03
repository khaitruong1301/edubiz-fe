import { Progress } from "antd";
import moment from "moment";
import React from "react";
import './InfoSeries.css'
import { CustomButton, CustomLink } from "../../../common";

var dayjs = require("dayjs");

export default function InfoSeries({ loTrinhDetail, onChange, isShow }) {
    let isDisableUserClick = loTrinhDetail.daHetHan || !loTrinhDetail.daDangKy;
    const percentPhut = Math.floor(
        (loTrinhDetail.soPhutHoanThanh / loTrinhDetail.tongPhut) * 100
    );
    const percentBaiTapNop = Math.floor(
        (loTrinhDetail.baiTapNopHoanThanh / loTrinhDetail.tongBaiTapNop) * 100
    );
    const percentTracNghiem = Math.floor(
        (loTrinhDetail.tracNghiemHoanThanh / loTrinhDetail.tongTracNghiem) * 100
    );
    var start = moment(moment(loTrinhDetail.ngayBatDau).format("YYYY-MM-DD"));
    var end = moment(moment(loTrinhDetail.ngayKetThuc).format("YYYY-MM-DD"));
    var now = moment(moment().format("YYYY-MM-DD"));

    const totalDays = moment.duration(end.diff(start)).asDays();
    const remainDay = moment.duration(end.diff(now)).asDays() + 1;

    const dayDaHoc = totalDays - remainDay;
    const percentDay = Math.floor((dayDaHoc / totalDays) * 100);

    return (
        <div className="info-series">
            <b className="info-series-title">{loTrinhDetail.tenLoTrinh}</b>
            <div className="info-series-wrapper">
                <div className="info-series_progress">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb( 117, 95, 211)"}
                        trailColor={"rgba( 117, 95, 211,0.3)"}
                        type="circle"
                        className="w-20"
                        strokeWidth={10}
                        percent={percentPhut}
                    />
                    <div className="info-series_text">
                        <span>
                            {loTrinhDetail.soPhutHoanThanh}/{loTrinhDetail.tongPhut}
                        </span>
                        <span>Phút video </span>
                    </div>
                </div>
                <div className="info-series_progress">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb( 70, 220, 216)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb( 70, 220, 216)"}
                        trailColor={"rgba( 70, 220, 216,0.3)"}
                        type="circle"
                        className="w-20"
                        strokeWidth={10}
                        percent={percentTracNghiem}
                    />
                    <div className="info-series_text">
                        <span>
                            {loTrinhDetail.tracNghiemHoanThanh}/
                            {loTrinhDetail.tongTracNghiem}{" "}
                        </span>
                        <span>Trắc nghiệm </span>
                    </div>
                </div>
                <div className="info-series_progress">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb(234, 83, 172)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb(234, 83, 172)"}
                        trailColor={"rgba(234, 83, 172,0.3)"}
                        type="circle"
                        className="w-20"
                        strokeWidth={10}
                        percent={percentBaiTapNop}
                    />
                    <div className="info-series_text">
                        <span>
                            {loTrinhDetail.baiTapNopHoanThanh}/{loTrinhDetail.tongBaiTapNop}{" "}
                        </span>
                        <span> Bài tập nộp</span>
                    </div>
                </div>
                <div className="info-series_progress">
                    <Progress
                        format={(percent) => (
                            <span className="" style={{ color: "rgba(253, 206, 0, 1)" }}>
                                {percent}%{" "}
                            </span>
                        )}
                        strokeColor={"rgb(253, 206, 0)"}
                        trailColor={"rgba(253, 206, 0, 0.3)"}
                        type="circle"
                        className="w-20"
                        strokeWidth={10}
                        percent={percentDay}
                    />
                    <div className="info-series_text">
                        <span>
                            {dayjs(loTrinhDetail.ngayBatDau).format("DD/MM/YYYY")}
                        </span>
                        <span>
                            {dayjs(loTrinhDetail.ngayKetThuc).format("DD/MM/YYYY")}
                        </span>
                    </div>
                </div>
            </div>
            <div className="info-series-button">
                {
                    isDisableUserClick ? <CustomLink to="" className="ml-2 mt-2 mb-2">Đăng ký</CustomLink> : 
                    <CustomButton onClick={(onChange)} to='' className="ml-2 mt-2 mb-2">Học tiếp</CustomButton>
                }
                
                <div className="info-series-button_down" onClick={(onChange)}>
                    <div className="info-series-button_down--child">
                        <i className={`fa ${isShow ? 'fa-angle-double-up':'fa-angle-double-down'}`} aria-hidden="true"></i>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}