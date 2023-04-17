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
    LAY_TAT_CA_LICH_SU_HOC_TAP
} from '../../../redux/types/ActionsTypes';
import { Table, Tag, Modal, Tabs, Collapse, Card, Progress } from 'antd';
import { tinhSoNgay } from '../../../commons/format/FormatDate';
import { apiURL } from '../../../redux/Config/Config';
import { cutString } from '../../../commons/format/FormatNumber';
import InChungNhan from './InChungNhan';
import { dinhDangTheoNgay } from '../../../commons/format/FormatDate';
import ReactToPrint from 'react-to-print';
import LayOutInBangDiem from './LayOutInBangDiem';


const { TabPane } = Tabs;
const { Panel } = Collapse;

class DanhSachBaiTap extends Component {

    state = {
        visible: false,
        nhanXet: "",
        chungNhan: [],
        lotrinh: { id: 0 }, // tao lo trinh rong de setstate in bang diem
    };

    showModal = (nhanXet) => {
        this.setState({
            visible: true,
            nhanXet: nhanXet
        });
    };
    handleCancel = e => {

        this.setState({
            visible: false,
        });
    };



    xuatBaiNop = () => {


        const { dsKhoaHocTheoLoTrinh, dsChuong, dsTienTrinhHoc, dsLoTrinh, dsBaiHoc, dsNopBai, dsLichSuHocTap } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let lstNopBai = dsNopBai.filter(n => n.nguoiDungId == nguoiDung.id);
        let lstTienTrinh = dsTienTrinhHoc.filter(n => n.nguoiDungId == nguoiDung.id);

        let noiDung = [];
        lstTienTrinh.map(tientrinh => {
            if (tientrinh) {
                let lotrinh = dsLoTrinh.find(n => n.id == tientrinh.loTrinhId);



                if (lotrinh) {

                    let slBaiTap = 0;
                    let slDaXong = 0;
                    let slChuaXong = 0;

                    let tongDiem = 0;

                    let noiDungKhoaHoc = [];

                    lotrinh.danhSachKhoaHoc.map(idkhoa => {
                        let khoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id == idkhoa);

                        if (khoaHoc) {

                            //lay danh sach bai tap
                            let noiDungBaiTap = [];
                            let noiDungNopBai = [];

                            let lstChuongHoc = dsChuong.filter(n => n.khoaHocId == khoaHoc.id);

                            lstChuongHoc.map(chuonghoc => {
                                let lstBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == chuonghoc.id && (n.maLoaiBaiHoc == "QUIZ" || n.maLoaiBaiHoc == "QUIZ_WRITE"));
                                slBaiTap += lstBaiHoc.length;
                                noiDungBaiTap.push(
                                    lstBaiHoc.map(baitap =>
                                        <th>{baitap.tenBaiHoc}</th>
                                    )
                                )

                                noiDungNopBai.push(
                                    lstBaiHoc.map(baitap => {
                                        let nopbai = lstNopBai.find(n => n.baiHocId == baitap.id);

                                        nopbai ? slDaXong += 1 : slChuaXong += 1;

                                        //kiem tra han nop bai tap 
                                        //xu ly ngay het han 0: da lam, < 0: het han, > 0 xuat han nop

                                        if (nopbai) {
                                            if (nopbai.baiLam != 0) {
                                                if (nopbai.diem == 0) {
                                                    slChuaXong += 1;
                                                    return <td><Tag color="blue"><i className="fa fa-clock-o"></i> Chờ chấm</Tag></td>
                                                } else {
                                                    tongDiem += nopbai.diem;
                                                    return <td><span className="text-primary h3">{nopbai.diem}</span></td>
                                                }
                                            } else {
                                                let hetHan = tinhSoNgay(new Date(nopbai.hanNopBai), new Date());
                                                slChuaXong += 1;

                                                return <td>{hetHan < 0 ? <Tag color="red"><i className="fa fa-times-circle-o"></i> Hết hạn nộp</Tag> : <b>Còn {hetHan} ngày</b>}</td>
                                            }
                                        } else {
                                            return <td><Tag color="magenta"> Chưa làm</Tag></td>
                                        }


                                    }
                                    )
                                )
                            })

                            let dataTienTrinh = dsLichSuHocTap.find(n => n.maKhoaHoc == khoaHoc.id);

                            noiDungKhoaHoc.push(
                                <div className="row">
                                    <div className="col-md-3 pb-3">

                                        <Card

                                            style={{ width: 260, height: 300 }}
                                            cover={<img alt="example" src={apiURL + khoaHoc.hinhAnh} style={{ height: 200 }} />}

                                        >
                                            <div className="font-weight-bold" style={{ height: 45 }}

                                            >{cutString(khoaHoc.tenKhoaHoc)}</div>

                                            <Progress percent={Math.round(dataTienTrinh ? dataTienTrinh.mucDoHoanThanh : 0)} />


                                        </Card></div>
                                    <div className="col-md-9 pb-3">
                                        <table className="table  table-bordered">

                                            <tr class="thead-light">
                                                {noiDungBaiTap}
                                            </tr>

                                            <tr>
                                                {noiDungNopBai}
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            )
                        }

                    })

                    let diemTB = (tongDiem / 10 / slBaiTap).toFixed(1);

                    noiDung.push(<Collapse className="mb-3" >
                        <Panel header={lotrinh.tenLoTrinh} key={lotrinh.id}>
                            {slChuaXong == 0 ? <h2 className="pt-0 mb-2 text-danger">Điểm Trung Bình ({slBaiTap} bài): {diemTB}
                                <button className="btn btn-success mx-3" onClick={() => { this.layThongTinChungNhan(lotrinh.id); this.showModal(); }}>Chứng nhận</button>

                                <button className="btn btn-primary" onClick={async () => {
                                    await this.setState({ lotrinh });

                                    document.getElementById('btn-print').click();



                                }}><i class="fa fa-print" aria-hidden="true"></i> In bảng điểm
                                        </button>


                                <div style={{ display: "none" }}>
                                    <ReactToPrint

                                        trigger={() => {

                                            return <button id="btn-print" >
                                            </button>;
                                        }}
                                        content={() => this.componentRef}

                                    />
                                    <LayOutInBangDiem ref={el => (this.componentRef = el)} dsNopBai={dsNopBai} dsBaiHoc={dsBaiHoc} lotrinh={this.state.lotrinh} dsChuong={dsChuong} nguoiDung={nguoiDung} dsKhoaHocTheoLoTrinh={dsKhoaHocTheoLoTrinh} dsTienTrinhHoc={dsTienTrinhHoc} />
                                </div>
                                
                            </h2>
                                :
                                <h2 className="pt-0 mb-2 text-danger">
                                    Bạn cần hoàn thành {slChuaXong} bài tập nữa để in chứng nhận và bảng điểm </h2>
                            }


                            {noiDungKhoaHoc}
                        </Panel>


                    </Collapse>)
                }
            }


        })

        return noiDung;
    }
    layThongTinChungNhan = (idLoTrinh) => {

        const { dsKhoaHocTheoLoTrinh, dsChuong, dsTienTrinhHoc, dsLoTrinh, dsBaiHoc, dsNopBai } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let lstNopBai = dsNopBai.filter(n => n.nguoiDungId == nguoiDung.id);
        let tientrinh = dsTienTrinhHoc.find(n => n.nguoiDungId == nguoiDung.id && n.loTrinhId == idLoTrinh);

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




            let model = {
                idNguoiDung: nguoiDung.id,
                idLoTrinh: idLoTrinh,
                tenKH: nguoiDung.hoTen,
                tenLop: nameCT[0],
                thoiGianDaoTao: lotrinh.thoiHan,

                soChungNhan: soChungNhan,
                ngayCap: tientrinh && dinhDangTheoNgay(tientrinh.ngayBatDauHoc)
            }

            this.setState({ chungNhan: model })
        }
    }
    render() {

        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();


        return (
            <div className="container" style={{ background: "white" }}>

                <h3 className="py-3"> DANH SÁCH ĐIỂM BÀI TẬP</h3>
                <h5 className="text-info ">
                    Điều kiện in chứng nhận và bảng điểm: <br />
                    <i>- Hãy hoàn thành tất cả các bài tập của khóa học.</i>
                    <br />
                    <i>- Điểm trung bình khóa học trên 7 (đối với chứng nhận).</i>
                    <br />
                    <i>- Mỗi khóa học bạn sẽ được in chứng nhận và bảng điểm riêng.</i>
                </h5>
                <div className="row">
                    <div className="col-md-12">

                        {this.xuatBaiNop()}

                    </div>
                    <Modal
                        title="In và chia sẻ chứng nhận này đến bạn bè để mọi người biết chiến tích của mình nhé "
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        footer={null}
                        centered={true}
                        width={1000}
                    >
                        <InChungNhan chungNhan={this.state.chungNhan} />
                    </Modal>
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

        this.props.dispatch({ type: LAY_TAT_CA_LICH_SU_HOC_TAP, payload: { maNguoiDung: nguoiDung.id } })// lay lich su hoc tap

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

        dsLichSuHocTap: state.LichSuHocTapReducer.dsLichSuHocTap,

    }

}

export default connect(mapStateToProps)(DanhSachBaiTap)