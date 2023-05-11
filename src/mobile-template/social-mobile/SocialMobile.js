import { useEffect, useState } from 'react';
import httpServ from '../../services/http.service';
import { NavBar } from '../common';
import './SocialMobile.css'
import SocialListComment from './social-list-comments/SocialListComment';
import SocailStatusForm from './social-status-form/SocialStatusForm';
import SocialStatus from './social-status/SocialStatus';
import localStorageServ from '../../services/locaStorage.service';
import { connection } from '../../index';
function SocialMobile(props) {
    const userInfo = localStorageServ.userInfor.get();
    const [nguoiDung, setNguoiDung] = useState(userInfo);

    useEffect(() => {

        httpServ.getThongTinBangMaNguoiDung(nguoiDung.id)
            .then(res => {
                const data = res.data.content[0];
                const nguoiDungInfo = {
                    ...nguoiDung,
                    maPhongBan: data.maPhongBan,
                    chucVu: data.chucVu
                }
                setNguoiDung(nguoiDungInfo);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='socailmobile'>
                <div className='socailmobile-wrapper'>
                    <SocailStatusForm nguoiDung={nguoiDung} />
                    <div className='socailmobile-item'>
                        <SocialStatus />
                        <SocialListComment />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SocialMobile;