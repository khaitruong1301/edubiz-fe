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
    LAY_LICH_SU_TUONG_TAC_THEO_USER
} from '../../../redux/types/ActionsTypes';
import BHMoTaKhoaHoc from '../BaiHoc/BHMoTaKhoaHoc';
import { Tabs, Checkbox, Button, message, Tag, Dropdown, Modal, Rate } from 'antd';
import '../BaiHoc/BaiHoc.css';
import VideoPlayer from '../../video/VideoPlayer';
import BaiTapMain from '../../bai-tap/BaiTapMain';
import BaiTapCuoiKhoa from '../../bai-tap-cuoi-khoa/BaiTapCuoiKhoa';
import { themLichSu, suaLichSu } from '../../../commons/user/UserServices';
import { dinhDangNgayCheck } from '../../../commons/format/FormatDate';
import Loading from '../../loading/Loading';
import BaiTapNop from '../BaiTapNop/BaiTapNop';
import logocyber from "../../../assets/none.png";
import { urlMainPage } from '../../../redux/Config/Config';
import BHDiemBaiTap from '../BaiHoc/BHDiemBaiTap';
import DanhGiaKhoaHoc from '../DanhGiaKhoaHoc';
import BaiTapAnswer from '../../bai-tap-dap-an/BaiTapAnswer';
import DanhGiaMenTor from '../DanhGiaMenTor';
import BaiActicle from '../BaiHoc/BaiActicle';
import { GetTimeDemo, getCodeDemo } from '../../../commons/user/UserServices';


const { TabPane } = Tabs;
let baiHocDau = 0;
var x = 0;

let sNuocNgoai=false;

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
            visibleMentor: false
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

    handleBaiHoc = (baiHoc) => {
        let { noiDung, maLoaiBaiHoc, tenBaiHoc } = baiHoc;

        //gan loading
        var div_loading = document.getElementsByClassName("div_loading");
        div_loading[0].removeAttribute("hidden", "");

        switch (maLoaiBaiHoc) {
            case 'VIDEO_FPT':

                axios.get(apiURL + `/api/file/ftp-video/${noiDung}`,{ headers: {  apikey:'UPD124yRTWF124QJFweUaCYSECETBERS' } })
                    .then(res => {

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
                baiHoc.xemDemo ?
                    <div className={className} key={index} >
                        {
                            <a onClick={() => { this.handleBaiHoc(baiHoc) }}>
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
                                            // baiHoc.maLoaiBaiHoc == "VIDEO_FPT" && baiHoc.moTa != ""
                                            //     ?
                                            //     <div className="col-6" style={{ fontSize: "12px" }}>
                                            //         <Dropdown
                                            //             overlay={
                                            //                 <Tag className="p-2" key="1" onClick={(e) => e.stopPropagation()}><a href={apiURL + baiHoc.moTa}><i className="pr-2 fa fa-file-archive-o
                                            //                 "></i>{baiHoc.moTa}</a></Tag>
                                            //             }
                                            //             trigger={['click']}
                                            //             onClick={(e) => e.stopPropagation()}
                                            //         >
                                            //             <Button size="small">
                                            //                 <i className="fa fa-folder-open pr-1"></i>  Tài nguyên <i className="fa fa-angle-down pl-1"></i>
                                            //             </Button>
                                            //         </Dropdown>
                                            //     </div>
                                            //     :
                                            //     ""
                                        }
                                    </div>
                                </div>
                            </a>
                        }
                    </div>
                    :
                    ""
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
                    hideDone={true}
                    sNuocNgoai={sNuocNgoai}
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
        console.log(baiHocHienTai)
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
                    let dateNow = Date.parse(dinhDangNgayCheck(new Date()));
                    let dateEnd = Date.parse(dinhDangNgayCheck(tienTrinh.ngayKetThuc));
                    if (dateNow <= dateEnd)
                        checkTonTai = true;
                }

                if (checkTonTai)
                    return;
            })

            if (!checkTonTai)
                this.props.history.push('/');

        } else {
            this.props.history.push('/');
        }

    }

    // time hh-mm:ss
    getTimeDemo = () => {

        const code = localStorage.getItem('demoCode');
        var div_time = document.getElementById("timeEXPIRED");
        var str = "";


        GetTimeDemo(code).then(res => {
            str = res.data.content[0];

            if (str != "0") {
                // Update the count down every 1 second
                setInterval(() => {

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
                        if (div_time)
                            div_time.innerHTML = " ";

                        localStorage.clear();
                        if (x == 0) {
                            x = 1;
                            message.success("Cảm ơn bạn đã tham gia các bài demo trên hệ thống học lập trình trực tuyến của CyberLearn - Một sản phẩm của CyberSoft")
                            setTimeout(() => {
                                window.location = urlMainPage;
                            }, 3000)
                        }


                    }
                    str = hours + "-" + minutes + ":" + seconds;

                }, 1000);

            } else {

                localStorage.clear();
                this.props.history.push("/")
            }
        }).catch(err => { console.log(err); clearInterval(x); localStorage.clear(); window.location = urlMainPage; })



    }

    render() {
        const { tenBaiHoc } = this.state;
        const { chiTietKhoaHoc, dsLoTrinh } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
        const { idKhoaHoc } = this.props.match.params;

        let listLoTrinh = [];
        dsLoTrinh.map(ds => {
            if (ds.danhSachKhoaHoc.find(n => n == idKhoaHoc))
                listLoTrinh = ds;
        })

        return (
            <div className="row mr-0" style={{ background: "white", fontFamily: "open sans,helvetica neue,Helvetica,Arial,sans-serif" }}>
                <nav class="navbar navbar-dark bg-dark navbar-baihoc" >
                    <div>
                        <a onClick={() => this.props.history.push("/")}>
                            <img src={logocyber} width="30" />
                        </a>
                    |
                    <a onClick={() => this.props.history.push("/demo")}>
                            {chiTietKhoaHoc.tenKhoaHoc}
                        </a>
                        <button class="btn btn-outline-light" onClick={() => this.props.history.push("/demo")}><i class="fa fa-share"> </i> Lộ trình</button>

                    </div>
                    <div id="timeEXPIRED" className="mr-3">{this.getTimeDemo()}
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
                        <a target="_blank" href={listLoTrinh.moTa}><button className="btn btn-warning ml-5">Xem thêm</button></a>
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
        const checkCodeDemo = localStorage.getItem('demoCode');

        if (checkCodeDemo == null) {
            window.location = urlMainPage;
        }

          //lay ma code 
          getCodeDemo(checkCodeDemo).then(res => {
             sNuocNgoai =  res.data.content.nuocNgoai;
          }).catch(err => console.log(err));
  
        // lay chi tiet khoa hoc tu store
        this.props.dispatch({ type: LAY_CHI_TIET_KHOA_HOC, idKhoaHoc: this.props.match.params.idKhoaHoc })

        // lay danh sach binh luan tu store
        this.props.dispatch({ type: LAY_DANH_SACH_THAO_LUAN })
        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG });



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
        this.props.dispatch({ type: LAY_DANH_SACH_DANH_GIA_MENTOR }) // lay danh sach danh gia mentor


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
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh
    }

}

export default connect(mapStateToProps)(ChiTietKhoaHoc)
