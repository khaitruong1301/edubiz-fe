import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './NavBar.css'
import { URL_PAGE } from "..";
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../../redux/reducer/historyReducer";
import httpServ from "../../../services/http.service";
import { setAllThongBao } from "../../../redux/reducer/thongBaoReducer";

export default function NavBar({ title }) {
    const dispatch = useDispatch();
    const navigate = useHistory();
    const history = useSelector(state => state.history);
    const { allThongBao } = useSelector((state) => state.thongBao);
    const { userInfor } = useSelector((state) => state.authUser);

    const [historyState, setHistoryState] = useState(history.content);

    let newThongBao = allThongBao?.filter((item) => {
        return item.daXem === false;
    });

    useEffect(() => {
        if (window.location.pathname == URL_PAGE.DASHBOARD) {
            setHistoryState({ prevUrl: "", title: title });
        }
        else {
            setHistoryState(history.content);
        }
        dispatch(setHistory({
            prevUrl: window.location.pathname,
            title: title
        }))
        handleFetch();
    }, [])

    const handleFetch = () => {
        httpServ
            .getAllThongBao(userInfor.id)
            .then((res) => {
                dispatch(setAllThongBao(res.data.content));
            })
            .catch((err) => {
                // console.log(err);
            });
    };

    const handleNavigate = (e) => {
        e.preventDefault();
        httpServ
            .getChangeStatusThongBao(userInfor.id)
            .then((res) => {
                // console.log(res);
                handleFetch();
                navigate.push(URL_PAGE.EVENT);
            })
            .catch((err) => {
            });

    }

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
                <Link onClick={(handleNavigate)} className="navbar-icon_alert">
                    {newThongBao.length ? <span>{newThongBao.length}</span> : <span></span>}
                    <span><i className="fa fa-bell" aria-hidden="true"></i></span>
                </Link>
                <Link to={URL_PAGE.SOCIAL} className="navbar-icon_chat">
                    {/* <span>10</span> */}
                    <span></span>
                    <span><i className="fa fa-comment" aria-hidden="true"></i></span>
                </Link>

            </div>
        </div>
    )
}