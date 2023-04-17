import React, { Component } from 'react';
import { message, Input, Form, Button, Result, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { CAP_NHAT_BAI_DA_HOC, LAY_DANH_SACH_NOP_BAI, CAP_NHAT_LICH_SU_HOC_TAP, LAY_LICH_SU_TUONG_TAC } from '../../../redux/types/ActionsTypes';
import { apiURL } from '../../../redux/Config/Config';
import { themLichSu } from '../../../commons/user/UserServices';




class BaiActicle extends Component {
    componentDidMount = () => {
        const { checked } = this.props;
        if (!checked)
            this.onChange();
    }

    onChange = () => {

        const { lichSuHocTap, baiHoc, dsTatCaBaiHoc, khoaHoc, dsLichSu } = this.props;
        let tongThoiGianHoc = lichSuHocTap.tongThoiGianHoc ?? 0;
        let tongSoBaiDaHoc = lichSuHocTap.tongSoBaiDaHoc ?? 0;
        let mucDoHoanThanh = lichSuHocTap.mucDoHoanThanh ?? 0;
        const nguoiDung = JSON.parse(localStorage.getItem('checkLogin'))

        let dsBaiDaHoc = lichSuHocTap.danhSachBaiDaHoc ? JSON.parse(lichSuHocTap.danhSachBaiDaHoc) : [];


        dsBaiDaHoc.push(this.props.baiHoc.id);
        tongThoiGianHoc = tongThoiGianHoc + baiHoc.thoiLuong;
        tongSoBaiDaHoc = tongSoBaiDaHoc + 1;
        mucDoHoanThanh = parseInt(tongSoBaiDaHoc / dsTatCaBaiHoc.length * 100);

        //luu lich su bai da hoc
        // let checkLichSu = dsLichSu.find(n => n.hanhDong == "HOANTHANHBAIHOC" && n.idSuKien == baiHoc.id && n.nguoiDungId == nguoiDung.id);

        // if (!checkLichSu) {
        //     let modelLichSu = {
        //         loaiSuKien: "TIENTRINH",
        //         idSuKien: baiHoc.id,
        //         hanhDong: "HOANTHANHBAIHOC",
        //         nguoiDungId: nguoiDung.id,
        //         content: "Bạn đã hoàn thành bài học: <b>" + baiHoc.tenBaiHoc + "</b>"
        //     }
        //     themLichSu(modelLichSu).then(res =>
        //         // load lai danh sach tuong tac
        //         this.props.dispatch({ type: LAY_LICH_SU_TUONG_TAC })
        //     ).catch(err => console.log(err));
        // }


        this.props.dispatch({
            type: CAP_NHAT_LICH_SU_HOC_TAP, payload: {
                model: {
                    id: lichSuHocTap.id ? lichSuHocTap.id : 0,
                    hoTen: nguoiDung.hoTen,
                    biDanh: nguoiDung.hoTen,
                    maNguoiDung: nguoiDung.id,
                    maKhoaHoc: khoaHoc.id,
                    danhSachBaiDaHoc: JSON.stringify(dsBaiDaHoc),
                    tongThoiGianHoc: tongThoiGianHoc,
                    tongSoBaiDaHoc: tongSoBaiDaHoc,
                    mucDoHoanThanh: mucDoHoanThanh
                }
            }
        });
    }

    renderBaiTap = () => {
        const { baiHoc, lichSuHocTap, dsNopBai, onChangeVideo } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();

        return htmlToReactParser.parse(baiHoc.noiDung)

    }

    render() {

        return (
            <div className="div_article_main">
                {this.renderBaiTap()}

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap,
        dsNopBai: state.BaiHocReducer.dsNopBai
    }

}

export default connect(mapStateToProps)(BaiActicle)