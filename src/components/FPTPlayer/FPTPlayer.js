import React, { Component } from "react";
import { Progress, Modal } from 'antd';
import './FPTPlayer.css'
import HLSSource from "./HLSSource";
import { ControlBar, Player } from "video-react";
import { useMediaQuery } from "react-responsive";

export default class FPTPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            muted: false,
            play: false,
            progress: 0,
            fullScreen: false,
            isShowQuestion: false
        };
        this.handlePause = this.handlePause.bind(this);
        this.handlePlay = this.handlePlay.bind(this);
        this.toggleMuted = this.toggleMuted.bind(this);
        this.checkFollowScreen = this.checkFollowScreen.bind(this);
        this.player = null;
    }

    componentDidMount() {
        this.props.setIsDisableHoanThanh(true)
        setTimeout(() => {
            if (this.player) {
                this.player.subscribeToStateChange(this.handleStateChange.bind(this));
                this.setState({ play: true });
            }
        }, 1000)
    }

    handleStateChange(state, prevState) {
        const progress = Math.ceil((state.currentTime / state.duration) * 100);
        this.setState({ progress: progress });
        // CHẠY ĐƯỢC 50% VIDEO THÌ SHOW OPOUP XÁC NHẬN
        if (progress == 50 && !this.state.isShowQuestion) {
            this.showMessage(40);
        }
        else if (progress == 60) {
            this.setState({ isShowQuestion: false });
        }
        else if (progress == 90)
            this.props.setIsDisableHoanThanh(false);
    }

    showMessage = (percent) => {
        this.player.pause();
        this.setState({ play: false, isShowQuestion: true });
        const confirm = Modal.success({
            title: `Bạn đã hoàn thành ${percent}% bài học`,
            content: 'Hãy chắc chắn rằng bạn vẫn đang ngồi trước màn hình?',
            onOk: () => {
                this.player.play();
                this.setState({ play: true })
            }
        });
        setTimeout(() => {
            this.checkFollowScreen(confirm);
        }, 10000);
    }

    checkFollowScreen = (confirm) => {
        if (!this.state.play) {
            this.player.seek(0);
            confirm.destroy();
            this.setState({ progress: 0, isShowQuestion: false });
        }
    }

    handleFullScreen = () => {
        this.player.toggleFullscreen()
    }

    // toggleFullScreen = () => {
    //     var el = document.querySelector(".fpt-player");
    //     if (el.requestFullscreen) {
    //         el.requestFullscreen();
    //     } else if (el.msRequestFullscreen) {
    //         el.msRequestFullscreen();
    //     } else if (el.mozRequestFullScreen) {
    //         el.mozRequestFullScreen();
    //     } else if (el.webkitRequestFullscreen) {
    //         el.webkitRequestFullscreen();
    //     }
    // };

    handlePause = () => {
        this.player.pause();
        this.setState({ play: false })
    }

    handlePlay = () => {
        this.player.play();
        this.setState({ play: true })
    }

    toggleMuted = () => {
        const muted = this.state.muted;
        this.setState({ muted: !muted })
        return () => {
            this.player.muted = !muted;
        };
    }


    render() {
        return (
            <div className="FPTPlayer">
                {
                    this.props.source ?
                        <Player
                            ref={player => {
                                this.player = player;
                            }}
                            playsInline
                            fluid={false}
                            width={"100%"}
                            autoPlay={true}
                            className='fpt-player'
                        >

                            <HLSSource
                                isVideoChild
                                src={this.props.source}
                            />
                            <ControlBar disableDefaultControls={true} />

                        </Player>
                        : null
                }
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