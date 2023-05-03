import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import { URL_PAGE } from "..";

export default function NavBar({ title, isPrev }) {
    return (
        <div className="navbar">
            <div className="navbar-item navbar-prev">
                { isPrev ? <i className="fa fa-arrow-left" aria-hidden="true"></i> : <></> }
            </div>
            <div className="navbar-item navbar-title">
                { title }
            </div>
            <div className="navbar-item navbar-icon">
                <Link to={URL_PAGE.EVENT} className="navbar-icon_alert">
                    <span>5</span>
                    <span><i className="fa fa-bell" aria-hidden="true"></i></span>
                </Link>
                <Link to={URL_PAGE.SOCIAL} className="navbar-icon_chat">
                    <span>10</span>
                    <span><i className="fa fa-comment" aria-hidden="true"></i></span>
                </Link>
                
            </div>
        </div>
    )
}