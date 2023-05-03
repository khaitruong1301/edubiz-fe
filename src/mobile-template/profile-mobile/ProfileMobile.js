import { NavBar } from '../common';
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { URL_PAGE } from "../common";
import React from "react";
import './ProfileMobile.css'
import { ProfileAvatar, ProfileInfo } from './index';
import Shop_Item from '../../components/Shop_Item/Shop_Item';
import List_Card_Task_Deadline from '../../components/List_Card_Task_Deadline/List_Card_Task_Deadline';

function ProfileMobile(props) {
    const { userInfor } = useSelector((state) => state.authUser);
    const history = useHistory();

    const handleLogoutClick = () => {
        history.push(URL_PAGE.LOGIN);
    }

    return (
        <>
            <NavBar title={props.title} isPrev={false} />
            <div className='profile-mobile'>
                <div className='profile-mobile_item'>
                    <ProfileAvatar userInfo={userInfor} />
                    <ProfileInfo userInfo={userInfor} />
                </div>
                <div className='profile-mobile_item' style={{ paddingTop: '1rem'}}>
                    <Shop_Item />
                </div>
                <div className='profile-mobile_item'>
                    <List_Card_Task_Deadline />
                </div>
            </div>

            <div className='profile-mobile_button'>
                <button onClick={(handleLogoutClick)}>ĐĂNG XUẤT</button>
            </div>
        </>
    )
}

export default ProfileMobile;