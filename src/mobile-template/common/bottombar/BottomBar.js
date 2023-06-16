import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { URL_PAGE } from '../index'
import './BottomBar.css'

export default function BottomBar() {
    const [active, setActive] = useState(URL_PAGE.DASHBOARD);

    const menus = [
        { id: URL_PAGE.SERIES, title: 'Lộ trình', icon: 'fa fa-list-ol' },
        { id: URL_PAGE.CERTIFICATE, title: 'Chứng nhận', icon: 'fa fa-graduation-cap' },
        { id: URL_PAGE.DASHBOARD, title: 'Trang chủ', icon: 'fa fa-home' },
        { id: URL_PAGE.EXAM_TEST, title: 'Đánh giá', icon: 'fa fa-users' },
        { id: URL_PAGE.PROFILE, title: 'Tôi', icon: 'fa fa-user' }
    ]

    useEffect(() => {
        setActive(window.location.pathname)
    }, [window.location.pathname]);

    const handleClick = (id) => {
        setActive(id)
    }

    return (
        <div className="bottombar">
            {
                menus.map((menu, index) => {
                    const className = active == menu.id ? "bottombar-item active" : "bottombar-item";
                    return <Link key={index} to={menu.id} className={className} onClick={((e) => handleClick(menu.id))}>
                        <div className="bottombar-item_icon">
                            <i className={menu.icon} aria-hidden="true"></i>
                        </div>
                        <div className="bottombar-item_title">
                            { menu.title }
                        </div>
                    </Link>
                })
            }
        </div>
    )
}