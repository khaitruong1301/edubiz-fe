import React from "react";
import FPTVideoPlayer from "../../common/video-player/FPTVideoPlayer";

function VideoSection({ section }) {
    const title = section.title ?? '<h2></h2>';
    const youtube = section.youtube ? section.youtube.replace('https://youtu.be/', '') : '';
    return (
        <div className="col-12 mobile-section">
            <div className="mobile-section-title">
                <div className="mobile-section-title-text" dangerouslySetInnerHTML={{ __html: title }}></div>
            </div>
            <div className="mobile-section-video">
                {section.video ? <FPTVideoPlayer source={section.video} /> : <></>}
            </div>
            {
                !youtube ? <></> :
                    <div className="mobile-section-youtube">
                        <iframe
                            width="853"
                            height="480"
                            src={`https://www.youtube.com/embed/${youtube}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    </div>
            }
        </div>
    )
}

export default VideoSection;