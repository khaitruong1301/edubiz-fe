import React, { Component, Fragment } from 'react';
import { Button, Modal, message, Progress, Result } from 'antd';
import SingleChooseAnswer from './SingleChooseAnswer';
import MultipleChooseAnswer from './MultipleChooseAnswer';
import './BaiTapMainAnswer.css';
import SortingQuizAnswer from './SortingQuizAnswer';
import EnterQuizAnswer from './EnterQuizAnswer';
import _ from 'lodash';
import { connect } from 'react-redux';
import { CAP_NHAT_BAI_DA_HOC, CAP_NHAT_LICH_SU_HOC_TAP, LAY_DANH_SACH_NOP_BAI } from '../../redux/types/ActionsTypes';

class BaiTapAnswer extends Component {

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


    onNext = () => {
        const { dsBaiTap, viTri, daLamBai } = this.state;

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
                    return <SingleChooseAnswer baiTap={baiTap} onChange={this.onChange} />
                case 'MULTIPLE':
                    return <MultipleChooseAnswer baiTap={baiTap} onChange={this.onChange} />
                case 'SORTING':
                    return <SortingQuizAnswer baiTap={baiTap} onChange={this.onChange} />;
                case 'ENTERING':
                    return <EnterQuizAnswer baiTap={baiTap} onChange={this.onChange} />;
                default:
                    break;
            }
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

    render() {
        const { viTri, dsBaiTap } = this.state;
        const { baiHoc } = this.props;


        return (
            <div className="question-main">
                {
                    <Fragment>

                        <div className="div_quiz_content" >
                            <div className="div_quiz_header">
                                {baiHoc.tenBaiHoc}
                            </div>
                            <div className="div_quiz_slide">
                                {this.renderBaiTap()}
                            </div>

                            <div className="div_question_action_number">
                                <div className="question-action pl-5">

                                    {
                                        (viTri + 1) >= dsBaiTap.length ?
                                            <Fragment>
                                                <button className="btn btn-outline-danger mr-2" onClick={this.onPrev} ><i className="fa fa-chevron-left"></i></button>
                                                <button className="btn btn-outline-danger" onClick={() => this.props.quaBaiTiepTheo()}>Bài tiếp theo</button>
                                            </Fragment>
                                            :
                                            <Fragment>
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

export default connect(mapStateToProps)(BaiTapAnswer)
