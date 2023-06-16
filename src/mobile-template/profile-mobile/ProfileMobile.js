import { NavBar } from '../common';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { URL_PAGE } from "../common";
import React, { useState } from "react";
import './ProfileMobile.css'
import { ProfileAvatar, ProfileInfo } from './index';
import Shop_Item from '../../components/Shop_Item/Shop_Item';
import List_Card_Task_Deadline from '../../components/List_Card_Task_Deadline/List_Card_Task_Deadline';
import localStorageServ from '../../services/locaStorage.service';
import { Modal } from 'antd';
import ChangeAvatar from './change-avatar/ChangeAvatar';
import ChangePassword from './change-password/ChangePassword';

const types = { PASSWORD: 'PASSWORD', AVATAR: 'AVATAR' };

function ProfileMobile(props) {
    const history = useHistory();
    const { userInfor } = useSelector((state) => state.authUser);

    const [visible, setVisible] = useState(false);
    const [type, setType] = useState('');

    const handleLogoutClick = () => {
        localStorageServ.userInfor.remove();
        history.push(URL_PAGE.LOGIN);
    }

    const handleOpenModal = (type) => {
        setType(type);
        setVisible(true);
    }

    const handleCloseModal = (type) => {
        setType('');
        setVisible(false);
    }

    const renderComponent = () => {
        if (type == types.AVATAR)
            return <ChangeAvatar 
                        handleCloseModal={handleCloseModal}
                        userInfo={userInfor}
                    />;
        else if (type == types.PASSWORD)
            return <ChangePassword handleCloseModal={handleCloseModal}/>;
        else 
            return null;
    }

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='profile-mobile'>
                <div className='profile-mobile_item'>
                    <div style={{ display: 'flex' }}>
                        <ProfileAvatar userInfo={userInfor} />
                        <ProfileInfo userInfo={userInfor} />
                    </div>

                    <div className='profile-mobile_button'>
                        <button onClick={() => handleOpenModal(types.AVATAR)}>Đổi avatar</button>
                        <button onClick={() => handleOpenModal(types.PASSWORD)}>Đổi mật khẩu</button>
                    </div>
                </div>

                <div className='profile-mobile_item' style={{ paddingTop: '1rem' }}>
                    <Shop_Item />
                </div>
                <div className='profile-mobile_item'>
                    <List_Card_Task_Deadline />
                </div>

            </div>

            <div className='profile-mobile_button' style={{justifyContent: 'center'}}>
                <button onClick={(handleLogoutClick)}>ĐĂNG XUẤT</button>
            </div>

            <Modal visible={visible} footer={null} width={600} onCancel={(handleCloseModal)}>
                { renderComponent() }
            </Modal>
        </>
    )
}

export default ProfileMobile;