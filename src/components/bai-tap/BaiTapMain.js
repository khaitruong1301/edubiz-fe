import React, { Component, Fragment } from 'react';
import { Button, Modal, message, Progress, Result } from 'antd';
import SingleChoose from './SingleChoose';
import MutipleChoose from './MultipleChoose';
import './BaiTapMain.css';
import SortingQuiz from './SortingQuiz';
import EnterQuiz from './EnterQuiz';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CAP_NHAT_BAI_DA_HOC, CAP_NHAT_LICH_SU_HOC_TAP, LAY_DANH_SACH_NOP_BAI } from '../../redux/types/ActionsTypes';
import imgReadyQuiz from '../../assets/math_quiz.png';
import { luuNopBai, GetTimeLamLai } from '../../commons/user/UserServices';

var x = "";
class BaiTapMain extends Component {

    state = {
        baiTap: {},
        dsKetQua: [],
        daLamBai: false,
        dsBaiTap: [],
        dsBaiHocLienQuan: [],
        viTri: 0,
        process: 0,
        checkBaiHoc: [],
    }
    static getDerivedStateFromProps(props, state) {
        const { baiHoc } = props;

        if (baiHoc != state.checkBaiHoc) {
            const dsBaiTap = baiHoc.noiDung ? JSON.parse(baiHoc.noiDung) : [];

            return {
                baiTap: dsBaiTap[0], dsBaiTap, checkBaiHoc: baiHoc, dsKetQua: [], viTri: 0, process: 0, daLamBai: false
            }
        }

    }
    componentDidMount = () => {

        const { baiHoc } = this.props;
        const dsBaiTap = baiHoc.noiDung ? JSON.parse(baiHoc.noiDung) : [];
        const dsBaiHocLienQuan = baiHoc.baiHocLienQuan ? JSON.parse(baiHoc.baiHocLienQuan) : [];
        if (dsBaiTap.length > 0) {
            this.setState({ baiTap: dsBaiTap[0], dsBaiTap, dsBaiHocLienQuan, checkBaiHoc: baiHoc });
        }

        //lay danh sach nop bai
        this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })
    }

    onChange = (ketQua) => {
        const { viTri, dsKetQua } = this.state;
        if (viTri < dsKetQua.length) {
            dsKetQua[viTri] = ketQua;
        }
        else {
            dsKetQua.push(ketQua);
        }
        this.setState({ dsKetQua, daLamBai: true });
    }

    onNopBai = () => {
        var div_loading = document.getElementsByClassName("div_loading");
        document.getElementsByClassName("btn-nopbai")[0].setAttribute("hidden","");
        div_loading[0].removeAttribute("hidden", "");

        const { dsBaiTap, dsBaiHocLienQuan, dsKetQua, daLamBai } = this.state;
        if (!daLamBai) return Modal.warning({
            title: 'Vui lòng chọn đáp án của câu hỏi!'
        });

        let demCauDung = 0;
        let soDiem = 0;
        for (let i = 0; i < dsKetQua.length; i++) {
            if (dsKetQua[i] === true) demCauDung++;
        }

        soDiem = demCauDung / dsBaiTap.length * 100;

        const { baiHoc, lichSuHocTap, dsTatCaBaiHoc, dsNopBai } = this.props;

        let model = {
            nguoiDungId: lichSuHocTap.maNguoiDung,
            baiHocId: baiHoc.id,
            baiLam: demCauDung,
            diem: Math.round(soDiem),
            nguoiCham: "",
            nhanXet: "Số câu trả lời đúng: " + demCauDung + " / " + dsBaiTap.length + " câu",
            hanNopBai: new Date()
        }

        let kiemTraNopBai = [];
        if (lichSuHocTap)
            kiemTraNopBai = dsNopBai.find(n => n.nguoiDungId == lichSuHocTap.maNguoiDung && n.baiHocId == baiHoc.id);
        
        //xu ly lam trac nghiem < 50 diem
        if (soDiem < 50) {
            if (!kiemTraNopBai) {
                model.nguoiCham = "LAMLAI";

                luuNopBai(model).then(res => {

                    //load lai bai nop de kiem tra
                    this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })
                    div_loading[0].setAttribute("hidden", "");

                    this.setState({ process: 100 });
                }).catch(err => { message.error("Không nộp bài được !"); div_loading[0].setAttribute("hidden", ""); console.log(err); });
            }

        } else {
            //kiem tra ton tai
            if (!kiemTraNopBai) {

                luuNopBai(model).then(res => {

                    //cap nhat lich su hoc tap
                    const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'))
                    let tongThoiGianHoc = lichSuHocTap.tongThoiGianHoc ?? 0;
                    let tongSoBaiDaHoc = lichSuHocTap.tongSoBaiDaHoc ?? 0;
                    let mucDoHoanThanh = lichSuHocTap.mucDoHoanThanh ?? 0;
                    let dsBaiDaHoc = lichSuHocTap.danhSachBaiDaHoc ? JSON.parse(lichSuHocTap.danhSachBaiDaHoc) : [];
                    dsBaiDaHoc.push(baiHoc.id);
                    tongThoiGianHoc = tongThoiGianHoc;
                    tongSoBaiDaHoc = tongSoBaiDaHoc + 1;
                    mucDoHoanThanh = parseInt(tongSoBaiDaHoc / dsTatCaBaiHoc.length * 100);
                    this.props.dispatch({
                        type: CAP_NHAT_LICH_SU_HOC_TAP, payload: {
                            model: {
                                id: lichSuHocTap.id ? lichSuHocTap.id : 0,
                                hoTen: nguoiDung.hoTen,
                                biDanh: nguoiDung.hoTen,
                                maNguoiDung: nguoiDung.id,
                                maKhoaHoc: lichSuHocTap.maKhoaHoc ? lichSuHocTap.maKhoaHoc : 0,
                                danhSachBaiDaHoc: JSON.stringify(dsBaiDaHoc),
                                tongThoiGianHoc: tongThoiGianHoc,
                                tongSoBaiDaHoc: tongSoBaiDaHoc,
                                mucDoHoanThanh: mucDoHoanThanh
                            }
                        }
                    });


                    //load lai bai nop de kiem tra
                    this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })
                    div_loading[0].setAttribute("hidden", "");

                    this.setState({ process: 100 });
                }).catch(err => { message.error("Không nộp bài được !"); div_loading[0].setAttribute("hidden", ""); console.log(err); });
            }
        }
    }

    onNext = () => {
        const { dsBaiTap, viTri, daLamBai } = this.state;
        if (!daLamBai) return Modal.warning({
            title: 'Vui lòng chọn đáp án của câu hỏi!'
        });

        this.setState({ baiTap: {} });
        if ((viTri + 1) < dsBaiTap.length) {
            this.setState({
                baiTap: dsBaiTap[viTri + 1],
                viTri: viTri + 1,
                daLamBai: false
            });
        }

        // xu ly thanh process
        let dataProcess = Math.round((viTri + 1) / dsBaiTap.length * 100);
        this.setState({
            process: dataProcess
        });
        this.slideQuizNext();
    }

    onPrev = () => {
        const { dsBaiTap, viTri } = this.state;
        this.setState({ baiTap: {} });
        if (viTri > 0) {
            this.setState({
                baiTap: dsBaiTap[viTri - 1],
                viTri: viTri - 1
            });
        }

        // xu ly thanh process
        let dataProcess = Math.round((viTri - 1) / dsBaiTap.length * 100);
        this.setState({
            process: dataProcess
        });
        this.slideQuizPre();
    }

    renderBaiTap = () => {
        const { baiTap } = this.state;
        if (baiTap) {
            switch (baiTap.maLoaiBaiTap) {
                case 'SINGLE':
                    return <SingleChoose baiTap={baiTap} onChange={this.onChange} />
                case 'MULTIPLE':
                    return <MutipleChoose baiTap={baiTap} onChange={this.onChange} />
                case 'SORTING':
                    return <SortingQuiz baiTap={baiTap} onChange={this.onChange} />;
                case 'ENTERING':
                    return <EnterQuiz baiTap={baiTap} onChange={this.onChange} />;
                default:
                    break;
            }
        }
    }

    startQuiz = () => {

        const { lichSuHocTap, idKhoaHoc } = this.props;

        if (lichSuHocTap.maNguoiDung) {

            let divReady = document.getElementsByClassName("div_quiz_ready")[0];
            let divQuiz = document.getElementsByClassName("div_quiz_content")[0];
            divReady.setAttribute("hidden", "");
            divQuiz.removeAttribute("hidden", "");
            this.slideQuizNext();

        } else {
            //cap nhat lich su hoc tap khi chua co
            const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
            this.props.dispatch({
                type: CAP_NHAT_LICH_SU_HOC_TAP, payload: {
                    model: {
                        id: lichSuHocTap.id ? lichSuHocTap.id : 0,
                        hoTen: nguoiDung.hoTen,
                        biDanh: nguoiDung.hoTen,
                        maNguoiDung: nguoiDung.id,
                        maKhoaHoc: idKhoaHoc,
                        danhSachBaiDaHoc: JSON.stringify([]),
                        tongThoiGianHoc: 0,
                        tongSoBaiDaHoc: 0,
                        mucDoHoanThanh: 0
                    }
                }
            });

        }
    }

    slideQuizNext = () => {
        var x = document.getElementsByClassName("div_quiz_slide");
        x[0].style.display = "none";
        x[0].style.position = "relative";
        x[0].style.left = "1000px";

        setTimeout(function () { x[0].style.display = "inline"; }, 100);
        setTimeout(function () { x[0].style.left = "0"; }, 200);
    }


    slideQuizPre = () => {
        var x = document.getElementsByClassName("div_quiz_slide");
        x[0].style.display = "none";
        x[0].style.position = "relative";
        x[0].style.left = "-1000px";

        setTimeout(function () { x[0].style.display = "inline"; }, 100);
        setTimeout(function () { x[0].style.left = "0"; }, 200);
    }


    // time hh-mm:ss
    getTimeLamLai = (id) => {

        var div_time = document.getElementById("timeEXPIRED");
        var str = "";
        clearInterval(x);

        GetTimeLamLai(id).then(res => {
            str = res.data.content[0];

        }).catch(err => { console.log(err); clearInterval(x); this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI }) })

        if (str != "0") {
            // Update the count down every 1 second
            x = setInterval(() => {

                var hours = str.slice(0, str.indexOf('-'));
                var minutes = str.slice(str.indexOf('-') + 1, str.indexOf(':'));
                var seconds = str.slice(str.indexOf(':') + 1);

                seconds -= 1;
                if (seconds < 0) {

                    seconds = 59;
                    minutes -= 1;

                    if (hours > 0) {
                        if (minutes < 0) {

                            minutes = 59;
                            hours -= 1;
                        }
                    }

                }
                // Output the result in an element with id="demo"
                if (div_time)
                    div_time.innerHTML = hours + ":" + minutes + ":" + seconds;


                // If the count down is over, write some text 
                if (minutes < 0) {
                    div_time.innerHTML = " ";
                    clearInterval(x);
                    this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI });
                }
                str = hours + "-" + minutes + ":" + seconds;
            }, 1000);

        }

    }
    xuLyQuaBai=()=>{
        const { baiHoc, lichSuHocTap, dsNopBai, quaBaiTiepTheo } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let nopBai = dsNopBai.find(n=>n.nguoiDungId==nguoiDung.id && n.baiHocId==baiHoc.id);
        if(nopBai && nopBai.diem >= 50){
            let danhSachBaiDaHoc = JSON.parse(lichSuHocTap.danhSachBaiDaHoc);

            if(!danhSachBaiDaHoc.find(n=>n==baiHoc.id)){
                danhSachBaiDaHoc.push(baiHoc.id);
                lichSuHocTap.danhSachBaiDaHoc=JSON.stringify(danhSachBaiDaHoc);
                this.props.dispatch({
                    type: CAP_NHAT_LICH_SU_HOC_TAP, payload: {
                        model: lichSuHocTap
                    }
                });
            }
        }
        return quaBaiTiepTheo();
    }

    render() {
        const { viTri, dsBaiTap } = this.state;
        const { baiHoc, lichSuHocTap, dsNopBai } = this.props;

        let kiemTraNopBai = [];
        let checkDaLam = false;
        let checkLamLai = false;
        if (lichSuHocTap) {
            kiemTraNopBai = dsNopBai.find(n => n.nguoiDungId == lichSuHocTap.maNguoiDung && n.baiHocId == baiHoc.id);
            if (kiemTraNopBai) {

                checkDaLam = true;
                if (kiemTraNopBai.diem < 50)
                    checkLamLai = true;
            }
        }

        return (
            <div className="question-main">
                {
                    checkDaLam
                        ?
                        <div className="div_quiz_done">
                            <div className="div_quiz_header">
                                {baiHoc.tenBaiHoc}
                            </div>
                            {
                                checkLamLai
                                    ?
                                    <Result
                                        status="error"
                                        title={kiemTraNopBai.diem + " điểm"}
                                        subTitle={kiemTraNopBai.nhanXet}

                                        extra={<h2 className="col-md-12 text-center pt-0">Bạn đã làm bài không đạt! Bạn cần luyện lại các bài học trước và làm lại bài tập sau :
                                        <h1 id="timeEXPIRED" className="pt-3"><div id="timeEXPIRED"></div>{setTimeout(() => {
                                            this.getTimeLamLai(kiemTraNopBai.id)
                                        }, 1)}</h1>

                                        </h2>}
                                    />
                                    :
                                    <Result
                                        status="success"
                                        title={kiemTraNopBai.diem + " điểm"}
                                        subTitle={kiemTraNopBai.nhanXet}

                                        extra={[
                                            <button className="btn btn-outline-success" onClick={() => this.props.xemDapAnQuiz(baiHoc)}>Đáp án</button>,
                                            <button className="btn btn-outline-danger" onClick={() => this.xuLyQuaBai()}>Bài tiếp theo</button>
                                        ]}
                                    />
                            }

                            <div className="question-number pb-3">
                                <Progress percent={100} status="active" />
                            </div>
                        </div>

                        :
                        <Fragment>

                            <div className="div_quiz_content" hidden>
                                <div className="div_quiz_header">
                                    {baiHoc.tenBaiHoc}
                                </div>
                                <div className="div_quiz_slide">
                                    {this.renderBaiTap()}
                                </div>

                                <div className="div_question_action_number">
                                    <div className="question-action pl-5">

                                        {
                                            (viTri + 1) >= dsBaiTap.length ? <button className="btn btn-outline-danger btn-nopbai" onClick={this.onNopBai}>Nộp bài</button> : <Fragment>
                                                {viTri != 0 ? <button className="btn btn-outline-danger mr-2" onClick={this.onPrev} ><i className="fa fa-chevron-left"></i></button> : ""}
                                                <button className="btn btn-outline-danger" onClick={this.onNext}><i className="fa fa-chevron-right"></i></button>
                                            </Fragment>
                                        }
                                    </div>
                                    <div className="question-number">
                                        <span>Câu {viTri + 1} / {dsBaiTap.length}</span>
                                        <Progress percent={this.state.process} status="active" />
                                    </div>
                                </div>
                            </div>
                            <div className="div_quiz_ready" >
                                <img src={imgReadyQuiz} />
                                <p> <b>Hãy sử dụng những kiến thức đã học để hoàn thành bài tập. <br /> Bạn phải đạt hơn 50% câu đúng để hoàn thành bài tập.</b> </p>
                                <button className="btn btn-danger" onClick={() => this.startQuiz()}>Bắt đầu</button>
                            </div>
                        </Fragment>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap,
        dsNopBai: state.BaiHocReducer.dsNopBai
    }

}

export default connect(mapStateToProps)(BaiTapMain)
