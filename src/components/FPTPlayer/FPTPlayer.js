import React, { Component } from "react";
import { Progress, Modal, Slider } from 'antd';
import HLSSource from "./HLSSource";
import { ControlBar, PlayToggle, Player, VolumeMenuButton, ProgressControl, CurrentTimeDisplay, DurationDisplay } from "video-react";
import { useMediaQuery } from "react-responsive";
import './video-react.css'
import './FPTPlayer.css';

let isPaused = false;

export default class FPTPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            muted: true,
            progress: 0,
            maxTime: 0,
            videoState: null
        };
        this.handleToggleMuted = this.handleToggleMuted.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.setLocalStorageTimeVideo = this.setLocalStorageTimeVideo.bind(this);
        this.getLocalStorageTimeVideo = this.getLocalStorageTimeVideo.bind(this);
        this.player = null;
    }

    componentDidMount() {
        this.props.setIsDisableHoanThanh(true);
        setTimeout(() => {
            if (this.player) {
                this.player.subscribeToStateChange(this.handleStateChange.bind(this));
                this.player.muted = true;
                this.setState({ muted: true });
                isPaused = false;
            }
        }, 500)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentLesson !== this.props.currentLesson) {
            this.props.setIsDisableHoanThanh(true);
            isPaused = false;
        }
    }

    handleStateChange(state, prevState) {
        const { progress } = this.state;
        // this.setLocalStorageTimeVideo(state.currentTime);
        const currentProgress = Math.ceil((state.currentTime / state.duration) * 100);
        this.setState({ progress: currentProgress, videoState: state });
        // CHẠY ĐƯỢC 50% VIDEO THÌ SHOW POPOUP XÁC NHẬN
        if (progress == 50 && !isPaused) {
            isPaused = true;
            this.showMessage(50);
        }
        else if (progress == 90) {
            this.props.setIsDisableHoanThanh(false);
        }
    }

    showMessage = (percent) => {
        this.player.pause();
        Modal.success({
            title: `Bạn đã hoàn thành ${percent}% bài học`,
            content: 'Hãy chắc chắn rằng bạn vẫn đang ngồi trước màn hình?',
            onOk: () => {
                this.player.play();
            }
        });
    }

    handleToggleMuted = () => {
        const muted = this.state.muted;
        this.setState({ muted: !muted })
        return () => {
            this.player.muted = !muted;
        };
    }

    handleTimeChange = (value) => {
        this.player.pause();
        const { videoState, maxTime, progress } = this.state;
        if (!videoState) return;

        // NẾU TUA LẦN ĐẦU
        if (maxTime == 0) {
            // TUA VỀ TRƯỚC
            if (value >= progress) {
                // KO CHO TUA 
                this.setState({ progress: progress });
            }
            else { // TUA VỀ SAU
                this.setState({ maxTime: progress }); // LƯU LẠI THỜI GIAN LÚC CHƯA TUA
                const seekTime = Math.floor((value * videoState.duration)) / 100;
                this.player.seek(seekTime);
                this.player.pause();
            }
        }
        // NẾU TUA TỪ LẦN THỨ 2 NGƯỜI DÙNG ĐÃ XEM QUA MAX TIME CŨ => UPDATE LẠI MAX TIME
        else if(progress > maxTime){ 
            this.setState({ maxTime: progress });
            if (value >= progress){ // KO CHO TUA VỀ TRƯỚC
                this.setState({ progress: progress });
            }
            else { // TUA VỀ SAU
                const seekTime = Math.floor((value * videoState.duration)) / 100;
                this.player.seek(seekTime);
                this.player.pause();
            }
        }
        else if(value > maxTime){
            this.setState({ progress: maxTime });
        }
        else{
             const seekTime = Math.floor((value * videoState.duration)) / 100;
                this.player.seek(seekTime);
                this.player.pause();
        }

    }

    // CẬP NHẬT TIME VIDEO
    setLocalStorageTimeVideo = (currentTime) => {
        const currenId = this.props.currentLesson.id;
        const strTimeVideoLession = localStorage.getItem('TIME_VIDEO_LESSION');

        let arrTimeVideoLession = [];
        if (!strTimeVideoLession) {
            arrTimeVideoLession = [...arrTimeVideoLession, { lessionId: currenId, timeVideo: currentTime }];
            localStorage.setItem("TIME_VIDEO_LESSION", JSON.stringify(arrTimeVideoLession));
        }
        else {
            arrTimeVideoLession = JSON.parse(strTimeVideoLession);
            // TÌM XEM BÀI HỌC ĐÃ CÓ TRONG LOCAL STORAGE CHƯA
            const timeVideoLession = arrTimeVideoLession.find(item => parseInt(item.lessionId) == parseInt(currenId));
            if (!timeVideoLession) { // CHƯA CÓ THÌ THÊM VÀO
                arrTimeVideoLession = [...arrTimeVideoLession, { lessionId: currenId, timeVideo: currentTime }];
                localStorage.setItem("TIME_VIDEO_LESSION", JSON.stringify(arrTimeVideoLession));
            }
            else { // CÓ RỒI THÌ SỬA LẠI
                const newArray = arrTimeVideoLession.map(item => {
                    if (item.lessionId != currenId) return item;
                    return { ...item, timeVideo: currentTime }
                })
                localStorage.setItem("TIME_VIDEO_LESSION", JSON.stringify(newArray));
            }
        }


    }

    // LẤY TIME CỦA VIDEO ĐÃ XEM Ở LẦN TRƯỚC => ĐỂ LOAD VIDEO ĐẾN THỜI ĐIỂM CŨ 
    // (XEM ĐẾN ĐÂU GIỜ LOAD ĐẾN ĐÓ, TRÁNH PHẢI XEM LẠI)
    getLocalStorageTimeVideo = () => {
        const currenId = this.props.currentLesson.id;
        const strTimeVideoLession = localStorage.getItem('TIME_VIDEO_LESSION');
        if (!strTimeVideoLession)
            return 0;

        const arrTimeVideoLession = JSON.parse(strTimeVideoLession);
        const timeVideoLession = arrTimeVideoLession.find(item => parseInt(item.lessionId) == parseInt(currenId));
        if (!timeVideoLession) return 0;

        return timeVideoLession.timeVideo;
    }

    render() {
        const { muted, progress } = this.state;
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

                            <ControlBar className="ControlBarCustom">
                                <PlayToggle />
                                <VolumeMenuButton disabled />
                                <CurrentTimeDisplay disabled />
                                <DurationDisplay disabled />
                                <ProgressControl disabled />
                                <div className="ControlBarCustomVolumn" onClick={(this.handleToggleMuted)}>
                                    <i className={muted ? "fa fa-volume-up" : "fa fa-volume-off"} aria-hidden="true"></i>
                                </div>
                                <div className="ControlBarCustomProgress">
                                    <Slider
                                        value={progress}
                                        min={0} max={100}
                                        style={{ width: 250 }}
                                        onChange={(value) => this.handleTimeChange(value)}
                                    />
                                    <span>{progress}%</span>
                                </div>
                            </ControlBar>

                        </Player>
                        : null
                }
            </div>
        )
    }
}