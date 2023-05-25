import React, { useEffect, useState } from 'react'
import httpServ from '../../../services/http.service';
import { Player, ControlBar, PlaybackRateMenuButton } from 'video-react';
import FPTHLSSource from './FPTHLSSource'; 

import { Anchor } from 'antd';

export default function FPTVideoPlayer({ source }) {

    const [fptSource, setFptSource] = useState('');

    useEffect(() => {
        httpServ.getUrlVideo_FPT(source)
        .then(res => {
            setFptSource(res.data);
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <div >
            <Anchor>
                {fptSource ?
                    <Player playsInline fluid={false} width={"100%"} height={550}>

                        <FPTHLSSource
                            isVideoChild
                            src={fptSource}
                        />
                        <ControlBar>
                            <PlaybackRateMenuButton rates={[3, 2.5, 2, 1.5, 1]} order={10} />
                        </ControlBar>

                    </Player>
                    : ""}

            </Anchor>
        </div>
    )
}