import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListSeriesItem from "../list-series-item/ListSeriesItem";

export default function ListSeriesSuccess() {
    let loTrinhDaHoanThanh = useSelector((state) => state.loTrinh.loTrinhDaDangKi);
    if(loTrinhDaHoanThanh && loTrinhDaHoanThanh.length){
        loTrinhDaHoanThanh = loTrinhDaHoanThanh.filter(x => x.daHoanThanh);
    }
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