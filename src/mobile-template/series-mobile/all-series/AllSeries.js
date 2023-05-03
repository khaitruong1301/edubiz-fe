import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListSeriesItem from "../list-series-item/ListSeriesItem";
import { getYoursItemAciton } from "../../../redux/reducer/dashboardReducer";

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
        <div className="list-series">
            {
                listLoTrinh?.map((item, index) => {
                    return (
                        <ListSeriesItem key={index} loTrinh={item} />
                    );
                })
            }
        </div>
    )
}