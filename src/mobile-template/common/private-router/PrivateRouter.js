import React, { useEffect, useState } from "react";
import { Route } from 'react-router-dom';
import { Redirect } from "react-router";
import localStorageServ from "../../../services/locaStorage.service";
import { DashboardMobile, CertificateMobile, ProfileMobile, CourseMobile, CourseMobile2,
    SeriesMobile, SocialMobile, EventMobile } from '../../index'
import BottomBar from "../bottombar/BottomBar";
import LayoutContent from "../layout-content/LayoutContent";
import { URL_PAGE } from "..";

function PrivateRouter() {
    if (!localStorageServ.userDemo.get() && !localStorageServ.userInfor.get()) {
        return <Redirect to='lms' />;
    }

    return (
        <>
            <LayoutContent>
                <Route path={URL_PAGE.DASHBOARD} component={(props) => <DashboardMobile {...props} title="Trang chủ"/>} />
                <Route path={URL_PAGE.CERTIFICATE} component={(props) => <CertificateMobile {...props} title="Chứng nhận"/>} />
                <Route path={URL_PAGE.PROFILE} component={(props) => <ProfileMobile {...props} title="Tài khoản"/>} />
                <Route path={URL_PAGE.SERIES} component={(props) => <SeriesMobile {...props} title="Lộ trình"/>} />
                <Route path={URL_PAGE.SOCIAL} component={(props) => <SocialMobile {...props} title="Thảo luận"/>} />
                <Route path={URL_PAGE.EVENT} component={(props) => <EventMobile {...props} title="Sự kiện"/>} />
                <Route path={`${URL_PAGE.COURSE}/:id`} component={(props) => <CourseMobile {...props} title="Khóa học"/>} />
                <Route path={`detail-khoa-hoc/:idKhoaHoc`} component={(props) => <CourseMobile2 {...props} title="Chi tiết khóa học"/>} />
            </LayoutContent>
            <BottomBar />
        </>
    )
}

export default PrivateRouter;