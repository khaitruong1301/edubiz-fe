import React, { Component } from 'react';
import {
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_KHOA_HOC,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_TAT_CA_LICH_SU_HOC_TAP,
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_BAI_HOC,
    LAY_DANH_SACH_DANH_GIA_KHOA_HOC
} from '../../redux/types/ActionsTypes';
import { Collapse, Card, Progress, message, Button, Input, InputNumber } from 'antd';
import { connect } from 'react-redux';
import TextArea from 'antd/lib/input/TextArea';
import { themDanhGia, suaDanhGia } from '../../commons/user/DanhGiaServices';

class DanhGiaKhoaHoc extends Component {

    state = {
        khoaHocId: 0,
        valueArea: "",
        noiDung0: "",
        noiDung1: "",
        noiDung2: "",
    };

    static getDerivedStateFromProps(props, state) {
        const { idKhoaHoc, dsDanhGiaKhoaHoc } = props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        if (idKhoaHoc != state.khoaHocId) {
            let lstDanhGia = dsDanhGiaKhoaHoc.find(n => n.nguoiDungId == nguoiDung.id && n.khoaHocId == idKhoaHoc);

            if (lstDanhGia) {
                let noiDung = JSON.parse(lstDanhGia.noiDung);
                return {
                    khoaHocId: idKhoaHoc, valueArea: lstDanhGia.nhanXet, noiDung0: noiDung[0], noiDung1: noiDung[1], noiDung2: noiDung[2]
                }
            }
            return {
                khoaHocId: idKhoaHoc, valueArea: "", noiDung0: "", noiDung1: "", noiDung2: ""
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

            case 2:
                this.setState({
                    noiDung2: value
                });
                break;
        }
    }

    luuDanhGia = () => {
        const { khoaHocId, valueArea, noiDung0, noiDung1, noiDung2 } = this.state;

        if (valueArea == "" || noiDung0 == "" || noiDung1 == "" || noiDung2 == "" || noiDung0 == null || noiDung1 == null || noiDung2 == null) {
            message.error("Hãy điền đầy đủ thông tin");
            return;
        }

        const { dsDanhGiaKhoaHoc } = this.props;

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let lstDanhGia = dsDanhGiaKhoaHoc.find(n => n.nguoiDungId == nguoiDung.id && n.khoaHocId == khoaHocId);

        let noiDung = [noiDung0, noiDung1, noiDung2];
        let model = {
            KhoaHocId: khoaHocId,
            NguoiDungId: nguoiDung.id,
            NoiDung: JSON.stringify(noiDung),
            NhanXet: valueArea,
        }

        if (lstDanhGia) {
            suaDanhGia(lstDanhGia.id, model).then(res => {

                message.success("Cảm ơn bạn đã gửi đánh giá, Chúng tôi sẽ cải thiện chất lượng hệ thống tốt hơn qua các đánh giá !");
                this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_KHOA_HOC });
                this.props.closeModal();
            }).catch(err => {
                console.log(err);
            })

        }
        else {
            themDanhGia(model).then(res => {
                message.success("Cảm ơn bạn đã gửi đánh giá, Chúng tôi sẽ cải thiện chất lượng hệ thống tốt hơn qua các đánh giá !");
                this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_KHOA_HOC });
                this.props.closeModal();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    render() {

        const { khoaHocId, valueArea, noiDung0, noiDung1, noiDung2 } = this.state;


        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <h2 className="text-center pb-3">Bạn nghĩ gì về khoá học này ?</h2>

                </div>
                <div className="col-md-12 py-3">
                    <div className="col-md-10">
                        <b>Mục đánh giá</b>
                    </div>
                    <div className="col-md-2 pb-3">
                        <b> Điểm (1 - 10)</b>
                    </div>
                    <div className="col-md-10">
                        Chất lượng video
                    </div>
                    <div className="col-md-2 pb-3">
                        <InputNumber min={1} max={10} onChange={value => this.onInputChane(value, 0)} value={noiDung0} />
                    </div>
                    <div className="col-md-10">
                        Giọng nói, khả năng trình bày giảng viên
                    </div>
                    <div className="col-md-2 pb-3">
                        <InputNumber min={1} max={10} onChange={value => this.onInputChane(value, 1)} value={noiDung1} />
                    </div>
                    <div className="col-md-10">
                        Nội dung khóa học
                    </div>
                    <div className="col-md-2 pb-3">
                        <InputNumber min={1} max={10} onChange={value => this.onInputChane(value, 2)} value={noiDung2} />
                    </div>

                </div>
                <div className="col-md-12 text-center">
                    <p className="pb-3"> <b>Nhận xét chi tiết về khóa học</b></p>

                    <TextArea style={{ width: "80%" }} rows={7} placeholder="Hãy để lại nhận xét của bạn về khoá học này ?"
                        value={valueArea}
                        onChange={e => this.onAreaChange(e.target.value)}
                    >
                    </TextArea>
                    <br />
                    <button className="mt-3 btn btn-info" onClick={() => this.luuDanhGia()}>Lưu</button>
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_KHOA_HOC }) // lay danh sach khoa hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store
        this.props.dispatch({ type: LAY_TAT_CA_LICH_SU_HOC_TAP, payload: { maNguoiDung: nguoiDung.id } })// lay lich su hoc tap
        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc

        this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_KHOA_HOC }) // lay danh sach danh gia khoa hoc
    }
}

const mapStateToProps = (state) => {

    return {
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsKhoaHocTheoLoTrinh: state.KhoaHocReducer.dsKhoaHocTheoLoTrinh,
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,
        dsLichSuHocTap: state.LichSuHocTapReducer.dsLichSuHocTap,
        dsChuong: state.KhoaHocReducer.dsChuong,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsDanhGiaKhoaHoc: state.DanhGiaReducer.dsDanhGiaKhoaHoc

    }

}

export default connect(mapStateToProps)(DanhGiaKhoaHoc)

