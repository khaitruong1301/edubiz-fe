import React, { useEffect } from "react";
import { NavBar, TabMobile } from '../common';
import { DashboardContent, TopIndustrious } from './index';
import { useSelector, useDispatch } from "react-redux";
import {
  setTatCaLoTrinh,
  setLoTrinhDaDangKi,
} from "../../redux/reducer/loTrinhReducer";
import httpServ from "../../services/http.service";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import './DashboardMobile.css'

function DashboardMobile(props) {
    const tabs = [
        { title: 'Tất cả', component: <DashboardContent /> },
        { title: 'Top chuyên cần', component: <TopIndustrious /> }
    ]

    const dispatch = useDispatch();
    let userInfor = useSelector((state) => state.authUser.userInfor);

    useEffect(() => {
        !checkDemoUser() &&
            httpServ.getLoTrinhDaDangKI(userInfor?.id).then((res) => {
                const resLoTrinh = res.data.content;

                dispatch(setLoTrinhDaDangKi(resLoTrinh));
            });
        !checkDemoUser() &&
            httpServ.getTatCaLoTrinh(userInfor?.id).then((res) => {
                const resLoTrinh = res.data.content.filter((item) => {
                    return !item.daDangKy;
                });

                dispatch(setTatCaLoTrinh(resLoTrinh));
            });
    }, [window.location.pathname]);
    // let userTour = useSelector((state) => state.tour.userTour);
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