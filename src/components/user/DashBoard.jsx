import React, { Component } from 'react'
import { Carousel, Card, Progress, Collapse } from 'antd';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_KHOA_HOC,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_LICH_SU_TUONG_TAC_THEO_USER,
    LAY_DANH_SACH_BAI_HOC,
    LAY_DANH_SACH_LO_TRINH,
    LAY_TAT_CA_LICH_SU_HOC_TAP,
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_HOP_THU
} from '../../redux/types/ActionsTypes';
import ChartBar from './ChartBar';
import ChartLine from './ChartLine';
import { apiURL } from '../../redux/Config/Config';
import { cutString } from '../../commons/format/FormatNumber';
import { dinhDangNgayCheck } from '../../commons/format/FormatDate';

const { Panel } = Collapse;


class DashBoard extends Component {

    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin'))
    }

    //lay thong bai hoc theo khoa hoc
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

    checkHanHoc = (idKhoaHoc) => {
        let { dsTienTrinhHoc, dsLoTrinh } = this.props;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        let listLoTrinh = [];
        let checkTonTai = false; // dat mot bien dem de kiem tra 0: chua ghi danh, het han hoc, 1: nguoc lai

        //lay danh sach lo trinh da ghi danh 
        dsTienTrinhHoc = dsTienTrinhHoc.filter(n => n.nguoiDungId == nguoiDung.id);

        if (dsTienTrinhHoc.length > 0) { //kiem tra ghi danh chua

            //loc khoa hoc co trong lo trinh nao
            dsLoTrinh.map(ds => {
                if (ds.danhSachKhoaHoc.find(n => n == idKhoaHoc))
                    listLoTrinh.push(ds.id);
            })
            //loc lo trinh da duoc ghi danh chua
            listLoTrinh.map(item => {
                let tienTrinh = dsTienTrinhHoc.find(n => n.loTrinhId == item);

                //kiem tra con han hoc hay khong
                if (tienTrinh) {
                    let dateNow = Date.parse(dinhDangNgayCheck(new Date()));
                    let dateEnd = Date.parse(dinhDangNgayCheck(tienTrinh.ngayKetThuc));
                    if (dateNow <= dateEnd)
                        checkTonTai = true;
                }

                if (checkTonTai)
                    return;
            })
        }
        return checkTonTai;
    }

    layKhoaHoc = (dsLichSuHocTap) => {

        const { dsKhoaHocTheoLoTrinh, linkBaiHoc, dsTienTrinhHoc } = this.props;

        let data = [];
        let soLuongKhoa = 0;//dem so luong khoa hoc xuat ra toi da 4

        //xu tien trinh 
        //loc lay khoa hoc chua hoan thanh
        dsLichSuHocTap = dsLichSuHocTap.filter(n => n.mucDoHoanThanh !== 100);

        //(lay 4 data sort duoi len)
        dsLichSuHocTap = dsLichSuHocTap.sort((a, b) => b.mucDoHoanThanh - a.mucDoHoanThanh);

        return dsLichSuHocTap.map(e => {
            if (soLuongKhoa < 4) {
                //loc khoa hoc theo id tien trinh hoc
                data = dsKhoaHocTheoLoTrinh.find(n => n.id === e.maKhoaHoc);

                if (data !== undefined) {
                    if (this.checkHanHoc(data.id)) {
                        soLuongKhoa++;
                        return (

                            <div className="col-md-3 div_ds_dang_hoc">
                                <Card
                                    hoverable
                                    style={{ width: 230, height: 250 }}
                                    cover={<img alt="example" src={apiURL + data.hinhAnh} />}
                                    onClick={() => linkBaiHoc(e.maKhoaHoc, "0")}
                                >
                                    <div className="font-weight-bold" style={{ height: 50 }}>{cutString(data.tenKhoaHoc)}</div>
                                    <div className="row">
                                        <div className="col-9 pr-1">
                                            {" Tổng bài học: " + this.layTongBaiHoc(data.id)}
                                            <br />
                                            {"Số bài đã học: " + e.tongSoBaiDaHoc}
                                        </div>
                                        <div className="col-3 p-0">
                                            <Progress width={50} type="circle" percent={Math.round(e.mucDoHoanThanh)} />
                                        </div>
                                    </div>

                                </Card></div>)
                    }

                }
            }

        })

    }

    layBaiHocTruoc = (dsTienTrinhHoc) => {

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        const { dsBaiHoc, dsKhoaHocTheoLoTrinh, dsLoTrinh, linkBaiHoc, dsLichSu } = this.props;

        let data = [];
        let dataKhoaHoc = [];
        let dataBaiHoc = [];
        data = dsLichSu.filter(n => n.nguoiDungId == nguoiDung.id && n.hanhDong == "BAIDANGHOC").sort((a, b) => Date.parse(b.ngayTao) - Date.parse(a.ngayTao));

        return data.map(ds => {
            //lay data Khoa Hoc
            dataKhoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id == ds.loaiSuKien);

            let idKhoaHoc = dataKhoaHoc !== undefined ? dataKhoaHoc.id : "0";

            //lay data bai hoc 
            dataBaiHoc = dsBaiHoc.find(n => n.id == ds.idSuKien);
            if (dataBaiHoc != undefined) {
                return (<div className="row pb-4 div_ds_baihoctruoc" >
                    <a onClick={() => linkBaiHoc(idKhoaHoc, "0")}>
                        <div className="col-md-4">
                            {dataKhoaHoc !== undefined ? <img src={apiURL + dataKhoaHoc.hinhAnh} /> : " "}
                        </div>
                        <div className="col-md-8">
                            <b> {cutString(dataBaiHoc.tenBaiHoc, 20)}</b> - {dataBaiHoc.thoiLuong} phút

                            <br />
                                    Khoá {dataKhoaHoc !== undefined ? cutString(dataKhoaHoc.tenKhoaHoc) : ""}
                        </div>
                    </a>
                </div>)
            }


        })
    }



    render() {
        const { dsTienTrinhHoc, dsLichSuHocTap, dsHopThu } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        let lstHopThu = dsHopThu.filter(n => n.chayChinh == true).sort((a, b) => b.id - a.id);

        let dem = 1;

        return (
            <div className="container">
                <Collapse defaultActiveKey={['1']} >
                    <Panel header="Thông tin ưu đãi, khóa học mới trung tâm" key="1">
                        {lstHopThu.map(item => {
                            dem += 1
                            return dem % 2 == 0 ? <div className="col-md-12 p-3" >
                                <div className="col-md-5">
                                    <img style={{ borderRadius: " 20px" }} src={apiURL + item.hinhAnh} width="100%" />
                                </div>

                                <div className="col-md-7 p-3" style={{
                                    background: "linen", borderRadius: " 20px", border: "1px dashed",
                                    margin: "100px 0 0 0px"
                                }}>
                                    {htmlToReactParser.parse(item.noiDung)}

                                </div>
                            </div>
                                :
                                <div className="col-md-12 p-3" >
                                     <div className="col-md-7 p-3" style={{
                                        background: "linen", borderRadius: " 20px", border: "1px dashed"
                                    }}>
                                        {htmlToReactParser.parse(item.noiDung)}

                                    </div>
                                    <div className="col-md-5">
                                        <img style={{ borderRadius: " 20px",
                                        margin: "100px 0 0 0px" }} src={apiURL + item.hinhAnh} width="100%" />
                                    </div>

                                   
                                </div>
                        })}
                    </Panel>
                </Collapse>


                <div className="clearfix"></div>

                <div className="col-md-12 my-3" style={{ background: "#ffffff" }}>
                    <ChartLine userID={this.state.userLogin.id} />
                </div>
                <h3 className="my-3"> Các khoá đang học</h3>

                <div className="row">
                    {this.layKhoaHoc(dsLichSuHocTap)}
                </div>

                <div className="col-md-6" >
                    <h3 className="my-3"> Bài học trước đó</h3>
                    <div style={{ background: "#ffffff", borderRadius: "5px", height: 450, padding: 20, overflow: "scroll" }}>
                        {this.layBaiHocTruoc(dsTienTrinhHoc)}
                    </div>
                </div>
                <div className="col-md-6" >
                    <h3 className="my-3"> Thống kê cá nhân</h3>
                    <div style={{ background: "#ffffff", borderRadius: "5px", height: 450 }}>
                        <ChartBar userID={this.state.userLogin.id} />
                    </div>
                </div>
            </div>
        )
    }


    componentDidMount = () => {

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));

        this.props.dispatch({ type: LAY_DANH_SACH_KHOA_HOC }) // lay danh sach khoa hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_TIEN_TRINH_HOC }) //lay danh sach tien trinh tu store
        this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC_THEO_USER, maNguoiDung: nguoiDung.id }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc
        this.props.dispatch({ type: LAY_DANH_SACH_LO_TRINH }) // lay danh sach lo trinh tu store
        this.props.dispatch({ type: LAY_TAT_CA_LICH_SU_HOC_TAP, payload: { maNguoiDung: nguoiDung.id } })// lay lich su hoc tap
        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach chuong hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_HOP_THU }) // lay danh sach hop thu

    }


}

const mapStateToProps = (state) => {

    return {
        dsKhoaHocTheoLoTrinh: state.KhoaHocReducer.dsKhoaHocTheoLoTrinh,
        dsTienTrinhHoc: state.KhoaHocReducer.dsTienTrinhHoc,
        dsLichSu: state.LichSuTuongTacReducer.dsLichSu,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsLoTrinh: state.LoTrinhReducer.dsLoTrinh,
        dsLichSuHocTap: state.LichSuHocTapReducer.dsLichSuHocTap,
        dsChuong: state.KhoaHocReducer.dsChuong,
        dsHopThu: state.NguoiDungReducer.dsHopThu
    }

}

export default connect(mapStateToProps)(DashBoard)
