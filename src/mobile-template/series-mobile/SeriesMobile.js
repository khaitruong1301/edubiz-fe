import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavBar, TabMobile } from '../common';
import httpServ from '../../services/http.service';
import { checkDemoUser } from '../../utils/HocDemoUtils';
import AllSeries from './all-series/AllSeries';
import ListSeries from './list-series/ListSeries';
import ListSeriesSuccess from './list-series-success/ListSeriesSuccess';
import { setLoTrinhDaDangKi, setTatCaLoTrinh, setLoTrinhDaHoanThanh } from '../../redux/reducer/loTrinhReducer';
import './SeriesMobile.css';


const tabs = [
    { title: 'Đang thực hiện', component: <ListSeries /> },
    { title: 'Chưa ghi danh', component: <AllSeries /> },
    { title: 'Đã hoàn thành', component: <ListSeriesSuccess /> }
];

function SeriesMobile(props) {
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
            <div className='seriesmobile'>
                <TabMobile tabs={tabs} />
            </div>
        </>
    )
}

export default SeriesMobile;