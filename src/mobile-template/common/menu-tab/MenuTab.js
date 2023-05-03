import React, { useState } from "react";
import './MenuTab.css'

export default function MenuTab(props) {
    const { children } = props;
    const [menuIndex, setMenuIndex] = useState(1);

    const handleTabClick = (index) => {
        setMenuIndex(index);
    }

    return (
        <div className="menutab">
            <div className="menutab-wrapper">
                <div className="menutab-head">
                    {
                        children && children.length ? children.map((item, index) => {
                            const { title, tabIndex } = item.props;
                            const className = tabIndex == menuIndex ? "menutab-head_item active" : "menutab-head_item";
                            return <div key={index} className={className} onClick={(e) => handleTabClick(tabIndex)}>
                                {title}
                            </div>
                        }) : ""
                    }
                </div>
                <div className="menutab-body">
                    {
                        children && children[menuIndex - 1] ? children[menuIndex - 1].props.children : ""
                    }
                </div>
            </div>
        </div>
    )
}