import React, { useState } from "react";
import './TabChart.css'

export default function TabChart(props) {
    const { tabs, onClick } = props;
    const [tabIndex, setTabIndex] = useState(0);
    
    const handleTabClick = (index) => {
        setTabIndex(index);
        onClick(index)
    }

    return (
        <div className="tabchart">
            <div className="tabchart-wrapper">
                <div className="tabchart-head">
                    {
                        tabs.length ? tabs.map((tabItem, index) => {
                            const className = index == tabIndex ? "tabchart-head_item active" : "tabchart-head_item";
                            return <div key={index} className={className} onClick={(e) => handleTabClick(index)}>
                                {tabItem}
                            </div>
                        }) : ""
                    }
                </div>
            </div>
        </div>
    )
}