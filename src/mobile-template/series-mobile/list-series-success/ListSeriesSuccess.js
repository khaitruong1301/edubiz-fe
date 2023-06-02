import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListSeriesItem from "../list-series-item/ListSeriesItem";

export default function ListSeriesSuccess() {
    const loTrinhDaHoanThanh = useSelector((state) => state.loTrinh.loTrinhDaHoanThanh);
    return (
        <div className="list-series">
            {
                loTrinhDaHoanThanh && loTrinhDaHoanThanh.length ?
                loTrinhDaHoanThanh.map((item, index) => {
                    return (
                        <ListSeriesItem key={index} loTrinh={item} /> 
                    );
                }) : <div className="text-center mt-3">Chưa có lộ trình đã hoàn thành</div>
            }
        </div>
    )
}