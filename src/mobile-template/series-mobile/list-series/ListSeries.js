import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ListSeriesItem from "../list-series-item/ListSeriesItem";

export default function ListSeries() {
    const loTrinhDaDangKi = useSelector((state) => state.loTrinh.loTrinhDaDangKi);
    return (
        <div className="list-series">
            {
                loTrinhDaDangKi?.map((item, index) => {
                    return (
                        <ListSeriesItem key={index} loTrinh={item} />
                    );
                })
            }
        </div>
    )
}