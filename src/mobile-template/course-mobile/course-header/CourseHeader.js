import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './CourseHeader.css'

export default function CourseHeader({ title, toggleLession, onToggleLession, onToggleCourse }) {
    return (
        <div className="courseheader">
            <Link to="/course/9" className="courseheader-item courseheader-prev">
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </Link>
            <div className="courseheader-item courseheader-title">
                {title}
            </div>
            <div className="courseheader-item courseheader-icon">
                <div className="courseheader-icon_course">
                    <i className="fa fa-book" aria-hidden="true"></i>
                </div>
                <div className="courseheader-icon_lession" onClick={(onToggleLession)}>
                    <i className={`fa ${toggleLession ? 'fa-times' : 'fa-bars'}`} aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}