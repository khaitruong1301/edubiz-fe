import React, { Component } from 'react';
import {
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_DANH_GIA_KHOA_HOC,
    LAY_DANH_SACH_NGUOI_DUNG,
    LAY_DANH_SACH_DANH_GIA_MENTOR
} from '../../redux/types/ActionsTypes';
import { Collapse, Card, Progress, message, Button, Input, InputNumber, Avatar } from 'antd';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { themDanhGia, suaDanhGia, themDanhGiaMentor, suaDanhGiaMentor } from '../../commons/user/DanhGiaServices';
import { apiURL } from '../../redux/Config/Config';

class DanhGiaMenTor extends Component {

    state = {
        khoaHocId: 0,
        mentorId: "",
        tenMentor: "",
        valueArea: "",
        noiDung0: "",
        noiDung1: "",
    };

    static getDerivedStateFromProps(props, state) {
        const { idKhoaHoc, dsDanhGiaKhoaHoc } = props;

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        if (idKhoaHoc != state.khoaHocId) {

            return {
                khoaHocId: idKhoaHoc, valueArea: "", noiDung0: "", noiDung1: ""
            }
        }

    }

    handleChange = value => {
        this.setState({ value });
    };

    onAreaChange = (value) => {
        this.setState({
            valueArea: value
        });
    }

    onInputChane = (value, num) => {
        switch (num) {
            case 0:
                this.setState({
                    noiDung0: value
                });
                break;
            case 1:
                this.setState({
                    noiDung1: value
                });
                break;

        }
    }

