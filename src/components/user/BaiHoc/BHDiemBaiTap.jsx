import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_CHUONG,
    LAY_CHI_TIET_KHOA_HOC,
    LAY_DANH_SACH_NOP_BAI,
    LAY_DANH_SACH_BAI_HOC,
    LAY_DANH_SACH_NGUOI_DUNG
} from '../../../redux/types/ActionsTypes';
import { Table, Tag, Modal } from 'antd';
import { tinhSoNgay, dinhDangTheoNgay } from '../../../commons/format/FormatDate';


class BHDiemBaiTap extends Component {

    state = {
        visible: false,
        nhanXet: ""
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

    //kiem tra bai tap co thuoc khoa hoc nay khong
    checkBaiTap = (baiHocId) => {
        const { chiTietKhoaHoc, dsChuong } = this.props;

        let listChuong = dsChuong.filter(n => n.khoaHocId == chiTietKhoaHoc.id);
        let check = false;
        listChuong.map(item => {
            let danhSachMaBaiHoc = JSON.parse(item.danhSachMaBaiHoc);
            if (danhSachMaBaiHoc && danhSachMaBaiHoc.findIndex(n => n == baiHocId) != -1)
                check = true;
        })
        return check;
    }

    xuatBaiNop = () => {
        const { chiTietKhoaHoc, dsChuong, dsNopBai, dsBaiHoc, dsNguoiDung } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let listNopBai = dsNopBai.filter(n => n.nguoiDungId == nguoiDung.id);
        let lstNopBaiThuocKhoa = [];

        //duyet va kiem tra bai tap nao thuoc khoa hoc nay
        listNopBai.map(item => {
            if (this.checkBaiTap(item.baiHocId))
                lstNopBaiThuocKhoa.push(item);
        })

        //tao data moi de show
        let modelNopBai = [];

        lstNopBaiThuocKhoa.map(item => {
            let baiHoc = dsBaiHoc.find(n => n.id == item.baiHocId);

            //lay ngay het han de sort
            let soNgayHetHan = tinhSoNgay(new Date(item.hanNopBai), new Date());
            soNgayHetHan = soNgayHetHan != -1 ? soNgayHetHan + 1 : soNgayHetHan;

            if (baiHoc) {
                let loaiBaiHoc = "";
                switch (baiHoc.maLoaiBaiHoc) {
                    case "QUIZ":
                        loaiBaiHoc = "Trắc nghiệm";
                        soNgayHetHan = 0; // neu trac nghiem = 0
                        break;
                    case "QUIZ_WRITE":
                        loaiBaiHoc = "Viết";
                        soNgayHetHan = item.baiLam != "0" ? 0 : soNgayHetHan; // kiem tra da nop bai chua, neu nop roi = 0
                        break;

                }
                if (baiHoc.maLoaiBaiHoc == "QUIZ_WRITE" || (baiHoc.maLoaiBaiHoc == "QUIZ" && item.diem >= 50)) {
                    item = { ...item, tenBaiHoc: baiHoc.tenBaiHoc, loaiBaiTap: loaiBaiHoc, soNgayHetHan: soNgayHetHan };

                    modelNopBai.push(item);
                }

            }

        })

        const columns = [
            {
                title: 'Tên bài tập',
                dataIndex: 'tenBaiHoc',
            },
            {
                title: 'Thời gian làm',
                key: 'soNgayHetHan',
                sorter: (a, b) => a.soNgayHetHan - b.soNgayHetHan,
                render: (text, record) => {
                    //xu ly ngay het han 0: trac nghiem, da lam, < 0: het han, > 0 xuat han nop
                    if (record.soNgayHetHan == 0)
                        return <Tag color="green"><i className="fa fa-check"></i> Hoàn thành</Tag>
                    if (record.soNgayHetHan < 0)
                        return <Tag color="red"><i className="fa fa-times-circle-o"></i> Hết hạn</Tag>

                    return <span><b>{record.soNgayHetHan == 1 ? "Hôm nay" : record.soNgayHetHan + " Ngày"}  </b></span>
                }

            },
            {
                title: 'Loại bài tập',
                dataIndex: 'loaiBaiTap',
                sorter: (a, b) => a.loaiBaiTap.length - b.loaiBaiTap.length,
            },
            {
                title: 'Bài làm',
                key: 'baiLam',
                render: (text, record) => {
                    if (record.baiLam != 0) {

                        let baiHoc = dsBaiHoc.find(n => n.id == record.baiHocId);

                        if (baiHoc && baiHoc.maLoaiBaiHoc == "QUIZ_WRITE")
                            return <a href={record.baiLam} target="_blank"><button className="btn btn-success"><i className="fa fa-eye"></i></button></a>;
                        else
                            return "";
                    }
                }
            },
            {
                title: 'Điểm',
                key: 'diem',
                sorter: (a, b) => a.diem - b.diem,

                render: (text, record) => {

                    let baiHoc = dsBaiHoc.find(n => n.id == record.baiHocId);
                    if (baiHoc && baiHoc.maLoaiBaiHoc == "QUIZ")
                        return <span><b>{record.diem}</b></span>;

                    if (record.baiLam != 0) {
                        if (record.diem == 0) {
                            return <span>Chờ chấm</span>
                        } else {
                            return <span><b>{record.diem}</b></span>
                        }
                    }
                }
            },

            {
                title: 'Nhận xét',
                key: 'nhanXet',
                render: (text, record) => {
                    let baiHoc = dsBaiHoc.find(n => n.id == record.baiHocId);

                    let chiTiet = "";
                    if (record.nguoiCham != "")
                        chiTiet = JSON.parse(record.nguoiCham);

                    let mentor = "";
                    if (chiTiet[1])
                        mentor = dsNguoiDung.find(n => n.id == chiTiet[1])?.hoTen;


                    if (record.diem != 0) {
                        return <span>
                            <button className="btn btn-success" onClick={() => this.showModal(record.nhanXet)}><i className="fa fa-commenting-o"></i></button><br />
                            {chiTiet != "" && <span>
                                <Tag>Ngày nộp: {dinhDangTheoNgay(chiTiet[0])}</Tag> <br />
                                <Tag>Người chấm: {mentor}</Tag> <br />
                                <Tag>Ngày chấm: {dinhDangTheoNgay(chiTiet[2])}</Tag>
                            </span>}

                        </span >;
                    }
                }
            },
        ];
        return <Table columns={columns} dataSource={modelNopBai} />

    }

    render() {
        const { chiTietKhoaHoc } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        return (
            <div className="container">
                <div className="col-md-12">
                    {this.xuatBaiNop()}

                </div>
                <Modal
                    title="Nhận xét"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    centered={true}
                >
                    {htmlToReactParser.parse(this.state.nhanXet)}
                </Modal>
            </div>
        )
    }
    componentDidMount = () => {
        const { idKhoaHoc } = this.props;
        // lay chi tiet khoa hoc tu store
        this.props.dispatch({ type: LAY_CHI_TIET_KHOA_HOC, idKhoaHoc: idKhoaHoc })
        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach chuong hoc tu store

        this.props.dispatch({ type: LAY_DANH_SACH_NOP_BAI }) // lay danh sach nop bai
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc

        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG })

    }
}
const mapStateToProps = (state) => {

    return {
        chiTietKhoaHoc: state.KhoaHocReducer.chiTietKhoaHoc,
        dsChuong: state.KhoaHocReducer.dsChuong,
        dsNopBai: state.BaiHocReducer.dsNopBai,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung
    }

}

export default connect(mapStateToProps)(BHDiemBaiTap)
