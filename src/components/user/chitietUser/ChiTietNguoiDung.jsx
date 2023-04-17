import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LAY_NGUOI_DUNG_ID, LAY_DANH_SACH_TIEN_TRINH_HOC, LAY_DANH_SACH_KHOA_HOC } from '../../../redux/types/ActionsTypes';
import { layThongTinCongViec } from '../../../commons/user/UserServices';
import ChartBar from '../ChartBar';
import AvatarNguoiDung from './AvatarNguoiDung';
import { Card, DatePicker, message, Switch } from 'antd';
import moment from 'moment';
import { updatesUser } from '../../../commons/user/UserServices';
import { controllers } from 'chart.js';

class ChiTietNguoiDung extends Component {

    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin')),
    }

    layKhoaHocXong = () => {

        const { dsKhoaHocTheoLoTrinh, dsTienTrinhHoc } = this.props;

        //lay danh sach khoa hoc da xong
        let dataKhoaHoc = dsTienTrinhHoc.filter(n => n.nguoiDungId == this.props.match.params.idUser && n.mucDoHoanThanh == 1);

        let data = [];


        return dataKhoaHoc.map(e => {

            //loc khoa hoc theo id tien trinh hoc
            data = dsKhoaHocTheoLoTrinh.find(n => n.id === e.khoaHocId);

            if (data !== undefined) {
                return (<div className="col-md-3 div_ds_dang_hoc">
                    <Card
                        hoverable
                        style={{ width: 230, height: 220 }}
                        cover={<img alt="example" src={data.hinhAnh} />}
                    >
                        <b>{data.tenKhoaHoc}</b>
                        <div className="row">
                            <div className="col-12">
                                {" Tổng bài học: " + data.danhSachBaiHoc.length}
                                <br />
                                {"Tổng giờ học: " + e.tongThoiLuong}
                            </div>
                        </div>

                    </Card></div>)

            }
        })
    }
    changeNgaySinh = (datestring) => {
        let { nguoiDung } = this.props;
        let thongTinMoRong = JSON.parse(nguoiDung.thongTinMoRong);
        thongTinMoRong.NamSinh = datestring.format('L');
        nguoiDung.thongTinMoRong = JSON.stringify(thongTinMoRong)

        updatesUser(nguoiDung.id, nguoiDung).then(res => {
            message.success("Cập nhật thành công !");
            this.props.dispatch({ type: LAY_NGUOI_DUNG_ID, userID: this.props.match.params.idUser })
        });
    }

    changeMail = (value) => {
        let { nguoiDung } = this.props;

        nguoiDung.guiMail = value;
        updatesUser(nguoiDung.id, nguoiDung).then(res => {
            message.success("Cập nhật thành công !");
            this.props.dispatch({ type: LAY_NGUOI_DUNG_ID, userID: this.props.match.params.idUser })
        }).catch(err => console.log(err));
    }

    render() {

        const { nguoiDung } = this.props;

        let thongTinMoRong = [];
        let congViec = "";

        if (nguoiDung.thongTinMoRong !== undefined) {
            thongTinMoRong = JSON.parse(nguoiDung.thongTinMoRong);
            congViec = layThongTinCongViec(thongTinMoRong.CongViecHienTai);
        }

        //kiem tra url facebook co http hay ko
        let urlFace = thongTinMoRong.FacebookUrl;

        if (urlFace != undefined)
            urlFace = urlFace.indexOf("https://") == -1 ? "https://" + urlFace : urlFace;

        // kiem tra co dung la trang nguoi dung hay khong
        let checkUser = false;

        if (this.state.userLogin.id == this.props.match.params.idUser)
            checkUser = true;

        return (
            <div className="container">
                <h3 className="my-3"> Thông tin tài khoản</h3>
                <div className="row mx-1 p-3" style={{ background: "#ffffff" }}>
                    <div className="col-md-6" style={{ borderRight: "1px solid #f1f2f7" }}>
                        <div className="col-md-5">
                            <AvatarNguoiDung nguoiDung={nguoiDung} checkUser={checkUser} />

                        </div>
                        <div className="col-md-7 ctnd_div_name" >
                            <b >{nguoiDung.hoTen}</b>
                            <a target="_blank" href={urlFace} >
                                <i className="fa fa-facebook-official pl-2" style={{ fontSize: 20, color: "royalblue" }} ></i>
                            </a>
                            <div className="ctnd_div_ttct pt-2">
                                <i className="fa fa-briefcase pr-2"></i>  {congViec}
                                <br />
                                <i className="fa fa-phone pr-2"></i>  {nguoiDung.soDt}
                                <br />
                                <i className="fa fa-envelope pr-2"></i>  {nguoiDung.email}
                            </div>
                        </div>

                        <div className="col-md-12 ctnd_div_ttmorong mt-3 pt-3">
                            <div className="col-md-6">
                                <b>Ngày sinh: </b>
                                <br />
                                {
                                    checkUser ?
                                        <DatePicker
                                            value={moment(thongTinMoRong.NamSinh, "MM/DD/YYYY")}
                                            format="DD/MM/YYYY"
                                            onChange={(datestring) => this.changeNgaySinh(datestring)} />
                                        :
                                        thongTinMoRong.NamSinh
                                }

                                {/* {thongTinMoRong.NamSinh} */}
                            </div>
                            <div className="col-md-6">
                                <b>Số CMND: </b>
                                <br />
                                {thongTinMoRong.SoCmnd}
                            </div>
                            <div className="col-md-6">
                                <b>Học/Làm việc tại:</b>
                                <br />
                                {thongTinMoRong.NoiCongTacHienTai}
                            </div>
                            <div className="col-md-6">
                                <b>Mức lương mong muốn:</b>
                                <br />
                                {thongTinMoRong.LuongMongMuon}
                            </div>
                            {/* <div className="col-md-6">
                                <b>Hỗ trợ tìm việc:</b>
                                <br />
                                {thongTinMoRong.DongYHoTroTimViec ? "Có" : "Không"}
                            </div> */}
                            <div className="col-md-6">
                                <b>Nhận mail quảng cáo: </b>
                                <br />
                                <Switch checked={nguoiDung.guiMail} onChange={this.changeMail} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <ChartBar userID={this.props.match.params.idUser} />
                    </div>


                </div>

                <div className="col-md-12" >
                    <h3 className="my-3"> Các khoá đã học</h3>
                    <div style={{ background: "#ffffff", borderRadius: "5px", padding: 20, overflow: "scroll" }}>
                        {this.layKhoaHocXong()}
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount = () => {
        this.props.dispatch({ type: LAY_NGUOI_DUNG_ID, userID: this.props.match.params.idUser }) // lay nguoi dung tu store
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_KHOA_HOC }) // lay danh sach khoa hoc tu store


    }
    componentWillReceiveProps(nextProps) {

        //so sanh props hien tai va props next khi nhan Link route de render lai data
        if (this.props.match.params.idUser != nextProps.match.params.idUser)
            this.props.dispatch({ type: LAY_NGUOI_DUNG_ID, userID: nextProps.match.params.idUser })

    }

}

const mapStateToProps = (state) => {

    return {
        dsKhoaHocTheoLoTrinh: state.KhoaHocReducer.dsKhoaHocTheoLoTrinh,
        nguoiDung: state.NguoiDungReducer.nguoiDung,
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,
    }

}

export default connect(mapStateToProps)(ChiTietNguoiDung)