    luuDanhGia = () => {
        const { khoaHocId, mentorId, valueArea, noiDung0, noiDung1 } = this.state;

        if (valueArea == "" || noiDung0 == "" || noiDung1 == "" || noiDung0 == null || noiDung1 == null) {
            message.error("Hãy điền đầy đủ thông tin");
            return;
        }

        const { dsDanhGiaMentor } = this.props;

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let danhGia = dsDanhGiaMentor.find(n => n.nguoiDungId == nguoiDung.id && n.mentorId == mentorId);

        let noiDung = [noiDung0, noiDung1];
        let model = {
            mentorId: mentorId,
            NguoiDungId: nguoiDung.id,
            NoiDung: JSON.stringify(noiDung),
            NhanXet: valueArea,
        }

        if (danhGia) {
            suaDanhGiaMentor(danhGia.id, model).then(res => {

                message.success("Cảm ơn bạn đã gửi đánh giá, Chúng tôi sẽ cải thiện chất lượng hệ thống tốt hơn qua các đánh giá !");
                this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_MENTOR });

            }).catch(err => {
                console.log(err);
            })

        }
        else {
            themDanhGiaMentor(model).then(res => {
                message.success("Cảm ơn bạn đã gửi đánh giá, Chúng tôi sẽ cải thiện chất lượng hệ thống tốt hơn qua các đánh giá !");
                this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_MENTOR });

            }).catch(err => {
                console.log(err);
            })
        }
        this.hienFormDanhGia(false);
    }

    xuatMentor = () => {
        const { dsLoTrinh, dsNguoiDung } = this.props;
        const { khoaHocId } = this.state;

        let loTrinh = "";
        let dsMentor = [];
        dsLoTrinh.map(item => {
            if (item && item.danhSachKhoaHoc != "") {
                item.danhSachKhoaHoc.map(maKhoaHoc => {
                    if (maKhoaHoc == khoaHocId)
                        loTrinh = item;
                })
            }

        })

        if (loTrinh != "") {
            let lstMentor = JSON.parse(loTrinh.mentor);
            lstMentor.map(item => {
                let nguoiDung = dsNguoiDung.find(n => n.id == item);
                dsMentor.push(nguoiDung);
            })
        }

        return dsMentor.map(item => {
            if (item)
                return <div className="col-md-12 h5 ml-3">
                    <hr />
                    <div className="col-md-10">

                        <Avatar size="large" src={apiURL + item.avatar} /> {item.hoTen}
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-success" onClick={() => this.layDuLieuMenTor(item.hoTen, item.id)}>Đánh giá</button>
                    </div>
                </div>
        })

    }


    hienFormDanhGia = (bool) => {
        let div_noidung_danhgia = document.getElementsByClassName("div_noidung_danhgia")[0];
        let div_mentor = document.getElementsByClassName("div_mentor")[0];

        //true hien form danh gia, an danh sach mentor
        if (bool) {

            div_noidung_danhgia.removeAttribute("hidden");
            div_mentor.setAttribute("hidden", "");
        } else {
            div_mentor.removeAttribute("hidden");
            div_noidung_danhgia.setAttribute("hidden", "");
        }
    }

    layDuLieuMenTor = (hoTen, mentorId) => {
        const { dsDanhGiaMentor } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let danhGia = dsDanhGiaMentor.find(n => n.nguoiDungId == nguoiDung.id && n.mentorId == mentorId);

        if (danhGia) {
            let noiDung = JSON.parse(danhGia.noiDung);
            this.setState({
                tenMentor: hoTen,
                mentorId: mentorId,
                valueArea: danhGia.nhanXet,
                noiDung0: noiDung[0],
                noiDung1: noiDung[1]
            })

        } else {
            this.setState({
                tenMentor: hoTen,
                mentorId: mentorId,
                valueArea: "",
                noiDung0: "",
                noiDung1: ""
            })
        }
        this.hienFormDanhGia(true);

    }

    render() {

        const { khoaHocId, valueArea, noiDung0, noiDung1 } = this.state;

        return (
            <div className="row">

                <div className="div_mentor row" >
                    <div className="col-md-12 text-center">
                        <h2 className="text-center pb-3">Bạn nghĩ gì về đội ngũ mentor ?</h2>

                    </div>
                    {this.xuatMentor()}
                </div>
                <div className="div_noidung_danhgia" hidden>
                    <div className="col-md-12 ">
                        <a className="text-primary" onClick={() => this.hienFormDanhGia(false)}><i className="fa fa-angle-left"></i> Quay lại</a>

                    </div>
                    <div className="col-md-12 text-center">
                        <h2 className="text-center pb-3">Bạn nghĩ gì về mentor {this.state.tenMentor} ?</h2>
                    </div>
                    <div className="col-md-12 py-3">
                        <div className="col-md-10">
                            <b>Mục đánh giá</b>
                        </div>
                        <div className="col-md-2 pb-3">
                            <b> Điểm (1 - 10)</b>
                        </div>
                        <div className="col-md-10">
                            Nhiệt tình hỗ trợ
                    </div>
                        <div className="col-md-2 pb-3">
                            <InputNumber min={1} max={10} onChange={value => this.onInputChane(value, 0)} value={noiDung0} />
                        </div>
                        <div className="col-md-10">
                            Phản hồi nhanh
                    </div>
                        <div className="col-md-2 pb-3">
                            <InputNumber min={1} max={10} onChange={value => this.onInputChane(value, 1)} value={noiDung1} />
                        </div>

                    </div>
                    <div className="col-md-12 text-center">
                        <p className="pb-3"> <b>Nhận xét chi tiết về mentor</b></p>

                        <TextArea style={{ width: "80%" }} rows={7} placeholder="Hãy để lại nhận xét của bạn về mentor này ?"
                            value={valueArea}
                            onChange={e => this.onAreaChange(e.target.value)}
                        >
                        </TextArea>
                        <br />
                        <button className="mt-3 btn btn-info" onClick={() => this.luuDanhGia()}>Lưu</button>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG });
        this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_MENTOR }) // lay danh sach danh gia mentor
    }
}

const mapStateToProps = (state) => {

    return {
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
        dsDanhGiaMentor: state.DanhGiaReducer.dsDanhGiaMentor
    }

}

export default connect(mapStateToProps)(DanhGiaMenTor)

