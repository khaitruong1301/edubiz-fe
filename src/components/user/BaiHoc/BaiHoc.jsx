import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { apiURL, idFacebook } from "../../../redux/Config/Config";
import {
    LAY_CHI_TIET_KHOA_HOC, LAY_DANH_SACH_THAO_LUAN, LAY_DANH_SACH_NGUOI_DUNG, LAY_LICH_SU_HOC_TAP,
    LAY_LICH_SU_TUONG_TAC,
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_DANH_SACH_NOP_BAI,
    LAY_DANH_SACH_DANH_GIA_KHOA_HOC,
    LAY_DANH_SACH_DANH_GIA_MENTOR,
    LAY_NGUOI_DUNG_EMAIL,
    LAY_LICH_SU_TUONG_TAC_THEO_USER,
    LAY_DANH_SACH_QA
} from '../../../redux/types/ActionsTypes';
import { Player, ControlBar, ReplayControl, PlaybackRateMenuButton } from 'video-react';
import BHThaoLuan from './BHThaoLuan';
import BHMoTaKhoaHoc from './BHMoTaKhoaHoc';
import { Tabs, Checkbox, Button, message, Tag, Dropdown, Modal, Rate } from 'antd';
import './BaiHoc.css';
import VideoPlayer from '../../video/VideoPlayer';
import BaiTapMain from '../../bai-tap/BaiTapMain';
import BaiTapCuoiKhoa from '../../bai-tap-cuoi-khoa/BaiTapCuoiKhoa';
import { themLichSu, suaLichSu, checkNguoiDung } from '../../../commons/user/UserServices';
import { dinhDangNgayCheck } from '../../../commons/format/FormatDate';
import Loading from '../../loading/Loading';
import BaiTapNop from '../BaiTapNop/BaiTapNop';
import logocyber from "../../../assets/none.png";
import { urlMainPage } from '../../../redux/Config/Config';
import BHDiemBaiTap from './BHDiemBaiTap';
import { FacebookProvider, Group } from 'react-facebook';
import DanhGiaKhoaHoc from '../DanhGiaKhoaHoc';
import BaiTapAnswer from '../../bai-tap-dap-an/BaiTapAnswer';
import DanhGiaMenTor from '../DanhGiaMenTor';
import BaiActicle from './BaiActicle';
import DanhSachQA from './DanhSachQA';

const { TabPane } = Tabs;
let baiHocDau = 0;

class ChiTietKhoaHoc extends Component {
    constructor(props) {
        super(props);
        this.dsTatCaBaiHoc = [];
        this.state = {
            urlBaiHoc: "",
            baiHocHienTai: '',
            tenBaiHoc: '',
            dsBaiDaHoc: [],
            showBaiCuoiKhoa: false,
            visible: false,
            visibleMentor: false,
            timeOnline: 0
        };
    }

    //xu ly modal popup dieu khoan
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    //xu ly modal popup dieu khoan
    showModalMentor = () => {
        this.setState({
            visibleMentor: true,
        });
    };

    closeModal = () => {
        this.setState({
            visible: false,
            visibleMentor: false
        });
    };

