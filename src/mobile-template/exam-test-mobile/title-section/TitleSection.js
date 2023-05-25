import React from "react";
function TitleSection({ section }) {
    const title = section.title ?? '<h2></h2>';
    return (
        <div className="col-12 mobile-section">
            <div className="mobile-section-title">
                <div className="mobile-section-title-text" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            {
                !section.description ? <></> :
                    <div className="mobile-section-desc" dangerouslySetInnerHTML={{ __html: section.description }}></div>
            }
        </div>
    )
}

export default TitleSection;