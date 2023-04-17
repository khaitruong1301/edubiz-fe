import React, { Component } from 'react'
import { Collapse, Card, Progress, message, Modal, Input } from 'antd';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_KHOA_HOC,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_TAT_CA_LICH_SU_HOC_TAP,
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_BAI_HOC
} from '../../../redux/types/ActionsTypes';
import { dinhDangTheoNgay, dinhDangNgayCheck } from '../../../commons/format/FormatDate';
import { apiURL, urlMainPage } from '../../../redux/Config/Config';
import { cutString } from '../../../commons/format/FormatNumber';
import './StyleDemo.css';
import logocyber from "../../../assets/none.png";
import { checkCodeDemo } from '../../../commons/user/UserServices';

let idKhoaHoc = 0;
const { Search } = Input;

class LoTrinhNguoiDung extends Component {

    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin')),
    }

    //dua component ra ngoai template
    linkBaiHoc = (idKhoaHoc) => {
        this.props.history.push(`/demo/${idKhoaHoc}`);
    }
    //lay tong bai hoc theo khoa hoc
    layTongBaiHoc = (khoaHocId) => {
        const { dsChuong } = this.props;

        let tongBai = 0;
        let dataChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);

        if (dataChuong.length > 0) {
            dataChuong.map(ds => {
                tongBai += JSON.parse(ds.danhSachMaBaiHoc).length;

            })
        }

        return tongBai;

    }
    //lay tong thoi gian theo khoa hoc
    layTongThoiGianKhoaHoc = (khoaHocId) => {
        const { dsChuong, dsBaiHoc } = this.props;

        let timeHoc = 0;
        let dataChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);

        if (dataChuong.length > 0) {
            dataChuong.map(ds => {
                //filter bai hoc theo ma chuong
                let listtBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == ds.id && n.maLoaiBaiHoc == "VIDEO_FPT");
                //duyet theo bao hoc lay time
                listtBaiHoc.map(itemBaiHoc => {
                    timeHoc += itemBaiHoc.thoiLuong;
                })
            })
        }

        return timeHoc;

    }

    //kiem tra co bai demo hay khong de hien button
    checkBaiHocXemDemo = (khoaHocId) => {
        const { dsChuong, dsBaiHoc } = this.props;

        let check = "";
        let dataChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);

        if (dataChuong.length > 0) {
            dataChuong.map(ds => {
                //filter bai hoc theo ma chuong
                let listtBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == ds.id && n.maLoaiBaiHoc == "VIDEO_FPT");
                //duyet theo bao hoc lay time
                listtBaiHoc.map(itemBaiHoc => {
                    if (itemBaiHoc.xemDemo)
                        check = "1";
                })
            })
        }

        if (check == "1")
            return true;
        else
            return false;

    }

    //lay tong thoi gian hoc theo lo trinh
    layTongThoiGianHoc = (loTrinh) => {

        let timeHoc = 0;
        const { dsChuong, dsBaiHoc, dsKhoaHocTheoLoTrinh } = this.props;

        //duyet danh sach khoa hoc cua lo trinh
        if (loTrinh) {
            loTrinh.danhSachKhoaHoc.map(maKhoaHoc => {
                //filter chuong theo ma khoa hoc
                let listChuong = dsChuong.filter(n => n.khoaHocId == maKhoaHoc);
                //duyet tiep theo chuong lay danh sach bai hoc
                listChuong.map(itemChuong => {

                    //filter bai hoc theo ma chuong
                    let listtBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == itemChuong.id && n.maLoaiBaiHoc == "VIDEO_FPT");
                    //duyet theo bao hoc lay time
                    listtBaiHoc.map(itemBaiHoc => {
                        timeHoc += itemBaiHoc.thoiLuong;
                    })
                })
            })

        }


        return timeHoc;

    }
    showDanhGia = (khoaHocId) => {
        idKhoaHoc = khoaHocId;
        this.showModal();
    }
    layKhoaHoc = (dsKhoaHoc) => {

        const { dsKhoaHocTheoLoTrinh } = this.props;

        let data = [];

        return dsKhoaHoc.map(e => {

            //loc khoa hoc theo ma khoa hoc cua lo trinh
            data = dsKhoaHocTheoLoTrinh.find(n => n.id === e);


            if (data !== undefined) {
                return (<div className="col-md-4  div_demo_lesson">
                    <Card
                        hoverable
                        style={{ width: 320, height: 340 }}
                        cover={<img alt="example" src={apiURL + data.hinhAnh} style={{ height: 170 }} />}

                    >
                        <div className="font-weight-bold text-center" style={{ height: 45 }}

                        >{cutString(data.tenKhoaHoc, 70)}</div>
                        <div className="row text-center">
                            <div className="col-12">

                                Tổng bài học: {this.layTongBaiHoc(data.id)} bài
                                <br />
                                Tổng thời gian: {this.layTongThoiGianKhoaHoc(data.id)} phút
                                <br />
                                {
                                    this.checkBaiHocXemDemo(data.id)
                                        ?
                                        <button className="mt-2 btn btn-warning" onClick={() => this.linkBaiHoc(e, "0")}><b>Xem bài học</b></button>
                                        :
                                        ""
                                }

                            </div>
                        </div>

                    </Card></div>)
            }

        })

    }

    xuatNoiDung = () => {

        const { dsLoTrinh } = this.props
        const { Panel } = Collapse;
        const dNow = Date.parse(dinhDangNgayCheck(new Date()));

        let lstMaLoTrinh = [];
        dsLoTrinh.map(item => {
            lstMaLoTrinh.push(item.id);
        })

        return <div className="div_demo_main">
            <div className="demo_header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="pl-5 text-dark logo-text-a" href="#">  <img className="m-2" src={logocyber} alt="Logo" width="3%" /> CyberLearn</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse float-right" id="navbarSupportedContent" >
                        <ul className="navbar-nav mr-auto ">
                            <li className="nav-item ">

                            </li>
                            <li className="nav-item ">

                            </li>
                            <li className="nav-item ">
                                <a className="nav-link" target="_blank" href={urlMainPage}>Trang chủ</a>
                            </li>
                        </ul>
                    </div>
                    <div className="clearfix"></div>
                </nav>

            </div>

            {/* <div>
                <div className="div_demo_title text-center">
                <h1 className=" text-light"> Lộ trình Combo Tư duy lập trình, thuật toán, hướng đối tượng </h1>
                <h2 className="text-light">( 5 khoá học, 2779 phút )</h2>
                </div>
                <div className="row div_demo_list">
                   
                <div className="col-md-4 div_demo_lesson">
                    <Card
                        hoverable
                        style={{ width: 320, height: 330 }}
                        cover={<img alt="example" style={{ height: 170 }} />}
                     

                    >
                        <div className="font-weight-bold text-center" style={{ height: 45 }}

                        >alsdmasd kasmdkas</div>
                        <div className="row text-center">
                            <div className="col-12">

                                Tổng bài học: 2
                                <br />
                                Tổng thời gian:

                            </div>
                           
                        </div>

                    </Card></div>
               
                </div> */}

            {
                dsLoTrinh.map(element => {

                    return <div>
                        <div className="div_demo_title text-center">
                            <h1 className=" text-light"> {"Lộ trình " + element.tenLoTrinh} </h1>
                            <h2 className="text-light">{" ( " + element.danhSachKhoaHoc.length + " khoá học, " + this.layTongThoiGianHoc(element) + " phút ) "} </h2>
                        </div>
                        <div className="row div_demo_list">
                            {this.layKhoaHoc(element.danhSachKhoaHoc)}
                        </div>
                    </div>

                })
            }

        </div>
    }

    kiemTraCode = (code) => {
        let email = document.getElementById("txt-email").value.trim();

        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            document.getElementById("txt-loi").innerText = "Email không đúng !";
            return;
        }
        if (!this.checkMail(email)) {
            document.getElementById("txt-loi").innerText = "Email không khả dụng, hãy sử dụng email khác !";

            return
        }
        document.getElementById("txt-loi").innerText = "";

        checkCodeDemo(code,email).then(res => {

            if (res.data.content != "0") {
                if (res.data.content == "1")
                    message.error("Mã học thử đã được sử dụng !");
                else {
                    //xoa store login
                    localStorage.removeItem("checkLogin");

                    localStorage.setItem('demoCode', res.data.content.code);
                    this.setState({});
                }
            } else {
                message.error("Mã học thử không đúng !");
            }

        })
    }

    checkMail = (text) => {


        let char = text.substring(0, text.indexOf('@'));

        let uniqueCount = [];
        for (var i = 0; i < char.length; i++) {
            uniqueCount.push(char.charAt(i));
        }

        var count = {};
        let check = true;
        uniqueCount.forEach(function (i) {
            count[i] = (count[i] || 0) + 1;
            if (uniqueCount.length < 5)
                if (count[i] > 2)
                    check = false;
            if (uniqueCount.length < 10)
                if (count[i] > 3)
                    check = false;
            if (uniqueCount.length < 15)
                if (count[i] > 4)
                    check = false;
            if (uniqueCount.length < 19)
                if (count[i] > 5)
                    check = false;
        });

        return check;
    }

    render() {

        const checkCodeDemo = localStorage.getItem('demoCode');

        // if (checkCodeDemo === null) {
        //     localStorage.clear();
        //     window.location = urlMainPage;
        // }



        return (
            <div>
                {
                    checkCodeDemo == null ?
                        <Modal
                            title="Nhập mã học thử"
                            visible={true}
                            footer={null}
                        >
                            <span className="text-danger" id="txt-loi"></span>

                            <Input
                                placeholder="Nhập email"
                                id="txt-email"
                                size="large"
                            />
                            <Search
                                placeholder="Nhập mã học thử"
                                enterButton="OK"
                                size="large"
                                onSearch={value => this.kiemTraCode(value)}
                            />
                        </Modal>
                        :
                        this.xuatNoiDung()
                }
            </div>
        )
    }
    componentDidMount = () => {


        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_KHOA_HOC }) // lay danh sach khoa hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc

        //change https url
        let urlLogin = window.location.href;
        if (urlLogin.indexOf("http:") != -1) {
            let index = urlLogin.indexOf("http:")
             window.location = "https://" + window.location.host + window.location.pathname;
        }

    }
}

const mapStateToProps = (state) => {

    return {
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsKhoaHocTheoLoTrinh: state.KhoaHocReducer.dsKhoaHocTheoLoTrinh,
        dsChuong: state.KhoaHocReducer.dsChuong,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc

    }

}

export default connect(mapStateToProps)(LoTrinhNguoiDung)
