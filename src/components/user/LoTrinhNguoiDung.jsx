import React, { Component } from 'react'
import { Collapse, Card, Progress, message, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import {
    LAY_DANH_SACH_LO_TRINH,
    LAY_DANH_SACH_KHOA_HOC,
    LAY_DANH_SACH_TIEN_TRINH_HOC,
    LAY_TAT_CA_LICH_SU_HOC_TAP,
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_BAI_HOC,
    LAY_DANH_SACH_LOAI_KHOA_HOC
} from '../../redux/types/ActionsTypes';
import { dinhDangTheoNgay, dinhDangNgayCheck } from '../../commons/format/FormatDate';
import { apiURL } from '../../redux/Config/Config';
import { cutString } from '../../commons/format/FormatNumber';

let idKhoaHoc = 0;
const { Panel } = Collapse;

class LoTrinhNguoiDung extends Component {

    state = {
        userLogin: JSON.parse(localStorage.getItem('checkLogin')),
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
    layKhoaHoc = (dsKhoaHoc, checkHanHoc, loTrinhId) => {

        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'));
        const { dsKhoaHocTheoLoTrinh, dsLichSuHocTap, linkBaiHoc, dsDanhGiaKhoaHoc, dsLoaiKhoaHoc } = this.props;

        let data = [];
        let dataTienTrinh = [];

        let lstLoaiKhoaHoc = [];

        let conTent = [];

        // dsKhoaHoc.map(item => {
        //     let khoaHoc = dsKhoaHocTheoLoTrinh.find(n => n.id === item);
        //     if (khoaHoc != undefined) {
        //         if (lstLoaiKhoaHoc.findIndex(n => n == khoaHoc.maLoai) == -1) {
        //             lstLoaiKhoaHoc.push(khoaHoc.maLoai);
        //         }
        //     }
        // })

        //load cac khoa hoc khong co loai
        dsKhoaHoc.map(e => {

            //loc khoa hoc theo ma khoa hoc cua lo trinh
            data = dsKhoaHocTheoLoTrinh.find(n => n.id === e);
            //loc tien trinh hoc theo ma khoa hoc
            dataTienTrinh = dsLichSuHocTap.find(n => n.maKhoaHoc === e);


            if (data !== undefined && data.maLoai == -1) {

                conTent.push(

                    <div className="col-md-4 pb-3">

                        <Card
                            hoverable
                            style={{ width: 280, height: 300 }}
                            cover={<img alt="example" src={apiURL + data.hinhAnh} style={{ height: 170 }} />}
                            onClick={() => checkHanHoc == 0 ? linkBaiHoc(e, loTrinhId) : message.error("Không thể học vì lộ trình đã hết hạn. Hãy gia hạn để học tiếp !")}

                        >
                            <div className="font-weight-bold" style={{ height: 45 }}

                            >{cutString(data.tenKhoaHoc)}</div>
                            <div className="row">
                                <div className="col-9 pr-2">

                                    Tổng bài học: {this.layTongBaiHoc(data.id)}
                                    <br />
            Số bài đã học: {dataTienTrinh ? dataTienTrinh.tongSoBaiDaHoc : "0"}

                                </div>
                                <div className="col-3 p-0">
                                    <Progress width={50} type="circle" percent={Math.round(dataTienTrinh ? dataTienTrinh.mucDoHoanThanh : 0)} />
                                </div>
                            </div>

                        </Card></div>
                )
            }

        })

        // //clear  css giua 2 khoa hoc
        // conTent.push(<div className="clearfix"></div>)

        // //load cac khoa hoc khong co loai
        // lstLoaiKhoaHoc.map(item => {
        //     let loaiKH = dsLoaiKhoaHoc.find(n => n.id == item);
        //     if (loaiKH) {
        //         conTent.push(<Collapse className="mb-3" defaultActiveKey={lstLoaiKhoaHoc}>

        //             <Panel header={loaiKH.tenLoai} key={loaiKH.id}>

        //                 {

        //                     dsKhoaHoc.map(e => {

        //                         //loc khoa hoc theo ma khoa hoc cua lo trinh
        //                         data = dsKhoaHocTheoLoTrinh.find(n => n.id === e);
        //                         //loc tien trinh hoc theo ma khoa hoc
        //                         dataTienTrinh = dsLichSuHocTap.find(n => n.maKhoaHoc === e);


        //                         if (data !== undefined && data.maLoai == loaiKH.id) {

        //                             return (

        //                                 <div className="col-md-4 pb-3">

        //                                     <Card
        //                                         hoverable
        //                                         style={{ width: 280, height: 300 }}
        //                                         cover={<img alt="example" src={apiURL + data.hinhAnh} style={{ height: 170 }} />}
        //                                         onClick={() => checkHanHoc == 0 ? linkBaiHoc(e, "0") : message.error("Không thể học vì lộ trình đã hết hạn. Hãy gia hạn để học tiếp !")}

        //                                     >
        //                                         <div className="font-weight-bold" style={{ height: 45 }}

        //                                         >{cutString(data.tenKhoaHoc)}</div>
        //                                         <div className="row">
        //                                             <div className="col-9 pr-2">

        //                                                 Tổng bài học: {this.layTongBaiHoc(data.id)}
        //                                                 <br />
        //                         Số bài đã học: {dataTienTrinh ? dataTienTrinh.tongSoBaiDaHoc : "0"}

        //                                             </div>
        //                                             <div className="col-3 p-0">
        //                                                 <Progress width={50} type="circle" percent={Math.round(dataTienTrinh ? dataTienTrinh.mucDoHoanThanh : 0)} />
        //                                             </div>
        //                                         </div>

        //                                     </Card></div>
        //                             )
        //                         }

        //                     })

        //                 }

        //             </Panel>

        //         </Collapse>
        //         )
        //     }
        // })


        return conTent;


    }


    render() {

        const { dsLoTrinh, dsTienTrinhHoc, dsLoaiKhoaHoc } = this.props;

        let dataTienTrinh = [];

        const dNow = Date.parse(dinhDangNgayCheck(new Date()));
        let dateExpir = "";

        let lstMaLoTrinh = [];
        dsLoTrinh.map(item => {
            lstMaLoTrinh.push(item.id);
        })

        return (
            <div class=" container">
                <h3 className="my-3"> DANH SÁCH LỘ TRÌNH</h3>
                <Collapse defaultActiveKey={lstMaLoTrinh} >
                    {
                        dsLoTrinh.map(element => {
                            let checkHanHoc = 0;
                            //loc lo trinh user da dang ky
                            dataTienTrinh = dsTienTrinhHoc.find(n => n.nguoiDungId === this.state.userLogin.id && n.loTrinhId === element.id)

                            if (dataTienTrinh !== undefined) {

                                let dExpir = Date.parse(dinhDangNgayCheck(dataTienTrinh.ngayKetThuc));

                                if (dNow > dExpir) {
                                    checkHanHoc = 1;
                                }

                                if (checkHanHoc == 1) {
                                    dateExpir = <b className="text-danger">HẾT HẠN</b>
                                } else {
                                    dateExpir = <div>Kích hoạt: <b>{dinhDangTheoNgay(dataTienTrinh.ngayBatDauHoc)}</b> - Hết hạn: <b>{dinhDangTheoNgay(dataTienTrinh.ngayKetThuc)}</b></div>;
                                }

                                return <Panel header={"Lộ trình " + element.tenLoTrinh + " ( " + element.danhSachKhoaHoc.length + " khoá học, " + this.layTongThoiGianHoc(element) + " phút ) "} key={element.id} extra={dateExpir} >
                                    <div>

                                        {this.layKhoaHoc(element.danhSachKhoaHoc, checkHanHoc, element.id)}
                                    </div>
                                </Panel>
                            }
                        })}
                </Collapse>

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

        this.props.dispatch({ type: LAY_DANH_SACH_LOAI_KHOA_HOC }) //lay danh sach bai hoc

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
        dsLoaiKhoaHoc: state.KhoaHocReducer.dsLoaiKhoaHoc

    }

}

export default connect(mapStateToProps)(LoTrinhNguoiDung)
