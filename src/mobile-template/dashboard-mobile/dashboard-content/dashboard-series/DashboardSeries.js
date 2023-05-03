import React from "react";
import { Progress } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LO_TRINH_CUA_BAN_TAB } from "../../../../utils/Constant";
import { setCurrentTabLoTrinh } from "../../../../redux/reducer/layoutReducer";
import { CustomLink } from "../../../common";
import './DashboardSeries.css'

export default function DashboardSeries({ loTrinh }) {
    const dispatch = useDispatch();

    const { tatCaLoTrinh } = useSelector((state) => state.loTrinh);

    let loTrinhChuaDangKi = tatCaLoTrinh.filter((item) => {
        return !item.daDangKy;
    });
    let widthLeftContainer =
        loTrinhChuaDangKi.length === 0 ? " w-1/2 justify-evenly" : "w-max";
    const percentPhut = Math.floor(
        (loTrinh.soPhutHoanThanh / loTrinh.tongPhut) * 100
    );
    const percentBaiTapNop = Math.floor(
        (loTrinh.baiTapNopHoanThanh / loTrinh.tongBaiTapNop) * 100
    );
    const percentTracNghiem = Math.floor(
        (loTrinh.tracNghiemHoanThanh / loTrinh.tongTracNghiem) * 100
    );

    return (
        <div className="dashdoardseries">
            <div className="mt-2">
                <p>{loTrinh.tenLoTrinh}</p>
            </div>
            <div className="flex mt-2">
                <div className="flex flex-col items-center mr-5">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb(117, 95, 211)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb( 117, 95, 211)"}
                        trailColor={"rgba( 117, 95, 211,0.3)"}
                        type="circle"
                        className="w-16 lg:w-22"
                        strokeWidth={10}
                        percent={percentPhut}
                    />
                    <div className="dashdoardseries-minus mt-1 text-sm lg:text-base flex flex-col items-center">
                        <span className="font-medium">
                            {loTrinh.soPhutHoanThanh}/{loTrinh.tongPhut}
                        </span>
                        <span>Phút video </span>
                    </div>
                </div>
                <div className="flex flex-col items-center mr-5">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb( 70, 220, 216)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb( 70, 220, 216)"}
                        trailColor={"rgba( 70, 220, 216,0.3)"}
                        type="circle"
                        className="w-16 lg:w-22"
                        strokeWidth={10}
                        percent={percentTracNghiem}
                    />
                    <div className="dashdoardseries-minus mt-1 text-sm lg:text-base flex flex-col items-center">
                        <span className="font-medium">
                            {loTrinh.tracNghiemHoanThanh}/{loTrinh.tongTracNghiem}{" "}
                        </span>
                        <span>Trắc nghiệm </span>
                    </div>
                </div>
                <div className="flex flex-col items-center">
                    <Progress
                        format={(percent) => (
                            <span style={{ color: "rgb(234, 83, 172)" }}>{percent}% </span>
                        )}
                        strokeColor={"rgb(234, 83, 172)"}
                        trailColor={"rgba(234, 83, 172,0.3)"}
                        type="circle"
                        className="w-16 lg:w-22"
                        strokeWidth={10}
                        percent={percentBaiTapNop}
                    />

                    <div className="dashdoardseries-minus mt-1 text-sm lg:text-base flex flex-col items-center">
                        <span className="font-medium">
                            {loTrinh.baiTapNopHoanThanh}/{loTrinh.tongBaiTapNop}{" "}
                        </span>
                        <span> Bài tập nộp</span>
                    </div>
                </div>
            </div>
            <div className="w-max">
                <CustomLink className="mt-3 mb-2" onClick={() => { dispatch(setCurrentTabLoTrinh(LO_TRINH_CUA_BAN_TAB));}} to={`/lo-trinh#${loTrinh.id}`}>
                    Đi đến lộ trình
                </CustomLink>
            </div>
        </div>
    );
}
