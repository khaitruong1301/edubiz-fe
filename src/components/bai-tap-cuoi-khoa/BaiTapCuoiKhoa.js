import React, { Component, Fragment } from 'react';
import { Button, Modal, message } from 'antd';
import SingleChoose from '../bai-tap/SingleChoose';
import MutipleChoose from '../bai-tap/MultipleChoose';
import SortingQuiz from '../bai-tap/SortingQuiz';
import EnterQuiz from '../bai-tap/EnterQuiz';
import _ from 'lodash';
import '../bai-tap/BaiTapMain.css';
import './BaiTapCuoiKhoa.css';

export default class BaiTapCuoiKhoa extends Component {

    state = {
        baiTap: {},
        dsKetQua: [],
        daLamBai: false,
        dsBaiTap: [],
        dsBaiHocLienQuan: [],
        viTri: 0
    }

    componentDidMount = () => {
        const { dsTatCaBaiHoc } = this.props;
        const dsBaiHocQuiz = dsTatCaBaiHoc.filter(x => x.maLoaiBaiHoc === 'QUIZ');
        const dsBaiTap = [];
        for (let baiHoc of dsBaiHocQuiz) {
            const danhSachBaiTap = baiHoc.noiDung ? JSON.parse(baiHoc.noiDung) : [];
            for (const baiTap of danhSachBaiTap) {
                dsBaiTap.push(baiTap);
            }
        }
        this.setState({ dsBaiTap, baiTap: dsBaiTap[0] });
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
        const { dsBaiTap, dsBaiHocLienQuan, dsKetQua, daLamBai } = this.state;
        if (!daLamBai) return Modal.warning({
            title: 'Vui lòng chọn đáp án của câu hỏi!'
        });

        let dem = 0;
        for (let i = 0; i < dsKetQua.length; i++) {
            if (dsKetQua[i] === true) dem++;
        }

        const ketQua = (dsKetQua.length - dem) <= 1;

        if (ketQua) {
            Modal.success({
                title: 'Rất tốt!',
                content: (<p>Bạn đã vượt qua thử thách!</p>),
                okText: "Tiếp tục",
                onOk: () => {
                    // this.props.quaBaiTiepTheo();
                }
            });
        }
        else {
            this.setState({ baiTap: {} });
            Modal.error({
                title: 'Chưa đạt yêu cầu!',
                content: (<p>Bạn phải đạt ít nhất 80% số điểm mới được qua bài?</p>),
                okText: "Làm lại",
                onOk: () => {
                    if (dsBaiHocLienQuan.length > 0) {
                        const baiHoc = _.sample(dsBaiHocLienQuan);
                        const listBaiTap = baiHoc.noiDung ? JSON.parse(baiHoc.noiDung) : [];
                        this.setState({ baiTap: listBaiTap[0], dsBaiTap: listBaiTap, daLamBai: false, viTri: 0 });
                    }
                    else {
                        this.setState({ baiTap: dsBaiTap[0], daLamBai: false, viTri: 0 });
                    }
                }
            });
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

    onHidenPopup = () => {
        this.props.onHidenPopup();
    }

    render() {
        const { viTri, dsBaiTap } = this.state;
        return (
            <div className="bt-cuoi-khoa">
                <div className="bt-cuoi-khoa-wrapper">
                    <div className="bt-cuoi-khoa-header">
                        <span>BÀI TẬP CUỐI KHÓA</span>
                        <span onClick={this.onHidenPopup}><i className="fa fa-times"></i></span>
                    </div>
                    <div className="bt-cuoi-khoa-body">
                        <div className="question-main">
                            <div className="question-number">
                                <b>Bài {viTri + 1}</b> / <b>{dsBaiTap.length}</b>
                            </div>
                            {this.renderBaiTap()}
                            <div className="question-action">
                                {
                                    (viTri + 1) >= dsBaiTap.length ? <Button type="primary" onClick={this.onNopBai}>Nộp bài</Button> : <Fragment>
                                        <Button type="primary" onClick={this.onPrev} className="mr-2">Bài trước</Button>
                                        <Button type="primary" onClick={this.onNext}>Bài tiếp</Button>
                                    </Fragment>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="bt-cuoi-khoa-footer">
                        <Button onClick={this.onHidenPopup}>Đóng</Button>
                    </div>
                </div>
            </div>
        )
    }
}
