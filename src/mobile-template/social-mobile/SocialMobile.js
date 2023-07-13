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

    const [group, setGroup] = useState('');

    useEffect(() => {
        const maPhongBan = userInfo.danhSachPhongBan[0];
        connection.on("ReceiveStatus", (items) => console.log(items));
        connection.on("ReceiveMessage", (items) => console.log(items));
        setGroup(maPhongBan);
        connection.send('JoinRoom', { maNguoiDung: userInfo.id, maPhongBan: maPhongBan });
    }, []);

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='socailmobile'>
                <div className='socailmobile-wrapper'>
                    <SocailStatusForm nguoiDung={userInfo} group={group} />
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