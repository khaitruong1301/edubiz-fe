import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListSeriesItem from "../list-series-item/ListSeriesItem";

export default function ListSeries() {
    let loTrinhDaDangKi = useSelector((state) => state.loTrinh.loTrinhDaDangKi);
    if(loTrinhDaDangKi && loTrinhDaDangKi.length){
        loTrinhDaDangKi = loTrinhDaDangKi.filter(x => !x.daHoanThanh);
    }
    
    return (
        <div className="list-series">
            {
                loTrinhDaDangKi && loTrinhDaDangKi.length ?
                loTrinhDaDangKi.map((item, index) => {
                    return (
                        <ListSeriesItem key={index} loTrinh={item} /> 
                    );
                }) : <div className="text-center mt-3">Chưa có lộ trình đang học</div>
            }
        </div>
    )
}