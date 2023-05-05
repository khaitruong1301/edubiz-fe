import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getYoursItemAciton } from "../../../redux/reducer/dashboardReducer";
import AllSeriesItem from "./all-series-item/AllSeriesItem";
import './AllSeries.css'

export default function AllSeries() {
    const dispatch = useDispatch();
    const { userInfor } = useSelector((state) => state.authUser);

    const { tatCaLoTrinh, currentActiveTypeFilter } = useSelector(
        (state) => state.loTrinh
    );
    // console.log("tatCaLoTrinh", tatCaLoTrinh);
    useEffect(() => {
        dispatch(getYoursItemAciton(userInfor.id));
    }, []);

    let listLoTrinh =
        currentActiveTypeFilter === "all"
            ? tatCaLoTrinh
            : tatCaLoTrinh.filter((loTrinh) => {
                return loTrinh.loaiLoTrinh.includes(currentActiveTypeFilter);
            });            

    return (
        <div className="all-series">
            {
                listLoTrinh?.map((item, index) => {
                    return (
                        <AllSeriesItem key={index} keyIndex={index+1} loTrinh={item} />
                    );
                })
            }
        </div>
    )
}