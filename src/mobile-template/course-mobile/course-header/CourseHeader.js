import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CourseHeader.css'
import { useDispatch, useSelector } from "react-redux";
import { setHistory } from "../../../redux/reducer/historyReducer";

export default function CourseHeader({ title, toggleLession, onToggleLession, onToggleCourse }) {

    const dispatch = useDispatch();
    const history = useSelector(state => state.history);
    const [historyState, setHistoryState] = useState(history.content);

    useEffect(() => {
        setHistoryState(history.content);
        dispatch(setHistory({
            prevUrl: window.location.pathname,
            title: title
        }))
    }, [])

    return (
        <div className="courseheader">
            <Link to={historyState.prevUrl} className="courseheader-item courseheader-prev">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <div className="courseheader-item courseheader-title">
                {title}
            </div>
            <div className="courseheader-item courseheader-icon">
                {/* <div className="courseheader-icon_course">
                    <i className="fa fa-book" aria-hidden="true"></i>
                </div>
                <div className="courseheader-icon_lession" onClick={(onToggleLession)}>
                    <i className={`fa ${toggleLession ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                </div> */}
            </div>
        </div>
    )
}