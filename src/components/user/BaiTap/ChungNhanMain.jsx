import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_NOP_BAI,
    LAY_DANH_SACH_BAI_HOC,
    LAY_DANH_SACH_LOAI_KHOA_HOC,
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_KHOA_HOC,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_DANH_SACH_NGUOI_DUNG
} from '../../../redux/types/ActionsTypes';
import { Table, Tag, Modal, Tabs, Collapse, Card, Progress } from 'antd';
import { dinhDangTheoNgay } from '../../../commons/format/FormatDate';
import bground from "../../../assets/chung_nhan.jpg";
import "./ChungNhan.css";
import { apiURL_main, urlMainPage, idFacebook } from '../../../redux/Config/Config'
import { Base64 } from 'js-base64';

import {
    FacebookMessengerShareButton,
    FacebookMessengerIcon,

    FacebookShareButton,
    FacebookIcon,

    EmailShareButton,
    EmailIcon,

    TwitterShareButton,
    TwitterIcon,

    TelegramShareButton,
    TelegramIcon
} from "react-share";


const { TabPane } = Tabs;
const { Panel } = Collapse;

class ChungNhanMain extends Component {
    render() {

        const { code } = this.props.match.params;
        let getCode = Base64.decode(code);

        if (getCode.indexOf("@@") == -1) {
            window.location = urlMainPage;
        }

        let maCode = getCode.split("@@");


        let chungNhan = [];
        let idLoTrinh = maCode[1];
        let idNguoiDung = maCode[0];
        const { dsKhoaHocTheoLoTrinh, dsChuong, dsTienTrinhHoc, dsLoTrinh, dsBaiHoc, dsNopBai, dsNguoiDung } = this.props;

        const nguoiDung = dsNguoiDung.find(n => n.id == idNguoiDung);

        let lstNopBai = dsNopBai.filter(n => n.nguoiDungId == idNguoiDung);
        let tientrinh = dsTienTrinhHoc.find(n => n.nguoiDungId == idNguoiDung && n.loTrinhId == idLoTrinh);

        let lotrinh = dsLoTrinh.find(n => n.id == idLoTrinh);

        if (lotrinh) {

            let tongDiem = 0;
            let slBaiTap = 0;

            lotrinh.danhSachKhoaHoc.map(idkhoa => {
                let khoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id == idkhoa);

                if (khoaHoc) {



                    let lstChuongHoc = dsChuong.filter(n => n.khoaHocId == khoaHoc.id);

                    lstChuongHoc.map(chuonghoc => {
                        let lstBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == chuonghoc.id && (n.maLoaiBaiHoc == "QUIZ" || n.maLoaiBaiHoc == "QUIZ_WRITE"));
                        slBaiTap += lstBaiHoc.length;



                        lstBaiHoc.map(baitap => {
                            let nopbai = lstNopBai.find(n => n.baiHocId == baitap.id);


                            if (nopbai) {

                                tongDiem += nopbai.diem;

                            }


                        }
                        )

                    })

                }

            })

            let diemTB = (tongDiem / 10 / slBaiTap).toFixed(1);

            let dNow = new Date();

            let nameCT = JSON.parse(lotrinh.tenChungChi);
            let soChungNhan = tientrinh ? nameCT[1] + "/" + dNow.getFullYear() + "/" + dNow.getFullYear() + tientrinh.id : "";

          

            chungNhan = {
                idNguoiDung: nguoiDung && nguoiDung.id,
                idLoTrinh: idLoTrinh,
                tenKH: nguoiDung && nguoiDung.hoTen,
                tenLop: nameCT[0],
                thoiGianDaoTao: lotrinh.thoiHan,
               
                soChungNhan: soChungNhan,
                ngayCap: tientrinh && dinhDangTheoNgay(tientrinh.ngayBatDauHoc)
            }

        }

        return (
            <div style={{ backgroundColor: "rgba(0,0,0,.8)" }}>

                <div style={{ display: "none" }}>
                    <FacebookShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <FacebookIcon
                            size={"50px"}
                        />

                    </FacebookShareButton>

                    <FacebookMessengerShareButton
                        url={apiURL_main + "/certificate/" + code}
                        appId={idFacebook}
                    >
                        <FacebookMessengerIcon
                            size={"50px"}
                            round={true}
                        />

                    </FacebookMessengerShareButton>

                    <EmailShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <EmailIcon
                            size={"50px"}
                        />

                    </EmailShareButton>


                    <TwitterShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <TwitterIcon
                            size={"50px"}
                        />

                    </TwitterShareButton>


                    <TelegramShareButton
                        url={apiURL_main + "/certificate/" + code}
                    >
                        <TelegramIcon
                            size={"50px"}
                        />

                    </TelegramShareButton>

                </div>

                <div className="bg-certificate print container position-relative flex-container text-center">

                    <img src={bground} className="imgCertificate" />
                    <div className="position-absolute divFullName ">
                        <h3 className="fullName">{chungNhan.tenKH}</h3>
                    </div>
                    <div className="position-absolute divClassName ">
                        <h3 className="ClassName">{chungNhan.tenLop}</h3>
                    </div>
                    <div className="position-absolute divDuration">
                        <h3 className="Duration">{chungNhan.thoiGianDaoTao} months</h3>
                    </div>
                    <div className="position-absolute divTimeTraining">
                        <h3 className="TimeTraining">{chungNhan.thoiGianDaoTao} tháng</h3>
                    </div>
                  
                    <div className="position-absolute divSoChungNhan">
                        <h3 className="SoChungNhan">{chungNhan.soChungNhan}    </h3>
                    </div>
                    <div className="position-absolute divCapNgay ">
                        <h3 className="CapNgay">{chungNhan.ngayCap}</h3>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount = () => {
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach chuong hoc tu store

        this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI }) // lay danh sach nop bai
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc

        this.props.dispatch({ type: LAY_DANH_SACH_LOAI_KHOA_HOC }) //lay danh sach bai hoc

        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_KHOA_HOC }) // lay danh sach khoa hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store

        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG });
    }
}

const mapStateToProps = (state) => {

    return {

        dsChuong: state.KhoaHocReducer.dsChuong,
        dsNopBai: state.BaiHocReducer.dsNopBai,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsLoaiKhoaHoc: state.KhoaHocReducer.dsLoaiKhoaHoc,

        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsKhoaHocTheoLoTrinh: state.KhoaHocReducer.dsKhoaHocTheoLoTrinh,
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,

        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,

    }

}

export default connect(mapStateToProps)(ChungNhanMain)