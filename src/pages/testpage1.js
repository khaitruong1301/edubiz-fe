import React from 'react'
import { FacebookIcon, FacebookShareButton } from 'react-share'

export default function Testpage1() {
    return (
        <div>
            <FacebookShareButton
                url="https://www.facebook.com/lophocviet/photos/a.282287155292284/1886650121522638/"
                quote={"props.joke.setup + props.joke.punchline"}
                hashtag="#cybersoft">
                <FacebookIcon logoFillColor="white" />
            </FacebookShareButton>
        </div>
    )
}
