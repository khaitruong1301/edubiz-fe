import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavBar, TabMobile } from '../common';
import { AlertMobile, HistoryMobile, EventContent } from './index'


function EventMobile(props) {
    const { userInfor } = useSelector((state) => state.authUser);
    const tabs = [
        { title: 'Lịch sử', component: <HistoryMobile userId={userInfor.id}/> },
        { title: 'Thông báo', component: <AlertMobile userId={userInfor.id}/> },
        { title: 'Sự kiện', component: <EventContent userId={userInfor.id}/> }
    ]

    return (
        <>
            <NavBar title={props.title} isPrev={true} />
            <div className='event-mobile'>
                <TabMobile tabs={tabs} defaultIndex={1} />
            </div>
        </>
    )
}

export default EventMobile;