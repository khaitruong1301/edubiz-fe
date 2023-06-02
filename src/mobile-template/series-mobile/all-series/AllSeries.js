import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getYoursItemAciton } from "../../../redux/reducer/dashboardReducer";
import AllSeriesItem from "./all-series-item/AllSeriesItem";
import './AllSeries.css'


export default function AllSeries() {
    const dispatch = useDispatch();
    const { userInfor } = useSelector((state) => state.authUser);
    const { tatCaLoTrinh, currentActiveTypeFilter } = useSelector((state) => state.loTrinh);

    const [ listLoTrinh, setListLoTrinh ] = useState([]);

    useEffect(() => {
        dispatch(getYoursItemAciton(userInfor.id));
        let dsLoTrinh = currentActiveTypeFilter === "all" ? tatCaLoTrinh 
            : tatCaLoTrinh.filter((loTrinh) => loTrinh.loaiLoTrinh.includes(currentActiveTypeFilter));
        setListLoTrinh(dsLoTrinh);
    }, [tatCaLoTrinh]);

    return (
        <div className="all-series">
            {
                listLoTrinh && listLoTrinh.length ?
                listLoTrinh.map((item, index) => {
                    return (
                        <AllSeriesItem 
                            key={index} 
                            keyIndex={index+1} 
                            loTrinh={item} 
                            userInfo={userInfor}
                        />
                    );
                }) : <div className="text-center mt-3">Không có lộ trình chưa đăng ký</div>
            }
        </div>
    )
}