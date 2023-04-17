import React, { Component } from 'react';
import './BaiTapNop.css';
import { message, Input, Form, Button, Result } from 'antd';
import { connect } from 'react-redux';
import { CAP_NHAT_BAI_DA_HOC, LAY_DANH_SACH_NOP_BAI, CAP_NHAT_LICH_SU_HOC_TAP } from '../../../redux/types/ActionsTypes';
import { luuNopBai, SuaNopBai } from '../../../commons/user/UserServices';
import { apiURL } from '../../../redux/Config/Config';
import { dinhDangTheoNgay, tinhSoNgay } from '../../../commons/format/FormatDate';

class BaiTapNop extends Component {
    onNopBai = (BaiLam) => {
        const { baiHoc, lichSuHocTap, dsTatCaBaiHoc, dsNopBai, idKhoaHoc } = this.props;


        let kiemTraNopBai = [];
        if (lichSuHocTap) {
            kiemTraNopBai = dsNopBai.find(n => n.nguoiDungId == lichSuHocTap.maNguoiDung && n.baiHocId == baiHoc.id);

            //kiem tra ton tai
            if (kiemTraNopBai) {

                //kiem tra han nop bai
                let soNgayNopBai = tinhSoNgay(new Date(kiemTraNopBai.hanNopBai), new Date());
                if (soNgayNopBai >= 0) {

                    //cap nhat bai tap
                    kiemTraNopBai.baiLam = BaiLam;
                    kiemTraNopBai.nguoiCham=JSON.stringify([new Date()]);

                    SuaNopBai(kiemTraNopBai.id, kiemTraNopBai).then(res => {
                        let dsBaiDaHoc = lichSuHocTap.maKhoaHoc == idKhoaHoc && lichSuHocTap.danhSachBaiDaHoc ? JSON.parse(lichSuHocTap.danhSachBaiDaHoc) : [];

                        //cap nhat lich su hoc tap
                        if (dsBaiDaHoc.findIndex(n => n == baiHoc.id) == -1) {
                            const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'))
                            let tongThoiGianHoc = lichSuHocTap.tongThoiGianHoc ?? 0;
                            let tongSoBaiDaHoc = lichSuHocTap.tongSoBaiDaHoc ?? 0;
                            let mucDoHoanThanh = lichSuHocTap.mucDoHoanThanh ?? 0;
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
                        }

                        //load lai bai nop de kiem tra
                        this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })
                    }).catch(err => console.log(err));
                }
            }
        }
    }

    handleSubmit = e => {

        e.preventDefault();
        this.props.form.validateFields(['linkBaiLam'], (err, values) => {

            if (!err) {
                this.onNopBai(values.linkBaiLam)
            }
        });
    };

    startQuiz = () => {
        const { baiHoc, lichSuHocTap, dsNopBai, idKhoaHoc } = this.props;
        document.getElementsByClassName("btn-start")[0].setAttribute("hidden", "");
        document.getElementsByClassName("txt-start")[0].removeAttribute("hidden", "");

        var dDateNop = new Date();
        dDateNop.setDate(dDateNop.getDate() + baiHoc.thoiLuong);


        if (lichSuHocTap.maKhoaHoc == idKhoaHoc) {

            let model = {
                nguoiDungId: lichSuHocTap.maNguoiDung,
                baiHocId: baiHoc.id,
                baiLam: "0",
                diem: 0,
                nguoiCham: "",
                nhanXet: "",
                hanNopBai: dDateNop
            }


            luuNopBai(model).then(res => {
                //load lai bai nop de kiem tra
                this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })
            }).catch(err => console.log(err));

        } else {
            //cap nhat lich su hoc tap
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

    renderBaiTap = () => {
        const { baiHoc, lichSuHocTap, dsNopBai, quaBaiTiepTheo } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        const { getFieldDecorator } = this.props.form;
        //khoi tao thoc tinh width cho form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },

            },
        };

        let kiemTraNopBai = [];
        if (lichSuHocTap)
            kiemTraNopBai = dsNopBai.find(n => n.nguoiDungId == lichSuHocTap.maNguoiDung && n.baiHocId == baiHoc.id);

        //kiem tra lam bai chua
        if (kiemTraNopBai) {
            if (kiemTraNopBai.baiLam != "0") {

                if (kiemTraNopBai.diem == 0)
                    return (
                        //chua co diem
                        <div class="col-md-12 text-center pt-4">
                            <Result
                                status="info"
                                title="Bạn đã nộp bài, giảng viên sẽ chấm và cho điểm bài tập của bạn."
                                extra={[<button className="btn btn-outline-danger" onClick={() => quaBaiTiepTheo()}>Bài tiếp theo</button>]}
                            />
                        </div>)
                else {
                    let nhanXet = <div className="text-left"> Nhận xét giảng viên: {htmlToReactParser.parse(kiemTraNopBai.nhanXet)}</div>
                    let extra = [];
                    if (baiHoc.baiGiai)
                        extra.push(<a href={apiURL + baiHoc.baiGiai}><button className="btn btn-info">Bài giải</button></a>);
                    extra.push(<button className="ml-2 btn btn-outline-danger" onClick={() => this.props.quaBaiTiepTheo()}>Bài tiếp theo</button>);

                    return (
                        //co diem
                        <div class="col-md-12  pt-4">
                            <Result
                                status="success"
                                title={kiemTraNopBai.diem + " điểm"}
                                subTitle={extra}
                                extra={nhanXet}
                            />
                        </div>)
                }

            }

            else {
                let soNgayNopBai = tinhSoNgay(new Date(kiemTraNopBai.hanNopBai), new Date());

                if (soNgayNopBai >= 0) {
                    soNgayNopBai = soNgayNopBai == 0 ? "hôm nay" : soNgayNopBai + 1 + " ngày";

                    return (<div className="col-md-12">
                        <h2 className="col-md-12 text-center">{baiHoc.tenBaiHoc}</h2>
                        <div className="col-md-12 text-info text-center">
                            <a target="_blank" href={apiURL + baiHoc.noiDung}><button className="btn btn-success mt-3">Click vào đây để lấy đề bài</button></a>
                            <br />
                            <a target="_blank" href={apiURL + "/files/huong_dan_nop_bai.pdf"}><button className="btn btn-outline-danger my-3">Hướng dẫn nộp bài</button></a>

                            <br />
                      * Lưu ý: Sau khi làm bài xong, các bạn vui lòng up bài của mình lên Google Drive và nộp link drive.
                      <br />
                      File được nén theo định dạng zip và đặt tên file: [Khoá học]_[Chương]_[Họ tên]
                     </div>
                        <div className="col-md-12">
                            <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                                <div className="col-md-10">
                                    <Form.Item label="Link drive" >
                                        {getFieldDecorator('linkBaiLam', {
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Trường này không được trống',
                                                },
                                            ],
                                        })(<Input placeholder="Nộp link bài làm của bạn đã up trên drive" />)}
                                    </Form.Item>
                                </div>
                                <div className="col-md-10">
                                    <Form.Item {...tailFormItemLayout}>
                                        <Button type="primary" htmlType="submit">Nộp bài</Button>
                                    </Form.Item>
                                </div>
                            </Form>
                        </div>
                        <div className="col-md-12 text-center position-absolute pb-3" style={{ bottom: 0 }}>
                            <b><i className="fa fa-clock-o"></i> Bạn còn {soNgayNopBai} để nộp bài </b></div>
                    </div>)
                } else {
                    return (<div class="col-md-12 text-center pt-4">
                        <Result
                            status="error"
                            title={"Bạn đã hết hạn nộp bài tập này !"}
                            subTitle={"Ngày làm bài: " + dinhDangTheoNgay(kiemTraNopBai.ngayTao) + " - Hạn nộp: " + dinhDangTheoNgay(kiemTraNopBai.hanNopBai)}
                        />
                    </div>)
                }
            }
        } else {
            return (<div className="col-md-12 text-center">
                <h2 className="col-md-12 text-center">{baiHoc.tenBaiHoc}</h2>
                {/* <h2>Bài tập có thời gian, làm bài và nộp trước thời gian quy định !</h2>
                <button className="btn btn-danger mt-4" onClick={() => this.startQuiz()}>Bắt đầu</button> */}
                <Result
                    status="warning"
                    title={"Bắt đầu tính thời gian làm bài khi nhấn nút bắt đầu."}
                    subTitle={"Làm bài và nộp trước thời gian quy định !"}
                    extra={
                        <span>
                            <button className="btn btn-danger mt-4 btn-start" onClick={() => this.startQuiz()}>Bắt đầu</button>
                        <span hidden className="h5 font-weight-bold txt-start">Vui lòng đợi trong giây lát !</span>
                        </span>

                }
                />
            </div>
            )
        }

    }

    render() {

        return (
            <div className="row div_baitapnop_main">
                {this.renderBaiTap()}
            </div>
        )
    }
}
BaiTapNop = Form.create({ name: 'register' })(BaiTapNop);

const mapStateToProps = (state) => {
    return {
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap,
        dsNopBai: state.BaiHocReducer.dsNopBai
    }

}

export default connect(mapStateToProps)(BaiTapNop)