import React from "react";
import environment from '../../../environments/environment'
function ImageSection({ section }) {
    const title = section.title ?? '<h2></h2>';
    return (
        <div className="col-12 mobile-section">
            <div className="mobile-section-title">
                <div className="mobile-section-title-text" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            <div className="mobile-section-image">
                {
                    section.image ?
                        <img src={environment.baseUrl + section.image} style={{ maxWidth: '100%' }} />
                        : <></>}
            </div>
        </div>
    )
}

export default ImageSection;