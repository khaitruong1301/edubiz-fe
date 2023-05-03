import React, { useState } from "react";
import './TabMobile.css'

export default function TabMobile(props) {
    const { tabs, defaultIndex} = props;
    const [tabIndex, setTabIndex] = useState(defaultIndex ?? 0);
    
    const handleTabClick = (index) => {
        setTabIndex(index);
    }

    return (
        <div className="tabmobile">
            <div className="tabmobile-wrapper">
                <div className="tabmobile-head">
                    {
                        tabs.length ? tabs.map((tabItem, index) => {
                            const className = index == tabIndex ? "tabmobile-head_item active" : "tabmobile-head_item";
                            return <div key={index} className={className} onClick={(e) => handleTabClick(index)}>
                                {tabItem.title}
                            </div>
                        }) : ""
                    }
                </div>
                <div className="tabmobile-content">
                    {
                        tabs.length && tabs[tabIndex] ? tabs[tabIndex].component : ""
                    }
                </div>
            </div>
        </div>
    )
}