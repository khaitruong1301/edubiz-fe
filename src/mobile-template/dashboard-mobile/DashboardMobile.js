import React, { useEffect } from "react";
import { NavBar, TabMobile } from '../common';
import { DashboardContent, TopIndustrious } from './index';
import { useSelector, useDispatch } from "react-redux";
import {
  setTatCaLoTrinh,
  setLoTrinhDaDangKi,
  setLoTrinhDaHoanThanh,
} from "../../redux/reducer/loTrinhReducer";
import httpServ from "../../services/http.service";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import './DashboardMobile.css'
import { log } from "@craco/craco/lib/logger";

const tabs = [
    { title: 'Tất cả', component: <DashboardContent /> },
    { title: 'Top chuyên cần', component: <TopIndustrious /> }
]

function DashboardMobile(props) {
    
    const dispatch = useDispatch();
    let userInfor = useSelector((state) => state.authUser.userInfor);

    useEffect(() => {
        getSeries();
    }, []);

    useEffect(() => {
        getSeries();
    }, [window.location.pathname]);

    const getSeries = () => {
        !checkDemoUser() &&
            httpServ.getLoTrinhDaDangKI(userInfor?.id).then((res) => {
                let resLoTrinhDangHoc = [];
                let resLoTrinhDaHoanThanh = [];
                if (res.data.content && res.data.content.length) {
                    resLoTrinhDangHoc = res.data.content.filter(item => item.choDuyet && !item.daHetHan);
                    resLoTrinhDaHoanThanh = res.data.content.filter(item => item.choDuyet && item.daHetHan);
                    dispatch(setLoTrinhDaDangKi(resLoTrinhDangHoc));
                    dispatch(setLoTrinhDaHoanThanh(resLoTrinhDaHoanThanh));
                }
            });
        !checkDemoUser() &&
            httpServ.getTatCaLoTrinh(userInfor?.id).then((res) => {
                let resLoTrinh = [];
                if (res.data.content && res.data.content.length) {
                    resLoTrinh = res.data.content.filter(item => !item.daDangKy);
                }
                dispatch(setTatCaLoTrinh(resLoTrinh));
            });
    }
    

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='dashboard-mobile'>
                <TabMobile tabs={tabs} />
            </div>
        </>
    )
}

export default DashboardMobile;