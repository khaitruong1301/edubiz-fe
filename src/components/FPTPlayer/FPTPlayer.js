import React, { Component } from "react";
import ReactPlayer from "react-player";
import { Progress, Modal } from 'antd';
import { findDOMNode } from 'react-dom'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import './FPTPlayer.css'
export default class FPTPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            duration: 0,
            muted: false,
            play: false,
            progress: 0,
            fullScreen: false,
            isShowQuestion: false
        };

        this.playerRef = React.createRef(null);
        this.checkFollowScreen = this.checkFollowScreen.bind(this);
    }

    onDuration = (duration) => {
        this.setState({
            duration: duration
        })
    }

    onProgress = (time) => {
        const progress = Math.ceil((time / this.state.duration) * 100);
        this.setState({ progress: progress });
        if (progress == 4 && !this.state.isShowQuestion) {
            this.showMessage(40);
        }
        else if (progress == 50) {
            this.setState({ isShowQuestion: false });
        }
        else if (progress == 15 && !this.state.isShowQuestion) {
            this.showMessage(70);
        }
        else if (progress == 80) {
            this.setState({ isShowQuestion: false });
        }
        else if (progress == 90)
            this.props.setIsDisableHoanThanh(false);
    }

    showMessage = (percent) => {
        this.setState({ play: false, isShowQuestion: true });
        const confirm = Modal.success({
            title: `Bạn đã hoàn thành ${percent}% bài học`,
            content: 'Hãy chắc chắn rằng bạn vẫn đang ngồi trước màn hình?',
            onOk: () => {
                this.setState({ play: true })
            }
        });
        setTimeout(() => {
            this.checkFollowScreen(confirm);
        }, 5000);
    }

    checkFollowScreen = (confirm) => {
        if(!this.state.play){
            this.playerRef.current.seekTo(0);
            confirm.destroy();
            this.setState({ progress: 0, isShowQuestion: false });
        }
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
        else {
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
        // const display = this.state.isShow ? 'flex' : 'none'
        return (
            <div className="FPTPlayer"
            // onMouseEnter={(this.setState({ isShow: true }))}
            // onMouseLeave={(this.setState({ isShow: false }))}
            >
                <ReactPlayer
                    ref={this.playerRef}
                    playsinline={true}
                    playbackRate={1}
                    playing={this.state.play}
                    url={this.props.source}
                    width="100%"
                    height="100%"
                    controls={false}
                    onDuration={(e) => this.onDuration(e)}
                    onProgress={(e) => this.onProgress(e.playedSeconds)}
                    muted={this.state.muted}
                    volume={1}
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
                            this.state.muted ? <span><i className="fa fa-volume-off" aria-hidden="true"></i></span>
                                : <span><i className="fa fa-volume-up" aria-hidden="true"></i></span>
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