    setActive = () => {
        // Get all buttons with class="btn" inside the container
        var btns = document.getElementsByClassName("baihoc_div_right_less");

        // Loop through the buttons and add the active class to the current/clicked button
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("baihoc_div_right_active");
                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" baihoc_div_right_active", "");
                }
                this.className += " baihoc_div_right_active";
            });
        }
    }
    //luu bai dang hoc theo khoa hoc
    luuLichSuBaiDangHoc = (baiHoc) => {
        const { dsLichSu } = this.props;
        const maKhoaHoc = this.props.match.params.idKhoaHoc;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        //luu lich su bai da hoc
        // let checkLichSu = dsLichSu.find(n => n.hanhDong == "BAIDANGHOC" && n.loaiSuKien == maKhoaHoc && n.nguoiDungId == nguoiDung.id);

        // if (!checkLichSu) {
        //     let modelLichSu = {
        //         loaiSuKien: maKhoaHoc,
        //         idSuKien: baiHoc.id,
        //         hanhDong: "BAIDANGHOC",
        //         nguoiDungId: nguoiDung.id,
        //         content: "Bạn đang học bài: <b>" + baiHoc.tenBaiHoc + "</b>"
        //     }
        //     themLichSu(modelLichSu).then(res =>
        //         // load lai danh sach tuong tac
        //         this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: nguoiDung.id })
        //     ).catch(err => console.log(err));
        // }
        // else {
        //     checkLichSu.idSuKien = baiHoc.id;
        //     checkLichSu.content = "Bạn đang học bài: <b>" + baiHoc.tenBaiHoc + "</b>";
        //     suaLichSu(checkLichSu.id, checkLichSu).then(res =>
        //         // load lai danh sach tuong tac
        //         this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER , maNguoiDung: nguoiDung.id})
        //     ).catch(err => console.log(err));
        // }
    }
    handleBaiHoc = (baiHoc) => {
        let { noiDung, maLoaiBaiHoc, tenBaiHoc } = baiHoc;

        //gan loading
        var div_loading = document.getElementsByClassName("div_loading");
        div_loading[0].removeAttribute("hidden", "");

        switch (maLoaiBaiHoc) {
            case 'VIDEO_FPT':

                axios.get(apiURL + `/api/file/ftp-video/${noiDung}`, { headers: { apikey: 'UPD124yRTWF124QJFweUaCYSECETBERS' } })
                    .then(res => {

                        this.luuLichSuBaiDangHoc(baiHoc);

                        this.setState({
                            urlBaiHoc: res.data,
                            baiHocHienTai: baiHoc,
                            tenBaiHoc
                        });
                        setTimeout(() => {
                            div_loading[0].setAttribute("hidden", "");
                        }, 1500);

                    })
                    .catch(err => console.log(err.response));
                break;
            case 'QUIZ':
                this.setState({ baiHocHienTai: baiHoc, tenBaiHoc });
                div_loading[0].setAttribute("hidden", "");
                break;
            case 'QUIZ_WRITE':
                this.setState({ baiHocHienTai: baiHoc, tenBaiHoc });
                div_loading[0].setAttribute("hidden", "");
                break;
            case 'ARTICLE':
                this.setState({ baiHocHienTai: baiHoc, tenBaiHoc });
                div_loading[0].setAttribute("hidden", "");
                break;
            default:
                break;
        }
    }

    renderDanhSachChuong = () => {
        baiHocDau = 0;
        let { chiTietKhoaHoc, lichSuHocTap } = this.props;
        const dsBaiDaHoc = lichSuHocTap.danhSachBaiDaHoc ? JSON.parse(lichSuHocTap.danhSachBaiDaHoc) : [];
        this.dsTatCaBaiHoc = [];
        if (chiTietKhoaHoc) {
            const dsChuongHoc = chiTietKhoaHoc.danhSachChuongHoc;

            return dsChuongHoc ? dsChuongHoc.map((chuongHoc, index) => {

                return <div className="chuong-hoc-item" key={index}>
                    <span>{chuongHoc.tenChuongHoc}</span>
                    <div className="bai-hoc-list">
                        {
                            this.renderDanhSachBaiHoc(chuongHoc.danhSachBaiHoc)
                        }
                    </div>
                </div>
            }) : null
        }
    }

    renderDanhSachBaiHoc = (dsBaiHoc) => {
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
        const listBaiHoc = this.props.dsBaiHoc;

        const { danhSachBaiDaHoc } = this.props.lichSuHocTap;
        const { baiHocHienTai } = this.state;
        const dsBaiDaHoc = danhSachBaiDaHoc ? JSON.parse(danhSachBaiDaHoc) : [];
        dsBaiHoc = dsBaiHoc.map(item => {
            if (dsBaiDaHoc.findIndex(x => x === item.id) !== -1)
                return { ...item, checked: true }
            else {
                let checkBaiHoc = listBaiHoc.find(n => n.id == item.id);
                if (baiHocDau == 0 && (checkBaiHoc && checkBaiHoc.maLoaiBaiHoc != "QUIZ_WRITE")) baiHocDau = item.id;
            }

            return { ...item, checked: false }
        });

        return dsBaiHoc.map((baiHoc, index) => {
            this.dsTatCaBaiHoc.push(baiHoc);
            const className = baiHoc.id !== baiHocHienTai.id ? "py-2 pl-2 baihoc_div_right_less" : "py-2 pl-2 baihoc_div_right_less baihoc_div_right_active";
            return (
                <div className={className} key={index} >
                    {
                        <a onClick={baiHoc.checked || baiHocDau == baiHoc.id || baiHoc.maLoaiBaiHoc == "QUIZ_WRITE" || nguoiDung.maNhomQuyen != "USER" ? () => { this.handleBaiHoc(baiHoc) } : () => message.warning("Hãy hoàn thành các bài học trước mới có thể học bài này")}>
                            <div className="row">
                                <div className="col-1 mr-3">
                                    {baiHoc.checked ? <i className="fa fa-check text-success pl-2"></i> : ""}
                                </div>
                                <div className="col-10 p-0">
                                    <div className="col-12">
                                        {baiHoc.maLoaiBaiHoc == "VIDEO_FPT" ?
                                            <i className="fa fa-play-circle mr-2"></i> : ""}
                                        {baiHoc.maLoaiBaiHoc == "QUIZ" || baiHoc.maLoaiBaiHoc == "QUIZ_WRITE" ?
                                            <i className="fa fa-pencil-square mr-2"></i> : ""}
                                        {baiHoc.maLoaiBaiHoc == "ARTICLE" ?
                                            <i className="fa fa-file-text-o mr-2"></i> : ""}
                                        {baiHoc.tenBaiHoc}
                                    </div>
                                    <div className="col-6" style={{ fontSize: "12px" }}>
                                        {baiHoc.maLoaiBaiHoc == "VIDEO_FPT" ? baiHoc.thoiLuong + " phút" : "-"}
                                    </div>
                                    {
                                        baiHoc.maLoaiBaiHoc == "VIDEO_FPT" && baiHoc.moTa != ""
                                            ?
                                            <div className="col-6" style={{ fontSize: "12px" }}>
                                                <Dropdown
                                                    overlay={
                                                        <Tag className="p-2" key="1" onClick={(e) => e.stopPropagation()}><a href={apiURL + baiHoc.moTa}><i className="pr-2 fa fa-file-archive-o
                                                        "></i>{baiHoc.moTa}</a></Tag>
                                                    }
                                                    trigger={['click']}
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <Button size="small">
                                                        <i className="fa fa-folder-open pr-1"></i>  Tài nguyên <i className="fa fa-angle-down pl-1"></i>
                                                    </Button>
                                                </Dropdown>
                                            </div>
                                            :
                                            ""
                                    }
                                </div>
                            </div>
                        </a>
                    }
                </div>
            )
        })
    }

    handleHienDSBai = () => {
        // Get all buttons with class="btn" inside the container
        var divLeft = document.getElementsByClassName("baihoc_div_left_list");
        var divRight = document.getElementsByClassName("baihoc_div_right_list");
        var slideBaiHoc = document.getElementsByClassName("slideBaiHoc");

        if (divRight[0] !== undefined)
            divRight[0].removeAttribute("hidden", "");

        if (slideBaiHoc[0] !== undefined)
            slideBaiHoc[0].setAttribute("hidden", "");

        if (divLeft.length > 0)
            divLeft[0].className = divLeft[0].className.replace("col-md-12 ", "col-md-9 ");

    }

    handleAnDSBai = () => {
        // Get all buttons with class="btn" inside the container
        var divLeft = document.getElementsByClassName("baihoc_div_left_list");
        var divRight = document.getElementsByClassName("baihoc_div_right_list");
        var slideBaiHoc = document.getElementsByClassName("slideBaiHoc");

        if (divRight[0] !== undefined)
            divRight[0].setAttribute("hidden", "");

        if (slideBaiHoc[0] !== undefined)
            slideBaiHoc[0].removeAttribute("hidden", "");

        if (divLeft.length > 0)
            divLeft[0].className = divLeft[0].className.replace("col-md-9 ", "col-md-12 ");

    }

    onChangeVideo = (type) => {
        const { baiHocHienTai } = this.state;
        const index = this.dsTatCaBaiHoc.findIndex(x => x.id === baiHocHienTai.id);
        if (type === 'NEXT' && (index + 1) < this.dsTatCaBaiHoc.length) {
            this.handleBaiHoc(this.dsTatCaBaiHoc[index + 1]);
        }
        else if (type === 'PREV' && index > 0) {
            this.handleBaiHoc(this.dsTatCaBaiHoc[index - 1]);
        }
    }

    renderLoaiBaiHoc = () => {
        //tao label cho mark video
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
        let mark_video = "";
        if (nguoiDung) {
            let indexEmail = nguoiDung.email.indexOf("@");
            if (indexEmail != -1)
                mark_video = nguoiDung.hoTen + "-" + nguoiDung.soDt;
        }

        const { baiHocHienTai } = this.state;
        let { chiTietKhoaHoc, dsLichSu } = this.props;
        const { danhSachBaiDaHoc } = this.props.lichSuHocTap;
        const dsBaiDaHoc = danhSachBaiDaHoc ? JSON.parse(danhSachBaiDaHoc) : [];
        const checked = dsBaiDaHoc.findIndex(x => x === baiHocHienTai.id) !== -1;
        switch (baiHocHienTai.maLoaiBaiHoc) {
            case 'VIDEO_FPT':
                return <VideoPlayer
                    khoaHoc={chiTietKhoaHoc}
                    dsTatCaBaiHoc={this.dsTatCaBaiHoc}
                    baiHoc={baiHocHienTai}
                    src={this.state.urlBaiHoc}
                    onChangeVideo={this.onChangeVideo}
                    checked={checked}
                    dsLichSu={dsLichSu}
                    mark_video={mark_video}
                />
            case 'QUIZ':
                if (baiHocHienTai.danhSachMaBaiTap != "ANSWER")
                    return <BaiTapMain idKhoaHoc={this.props.match.params.idKhoaHoc} baiHoc={baiHocHienTai} xemDapAnQuiz={this.xemDapAnQuiz} quaBaiTiepTheo={this.quaBaiTiepTheo} dsTatCaBaiHoc={this.dsTatCaBaiHoc} />
                else
                    return <BaiTapAnswer baiHoc={baiHocHienTai} quaBaiTiepTheo={this.quaBaiTiepTheo} dsTatCaBaiHoc={this.dsTatCaBaiHoc} />
            case 'QUIZ_WRITE':
                return <BaiTapNop idKhoaHoc={this.props.match.params.idKhoaHoc} baiHoc={baiHocHienTai} quaBaiTiepTheo={this.quaBaiTiepTheo} dsTatCaBaiHoc={this.dsTatCaBaiHoc} />
            case 'ARTICLE':
                return <BaiActicle dsLichSu={dsLichSu} checked={checked} khoaHoc={chiTietKhoaHoc} baiHoc={baiHocHienTai} onChangeVideo={this.onChangeVideo} dsTatCaBaiHoc={this.dsTatCaBaiHoc} />

            default:
                return <div className="course-image" style={{ backgroundImage: `url(${apiURL + chiTietKhoaHoc.hinhAnh})` }}></div>
        }
    }

    quaBaiTiepTheo = () => {
        const { baiHocHienTai } = this.state;
        const index = this.dsTatCaBaiHoc.findIndex(x => x.id === baiHocHienTai.id);
        if (this.dsTatCaBaiHoc.length > index + 1) {
            const { danhSachBaiDaHoc } = this.props.lichSuHocTap;
            let baiHoc = this.dsTatCaBaiHoc[index + 1];

            if (danhSachBaiDaHoc) {
                const listDSDaHoc = JSON.parse(danhSachBaiDaHoc);

                if (baiHoc.maLoaiBaiHoc != "VIDEO_FPT" || listDSDaHoc.findIndex(n => n == baiHoc.id) != -1 || baiHoc.id == baiHocDau)
                    this.handleBaiHoc(baiHoc);
                else
                    message.warning("Hãy hoàn thành các bài học trước mới có thể học bài này");

            }
        }
        // this.handleBaiHoc(this.dsTatCaBaiHoc[index + 1]);

    }

    xemDapAnQuiz = (baiHoc) => {

        baiHoc.danhSachMaBaiTap = "ANSWER";
        this.handleBaiHoc(baiHoc);

    }

    hienThiBaiCuoiKhoa = () => {
        this.setState({ showBaiCuoiKhoa: true })
    }

    anBaiCuoiKhoa = () => {
        this.setState({ showBaiCuoiKhoa: false })
    }

    checkUserBaiHoc = () => {

        let { dsTienTrinh, dsLoTrinh } = this.props;
        const { idKhoaHoc } = this.props.match.params;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let listLoTrinh = [];
        let checkTonTai = false; // dat mot bien dem de kiem tra 0: chua ghi danh, het han hoc, 1: nguoc lai

        //lay danh sach lo trinh da ghi danh 
        dsTienTrinh = dsTienTrinh.filter(n => n.nguoiDungId == nguoiDung.id);

        if (dsTienTrinh.length > 0) {

            //loc khoa hoc co trong lo trinh nao
            dsLoTrinh.map(ds => {
                if (ds.danhSachKhoaHoc.find(n => n == idKhoaHoc))
                    listLoTrinh.push(ds.id);
            })
            //loc lo trinh da duoc ghi danh chua
            listLoTrinh.map(item => {
                let tienTrinh = dsTienTrinh.find(n => n.loTrinhId == item);

                if (tienTrinh) {
                    let dateNow = Date.parse(dinhDangNgayCheck(new Date(this.state.timeOnline)));
                    let dateEnd = Date.parse(dinhDangNgayCheck(tienTrinh.ngayKetThuc));
                    if (dateNow <= dateEnd)
                        checkTonTai = true;
                }

                if (checkTonTai)
                    return;
            })

            if (!checkTonTai)
                this.props.history.push('/lms');

        } else {
            this.props.history.push('/lms');
        }

    }

    render() {
        const { tenBaiHoc } = this.state;
        const { chiTietKhoaHoc, dsQA } = this.props;



        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        if (nguoiDung === null) {
            window.location = urlMainPage;
        }
        checkNguoiDung(nguoiDung.id).then(res => {

            let data = res.data.content;

            if (data.maNhomQuyen != nguoiDung.maNhomQuyen || data.nuocNgoai != nguoiDung.nuocNgoai) {
                this.props.history.push('/lms');
            }


        }).catch(err => {

        })


        if (nguoiDung.maNhomQuyen == "USER") {
            if (this.state.timeOnline == 0) {
                axios.get("https://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh").then(res =>
                    this.setState({ timeOnline: res.data.datetime })
                )
            }
            if (this.props.dsTienTrinh.length > 0)
                this.checkUserBaiHoc();
        }

        return (
            <div className="row mr-0" style={{ background: "white", fontFamily: "open sans,helvetica neue,Helvetica,Arial,sans-serif" }}>
                <nav class="navbar navbar-dark bg-dark navbar-baihoc" >
                    <div>
                        <a onClick={() => this.props.history.push("/user")}>
                            <img src={logocyber} width="30" />
                        </a>
                        |
                        <a onClick={() => this.props.history.push("/user/schedule")}>
                            {chiTietKhoaHoc.tenKhoaHoc}
                        </a>
                    </div>
                    <div>
                        <a onClick={() => { this.showModal() }}><Rate value={1} count={1} /> Đánh giá khoá học</a>
                        <button class="btn btn-outline-light" onClick={() => this.props.history.push("/user/schedule")}><i class="fa fa-share"> </i> Lộ trình</button>
                    </div>
                </nav>
                <div className="col-md-12 baihoc_div_content_bottom" >
                    <div className="col-md-9 pr-0 baihoc_div_left_list">

                        <div className="slideBaiHoc" hidden onClick={() => this.handleHienDSBai()}>
                            <i className="pr-3 fa fa-arrow-left" aria-hidden="true"></i>
                            Danh sách bài học
                        </div>

                        <div className="col-md-12 p-0">
                            {/* {
                            tenBaiHoc ? <div className="video-header">
                                <a onClick={() => this.props.push("/user")}>
                                    <i className="fa fa-arrow-left"></i>
                                </a>
                                <h6>{tenBaiHoc}</h6>
                            </div> : null
                        } */}
                            {this.renderLoaiBaiHoc()}
                        </div>
                        <div className="col-md-12 p-2 " >
                            <Tabs defaultActiveKey="1" animated={false} size={"large"}>
                                <TabPane tab="Mô tả khoá học" key="1">
                                    <BHMoTaKhoaHoc idKhoaHoc={this.props.match.params.idKhoaHoc} />
                                </TabPane>
                                {/* 
                                <TabPane tab="Q&A" key="2">
                                    <div className="col-md-12 text-center pb-5">
                                        <h2 class="col-md-12 pb-3 text-center">Thảo luận những vấn đề về bài học qua group facebook</h2>
                                        <FacebookProvider appId={idFacebook}>
                                            <Group
                                                href={chiTietKhoaHoc.faceBook}
                                                showSocialContext={true}
                                                showMetaData={true}
                                                skin="light"
                                            />
                                        </FacebookProvider>
                                    </div>
                                     <BHThaoLuan idKhoaHoc={this.props.match.params.idKhoaHoc} />

                                </TabPane> */}

                                <TabPane tab="Điểm bài tập" key="3">
                                    <BHDiemBaiTap idKhoaHoc={this.props.match.params.idKhoaHoc} />
                                </TabPane>
                                <TabPane tab="Q&A" key="4">
                                    <DanhSachQA dsQA={dsQA} />
                                </TabPane>
                            </Tabs>
                        </div>
                    </div>
                    <div className="baihoc_div_right_list" >
                        <div className="baihoc_div_right_less_top" >
                            <span>Nội dung bài học</span>
                            <a onClick={() => this.handleAnDSBai()}>
                                <i className="fa fa-times" ></i>
                            </a>
                        </div>
                        {this.renderDanhSachChuong()}
                        {/* {
                        <button className="btn-cuoi-khoa" onClick={this.hienThiBaiCuoiKhoa}>
                            Bài tập cuối khóa
                        </button>
                    } */}
                    </div>
                    {
                        // this.state.showBaiCuoiKhoa ? <BaiTapCuoiKhoa
                        //     dsTatCaBaiHoc={this.dsTatCaBaiHoc}
                        //     onHidenPopup={this.anBaiCuoiKhoa}
                        // /> : null
                    }
                </div>

                <Modal visible={this.state.visible} onCancel={this.closeModal} width={800} footer={null} centered={true}>
                    <DanhGiaKhoaHoc idKhoaHoc={this.props.match.params.idKhoaHoc} closeModal={this.closeModal} />
                </Modal>

                <Modal visible={this.state.visibleMentor} onCancel={this.closeModal} width={800} footer={null} centered={true}>
                    <DanhGiaMenTor idKhoaHoc={this.props.match.params.idKhoaHoc} closeModal={this.closeModal} />
                </Modal>
                <Loading />

            </div>
        )
    }

    componentDidMount = () => {

        const dNow = new Date();
        // if (dNow.getDate() == 28 || dNow.getDate() == 29)
        //     this.showModalMentor();

        const checkLogin = localStorage.getItem('checkLogin');
        const nguoiDung = JSON.parse(checkLogin);

        if (checkLogin === null) {
            localStorage.clear();
            this.props.history.push('/lms');
        }

        // lay chi tiet khoa hoc tu store
        this.props.dispatch({ type: LAY_CHI_TIET_KHOA_HOC, idKhoaHoc: this.props.match.params.idKhoaHoc })

        // lay danh sach binh luan tu store
        this.props.dispatch({ type: LAY_DANH_SACH_THAO_LUAN })
        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG });
        // lay danh sach lich su tuong tac
        this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: nguoiDung.id }) // lay danh sach lo trinh tu store


        this.props.dispatch({
            type: LAY_LICH_SU_HOC_TAP, payload: {
                maKhoaHoc: this.props.match.params.idKhoaHoc,
                maNguoiDung: nguoiDung.id
            }
        });

        //lay danh sach lo trinh
        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH })
        //lay tien trinh user
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC })

        //lay danh sach nop bai
        this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI })

        //gan loading
        var div_loading = document.getElementsByClassName("div_loading");
        div_loading[0].removeAttribute("hidden", "");
        setTimeout(() => {
            div_loading[0].setAttribute("hidden", "");
        }, 2000);

        if (window.screen.width < 900) {
            this.handleAnDSBai();
        }

        this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_KHOA_HOC }) // lay danh sach danh gia khoa hoc
        // this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_MENTOR }) // lay danh sach danh gia mentor

        this.props.dispatch({ type: LAY_DANH_SACH_QA, loTrinhId: this.props.match.params.loTrinhId })


        // kiem tra dia chi ip 1 tai khoan 1 may

        // if (nguoiDung.maNhomQuyen == "USER") {

        //     const publicIp = require('public-ip');

        //     (async () => {

        //         let ipV4 = await publicIp.v4();

        //         const promise = new Promise((resolve) => {
        //             this.props.dispatch({ type: LAY_NGUOI_DUNG_EMAIL, email: nguoiDung.email, callback: resolve });
        //         });

        //         promise.then(data => {

        //             if (data.iPaddress != ipV4) {
        //                 localStorage.clear();
        //                 this.props.history.push('/lms');
        //             }
        //         });


        //     })();


        // }
    }

}

const mapStateToProps = (state) => {
    return {
        chiTietKhoaHoc: state.KhoaHocReducer.chiTietKhoaHoc,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsThaoLuan: state.KhoaHocReducer.dsThaoLuan,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap,
        dsLichSu: state.LichSuTuongTacReducer.dsLichSu,
        dsTienTrinh: state.KhoaHocReducer.dsTienTrinhHoc,
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsQA: state.KhoaHocReducer.dsQA,
    }

}

export default connect(mapStateToProps)(ChiTietKhoaHoc)
