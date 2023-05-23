import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Progress } from 'antd';
import { findDOMNode } from 'react-dom'
import './FPTPlayer.css'
export default class FPTPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            muted: true,
            play: false,
            progress: 0,
            fullScreen: false
        };

        this.playerRef = React.createRef(null);
    }

    onDuration = (duration) => {
        this.setState({
            duration: duration
        })
    }

    onProgress = (time) => {
        const progress = Math.ceil((time / this.state.duration) * 100);
        this.setState({ progress: progress })
        if (progress > 90)
            this.props.seIsDisableHoanThanh(false);
        else
            this.props.seIsDisableHoanThanh(true);
    }

    handleFullScreen = () => {
        const el = this.playerRef.current;
        if (!this.state.fullScreen) {
            if (typeof document.fullscreenElement !== "undefined") {
                findDOMNode(el).requestFullscreen();
            } else if (typeof document.mozFullScreenElement !== "undefined") {
                findDOMNode(el).mozRequestFullScreen();
            } else if (typeof document.msFullscreenElement !== "undefined") {
                findDOMNode(el).msRequestFullscreen();
            } else if (typeof document.webkitFullscreenElement !== "undefined") {
                findDOMNode(el).webkitRequestFullscreen();
            } else {
                console.log("fullscreenElement is not supported by this browser")
            }
            this.setState({ fullScreen: true })
        }
        else{
            document.exitFullscreen();
            this.setState({ fullScreen: false })
        }
    }

    handlePause = () => {
        this.setState({ play: false });
    }

    handlePlay = () => {
        this.setState({ play: true });
    }

    toggleMuted = () => {
        this.setState({ muted: !this.state.muted });
    }

    render() {
        return (
            <div className="FPTPlayer">
                <ReactPlayer
                    ref={this.playerRef}
                    playsinline={true}
                    playbackRate={1}
                    playing={this.state.play}
                    url={this.props.source}
                    width="100%"
                    height="100%"
                    controls={false}
                    onSeek={(e) => this.onSeek(e)}
                    onDuration={(e) => this.onDuration(e)}
                    onProgress={(e) => this.onProgress(e.playedSeconds)}
                    muted={this.state.muted}

                    config={{
                        file: {
                            forceHLS: true,
                        },
                    }}
                />
                <div className="FPTPlayerBar">
                    <div className="FPTPlayerBarItem">
                        {
                            !this.state.play ? <span onClick={(this.handlePlay)}>
                                <i className="fa fa-play" aria-hidden="true"></i>
                            </span> :
                                <span onClick={(this.handlePause)}>
                                    <i className="fa fa-pause" aria-hidden="true"></i>
                                </span>
                        }
                    </div>
                    <div className="FPTPlayerBarItem" onClick={(this.toggleMuted)}>
                        {
                            this.state.muted ? <span><i className="fa fa-volume-up" aria-hidden="true"></i></span>
                                : <span><i className="fa fa-volume-off" aria-hidden="true"></i></span>
                        }
                    </div>
                    <div className="FPTPlayerBarItem FPTPlayerBarSlider ">
                        <Progress percent={this.state.progress} size="small" />
                    </div>
                    <div className="FPTPlayerBarItem" onClick={(this.handleFullScreen)}>
                        <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        )
    }
}