import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './NavBar.css'
import { URL_PAGE } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../../redux/reducer/historyReducer";

export default function NavBar({ title }) {
    const dispatch = useDispatch();
    const history = useSelector(state => state.history);
    const [historyState, setHistoryState] = useState(history.content);

    useEffect(() => {
        if(window.location.pathname == URL_PAGE.DASHBOARD){
            setHistoryState({ prevUrl: "", title: title });
        }
        else{
            setHistoryState(history.content);
        }
        dispatch(setHistory({
            prevUrl: window.location.pathname,
            title: title
        }))
    }, [])

    return (
        <div className="navbar">
            {
                historyState.prevUrl ? <Link to={historyState.prevUrl} className="navbar-item navbar-prev">
                    <i className="fa fa-arrow-left" aria-hidden="true"></i>
                </Link> : <div className="navbar-item navbar-prev"></div>
            }
            <div className="navbar-item navbar-title">
                {title}
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