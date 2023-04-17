import React, { Fragment, useState, useEffect } from 'react';
import { Checkbox } from 'antd';
import { Player, ControlBar, ReplayControl, PlaybackRateMenuButton } from 'video-react';
import HLSSource from './HLSSource';
import { connect } from 'react-redux';
import {
    CAP_NHAT_LICH_SU_HOC_TAP,
    LAY_LICH_SU_TUONG_TAC,
    LAY_LICH_SU_HOC_TAP
} from '../../redux/types/ActionsTypes';
import { themLichSu } from '../../commons/user/UserServices';
import './VideoPlayer.css';
import { Mark_Video } from './Mark_Video';
import Vimeo from '@u-wave/react-vimeo';


// bien tham chieu de setinterval chay 1 lan
let checkRun = { status: false };

let showGhiChu = true;

function VideoPlayer(props) {

    //create mark video
    Mark_Video(props.mark_video, checkRun);

    const [hoanThanh, setHoanThanh] = useState(props.checked);

    useEffect(() => {


        setHoanThanh(props.checked);
    })

    const onChange = (e) => {
        const { checked } = e.target;
        const { lichSuHocTap, baiHoc, dsTatCaBaiHoc, khoaHoc, dsLichSu } = props;
        let tongThoiGianHoc = lichSuHocTap.tongThoiGianHoc ?? 0;
        let tongSoBaiDaHoc = lichSuHocTap.tongSoBaiDaHoc ?? 0;
        let mucDoHoanThanh = lichSuHocTap.mucDoHoanThanh ?? 0;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'))

        let dsBaiDaHoc = lichSuHocTap.danhSachBaiDaHoc ? JSON.parse(lichSuHocTap.danhSachBaiDaHoc) : [];

        if (checked) {
            dsBaiDaHoc.push(props.baiHoc.id);
            tongThoiGianHoc = tongThoiGianHoc + baiHoc.thoiLuong;
            tongSoBaiDaHoc = tongSoBaiDaHoc + 1;
            mucDoHoanThanh = parseInt(tongSoBaiDaHoc / dsTatCaBaiHoc.length * 100);

        }
        else if (dsBaiDaHoc.findIndex(x => x === props.baiHoc.id) !== -1) {
            dsBaiDaHoc = dsBaiDaHoc.filter(x => x !== props.baiHoc.id);
            tongThoiGianHoc = tongThoiGianHoc - baiHoc.thoiLuong;
            tongSoBaiDaHoc = tongSoBaiDaHoc - 1;
            mucDoHoanThanh = parseInt(tongSoBaiDaHoc / dsTatCaBaiHoc.length * 100);
        }

        props.dispatch({
            type: CAP_NHAT_LICH_SU_HOC_TAP, payload: {
                model: {
                    id: lichSuHocTap.id ? lichSuHocTap.id : 0,
                    hoTen: nguoiDung.hoTen,
                    biDanh: nguoiDung.hoTen,
                    maNguoiDung: nguoiDung.id,
                    maKhoaHoc: khoaHoc.id,
                    danhSachBaiDaHoc: JSON.stringify(dsBaiDaHoc),
                    tongThoiGianHoc: tongThoiGianHoc,
                    tongSoBaiDaHoc: tongSoBaiDaHoc,
                    mucDoHoanThanh: mucDoHoanThanh
                }
            }
        });
        setHoanThanh(checked);
    }

    const onChangeVideo = (type) => {
        props.onChangeVideo(type);
    }

    const hienGhiChu = () => {
        let div_ghichu = document.getElementsByClassName("div_video_ghichu")[0];
        if (showGhiChu) {
            showGhiChu = false;
            div_ghichu.removeAttribute("hidden");
        }
        else {
            showGhiChu = true;
            div_ghichu.setAttribute("hidden", " ");
        }

    }

    var HtmlToReactParser = require('html-to-react').Parser;
    var htmlToReactParser = new HtmlToReactParser();

    let userNuocNgoai = false;
    let maNhomQuyen = "USER";

    if (!props.hideDone) {
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
        userNuocNgoai = nguoiDung.nuocNgoai;

        maNhomQuyen = nguoiDung.maNhomQuyen;
    }


    return (
        <Fragment>

            {userNuocNgoai || props.sNuocNgoai==true ?
            
                <Vimeo
                    video={props.baiHoc.video != "" && props.baiHoc.video != null ? props.baiHoc.video : "0"}
                    autoplay
                    speed={true}
                    responsive={true}

                />

                // <iframe src={props.baiHoc.video != "" && props.baiHoc.video != null ? "https://player.vimeo.com/video/" + props.baiHoc.video : "0"} width="100%" height="600" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>

                :
                <Player playsInline fluid={false} width={"100%"} height={550}>
                    <button onClick={() => onChangeVideo('PREV')} className="video_prev" >
                        <i style={{ fontSize: '0.8rem' }} className="fa fa-chevron-left"></i>
                    </button>
                    <button onClick={() => onChangeVideo('NEXT')} disabled={!hoanThanh} className="video_next">
                        <i style={{ fontSize: '0.8rem' }} className="fa fa-chevron-right"></i>
                    </button>
                    <HLSSource
                        isVideoChild
                        src={props.src}
                    />
                    <ControlBar>
                        <PlaybackRateMenuButton rates={[2, 1.5, 1.25, 1, 0.75, 0.5]} order={10} />
                    </ControlBar>

                </Player>

            }
            {
                props.hideDone ?

                    ""
                    :

                    <div className="video-bottom-bar">
                        <div className="video-button">
                            {/* <button onClick={() => onChangeVideo('PREV')}>
                        <i style={{ fontSize: '0.8rem' }} className="fa fa-fast-backward"></i>
                    </button>
                    <button onClick={() => onChangeVideo('NEXT')}
                disabled={!hoanThanh} className={hoanThanh ? '' : 'disabled'}>
                    <i style={{ fontSize: '0.8rem' }} className="fa fa-fast-forward"></i>
                </button> */}
                            {props.baiHoc.ghiChu != "" ? <button className="btn btn-light" onClick={() => hienGhiChu()}>Ghi chú</button> : ""}

                        </div>
                        <div className="video-checkbox">
                            {maNhomQuyen == "USER" ? !hoanThanh ? <Checkbox onChange={onChange} checked={hoanThanh}>Hoàn thành</Checkbox> : <span style={{ color: "white" }}>Đã hoàn thành</span> : ""}
                        </div>

                    </div>
            }
            <div className="div_video_ghichu" hidden>
                {props.baiHoc.ghiChu != "" ? htmlToReactParser.parse(props.baiHoc.ghiChu) : ""}
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap
    }

}

export default connect(mapStateToProps)(VideoPlayer)
