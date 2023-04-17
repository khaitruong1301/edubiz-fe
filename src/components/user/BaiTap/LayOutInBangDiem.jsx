import React, { Component } from 'react';
import chuky from '../../../assets/chuky.png';
import logo from '../../../assets/logo_opcacity.png';
import { urlMainPage, urlMainPageOffline } from '../../../redux/Config/Config';
import { tinhSoThang } from '../../../commons/format/FormatDate'

let diemTB = 0;

export default class LayOutInBangDiem extends Component {

    state = {
        lotrinh: { id: 0 },
    }

    static getDerivedStateFromProps(props, state) {

        const lotrinhProps = props.lotrinh;
        return {
            ...state, lotrinh: lotrinhProps
        }

    }
    demBaiTap = (idkhoa) => {
        const { dsKhoaHocTheoLoTrinh, dsChuong, dsBaiHoc } = this.props;
        let khoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id == idkhoa);
        let slBaiTap = 0;
        if (khoaHoc) {

            let lstChuongHoc = dsChuong.filter(n => n.khoaHocId == khoaHoc.id);

            lstChuongHoc.map(chuonghoc => {
                let lstBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == chuonghoc.id && (n.maLoaiBaiHoc == "QUIZ" || n.maLoaiBaiHoc == "QUIZ_WRITE"));
                slBaiTap += lstBaiHoc.length;
            })
        }
        return slBaiTap;
    }

    xuatBaiNop = () => {

        const { lotrinh } = this.state;
        const { dsKhoaHocTheoLoTrinh, dsChuong, dsBaiHoc, dsNopBai } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let lstNopBai = dsNopBai.filter(n => n.nguoiDungId == nguoiDung.id);

        let noiDung = [];
        let iSTT = 0;
        let maKhoaHoc = 0;

        if (lotrinh.id != 0) {

            let tongDiem = 0;
            let slBaiTap = 0;


            lotrinh.danhSachKhoaHoc.map(idkhoa => {
                let khoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id == idkhoa);

                if (khoaHoc) {
                    //  dem de tao rowspan khoa cho table
                    let demBaiHoc = this.demBaiTap(idkhoa);


                    let lstChuongHoc = dsChuong.filter(n => n.khoaHocId == khoaHoc.id);

                    lstChuongHoc.map(chuonghoc => {
                        let lstBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == chuonghoc.id && (n.maLoaiBaiHoc == "QUIZ" || n.maLoaiBaiHoc == "QUIZ_WRITE"));
                        slBaiTap += lstBaiHoc.length;



                        lstBaiHoc.map(baitap => {
                            let nopbai = lstNopBai.find(n => n.baiHocId == baitap.id);

                            //kiem tra han nop bai tap 
                            //xu ly ngay het han 0: da lam, < 0: het han, > 0 xuat han nop

                            if (nopbai) {

                                if (nopbai.baiLam != 0) {
                                    if (nopbai.diem == 0) {
                                        // return <td><Tag color="blue"><i className="fa fa-clock-o"></i> Chờ chấm</Tag></td>
                                    } else {
                                        tongDiem += nopbai.diem;

                                        noiDung.push(<tr >
                                            <td style={{ padding: 10, textAlign: "center" }}>
                                                {++iSTT}
                                            </td>
                                            <td style={{ padding: 10 }}>
                                                {baitap.tenBaiHoc}
                                            </td>
                                            <td style={{ padding: 10, textAlign: "center" }}>{Number(nopbai.diem)}</td>
                                            <td style={{ padding: 10, textAlign: "center" }}>{Number(nopbai.diem) / 10}</td>
                                            {maKhoaHoc != khoaHoc.id && <td rowSpan={demBaiHoc} style={{ padding: 10, textAlign: "center" }}>{khoaHoc.tenKhoaHoc}</td>}
                                        </tr>
                                        )

                                        // gan ma khoa hoc de hien ten 1 lan
                                        if (maKhoaHoc = khoaHoc.id)
                                            maKhoaHoc = khoaHoc.id

                                    }
                                } else {
                                    // let hetHan = tinhSoNgay(new Date(nopbai.hanNopBai), new Date());
                                    // slChuaXong += 1;

                                    // return <td>{hetHan < 0 ? <Tag color="red"><i className="fa fa-times-circle-o"></i> Hết hạn nộp</Tag> : <b>Còn {hetHan} ngày</b>}</td>
                                }
                            } else {
                                // return <td><Tag color="magenta"> Chưa làm</Tag></td>
                            }


                        }

                        )
                    })


                }

            })

            diemTB = (tongDiem / 10 / slBaiTap).toFixed(1);


        }


        return noiDung;
    }

    render() {
        const { lotrinh } = this.state;
        const { nguoiDung, dsTienTrinhHoc } = this.props;
        let dNow = new Date();

        if (diemTB == 0)
            this.xuatBaiNop()

        let xepLoai = "Dưới Trung Bình";

        if (diemTB >= 5)
            xepLoai = "Trung Bình";
        if (diemTB >= 6)
            xepLoai = "Trung Bình Khá";
        if (diemTB >= 7)
            xepLoai = "Khá";
        if (diemTB >= 8)
            xepLoai = "Giỏi";
        if (diemTB >= 9)
            xepLoai = "Xuất sắc";

        //lay thoi gian hoc theo thang
        let tientrinh = dsTienTrinhHoc.find(n => n.nguoiDungId == nguoiDung.id && n.loTrinhId == lotrinh.id);


        return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: "space-between", height: "100%" }}>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', background: `url(${logo}) center center / 80% no-repeat` }}>
                    <b style={{ fontSize: '20pt', textAlign: 'center', width: '100%' }}>
                        CyberSoft - Đào tạo chuyên gia lập trình
                    <br />
                    BẢNG ĐIỂM
                </b>
                    <table style={{ margin: '0 20px' }}>
                        <tbody><tr >
                            <td ><u>Họ tên:</u> <b> {nguoiDung.hoTen}</b></td>
                            <td ><u>Thời gian học:</u> <b>
                                {tientrinh && tinhSoThang(new Date(tientrinh.ngayBatDauHoc), new Date(tientrinh.ngayKetThuc))} tháng
                            </b></td>
                        </tr>
                            <tr>
                                <td><u>Lộ trình: </u> <b> {lotrinh.tenLoTrinh}</b> </td>
                                <td><u>Hình thức học:</u><b> Online trực tuyến</b> </td>
                            </tr>
                        </tbody></table>
                    <table border={1} style={{ margin: '20px' }}>
                        <tbody><tr style={{ textAlign: "center", fontWeight: "bold" }}>
                            <td style={{ padding: 10 }}>STT</td>
                            <td style={{ padding: 10 }}>Tên bài tập/dự án </td>
                            <td style={{ padding: 10 }}>Điểm</td>
                            <td style={{ padding: 10 }}>Hệ 10</td>
                            <td style={{ padding: 10 }} width="20%">Khóa học</td>
                        </tr>

                            {this.xuatBaiNop()}

                        </tbody></table >
                    <table style={{ margin: '20px ' }}>
                        <tbody><tr >
                            <td style={{ fontSize: '20pt', fontWeight: 'bold' }} width="35%">Điểm trung bình toàn khóa: </td>
                            <td style={{ fontSize: '20pt', fontWeight: 'bold' }}> {diemTB}</td>
                        </tr>
                            <tr>
                                <td style={{ fontSize: '20pt', fontWeight: 'bold' }}> Xếp loại: </td>
                                <td style={{ fontSize: '20pt', fontWeight: 'bold' }}>  {xepLoai}</td>
                            </tr>
                        </tbody></table>
                    <table style={{ textAlign: 'center' }}>
                        <tbody><tr>
                            <td style={{ width: '50%' }}> </td>
                            <td style={{ fontSize: '20pt' }}>
                                Ngày {dNow.getDate()} tháng {dNow.getMonth() + 1} năm {dNow.getFullYear()}
                                <br />
                                <br />
                                <b style={{ fontSize: '20pt', padding: "0 20px" }}>GIÁM ĐỐC ĐIỀU HÀNH</b>
                                <br />
                                <br />
                                <img src={chuky} width="30%" />
                                <br />
                                <b style={{ fontSize: '20pt' }}> Lê Quang Song</b>
                            </td>
                        </tr>
                        </tbody></table>

                </div>
                <div style={{ padding: 20, display: "flex", justifyContent: "space-around" }}>
                    <span>
                        {urlMainPageOffline}
                    </span>
                    <span>
                        {urlMainPage}
                    </span>


                </div>
            </div >



        )
    }
}