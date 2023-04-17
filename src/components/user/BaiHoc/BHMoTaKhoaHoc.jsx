import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    LAY_CHI_TIET_KHOA_HOC,
    LAY_DANH_SACH_CHUONG,
    LAY_DANH_SACH_BAI_HOC
} from '../../../redux/types/ActionsTypes';


class BHMoTaKhoaHoc extends Component {

    //lay thong tin khoa hoc 0: tong bai hoc, 1: tong bai tap, 2: tai lieu
    layThongtinHoc = (khoaHocId, dataGet) => {
        const { dsChuong, dsBaiHoc } = this.props;

        switch (dataGet) {

            //lay tong bai hoc
            case 0: {
                let tongBai = 0;
                let dataChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);

                //duyet tiep theo chuong lay danh sach bai hoc
                dataChuong.map(itemChuong => {

                    //filter bai hoc theo ma chuong
                    let listBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == itemChuong.id && n.maLoaiBaiHoc == "VIDEO_FPT");
                    tongBai += listBaiHoc.length;
                })

                return tongBai;
            }

            //lay tong bai tap
            case 1: {
                let tongBai = 0;
                let dataChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);

                //duyet tiep theo chuong lay danh sach bai hoc
                dataChuong.map(itemChuong => {

                    //filter bai hoc theo ma chuong
                    let listBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == itemChuong.id && (n.maLoaiBaiHoc == "QUIZ" || n.maLoaiBaiHoc == "QUIZ_WRITE"));
                    tongBai += listBaiHoc.length;
                })

                return tongBai;
            }

            case 2:

            default:
                return 0;
        }


    }

    //lay tong thoi gian hoc theo khoa hoc
    layTongThoiGianHoc = (khoaHocId) => {

        let timeHoc = 0;
        const { dsChuong, dsBaiHoc } = this.props;

        let listChuong = dsChuong.filter(n => n.khoaHocId == khoaHocId);
        //duyet tiep theo chuong lay danh sach bai hoc
        listChuong.map(itemChuong => {

            //filter bai hoc theo ma chuong
            let listtBaiHoc = dsBaiHoc.filter(n => n.chuongHocId == itemChuong.id && n.maLoaiBaiHoc == "VIDEO_FPT");
            //duyet theo bao hoc lay time
            listtBaiHoc.map(itemBaiHoc => {
                timeHoc += itemBaiHoc.thoiLuong;
            })
        })
        return timeHoc;
    }

    render() {
        const { chiTietKhoaHoc } = this.props;
        var HtmlToReactParser = require('html-to-react').Parser;
        var htmlToReactParser = new HtmlToReactParser();
        return (
            <div className="container">
                <div className="col-md-12 div_left_ctKhoaHoc">
                    <div className="col-md-12 h4 font-weight-bolder">
                        {chiTietKhoaHoc.tenKhoaHoc}
                        <hr />
                    </div>

                    <div className="col-4">Khoá học này bao gồm </div>
                    <div className="col-8">
                        <p> <i className="fa fa-clock-o"></i> Thời lượng: {this.layTongThoiGianHoc(chiTietKhoaHoc.id)} phút </p>
                        <p> <i className="fa fa-book"></i> Tổng bài học: {this.layThongtinHoc(chiTietKhoaHoc.id, 0)} bài </p>
                        <p> <i className="fa fa-list-alt"></i> Số bài tập: {this.layThongtinHoc(chiTietKhoaHoc.id, 1)} </p>
                        <p> <i className="fa fa-comments"></i> Thảo luận cùng với giảng viên và những người học cùng bạn. </p>

                    </div>
                    <div className="clearfix"></div>
                    <hr />
                    <div className="col-4">Mô tả khoá học</div>
                    <div className="col-8">
                        {htmlToReactParser.parse(chiTietKhoaHoc.moTa)}
                    </div>

                </div>

            </div>
        )
    }
    componentDidMount = () => {
        const { idKhoaHoc } = this.props;
        // lay chi tiet khoa hoc tu store
        this.props.dispatch({ type: LAY_CHI_TIET_KHOA_HOC, idKhoaHoc: idKhoaHoc })
        this.props.dispatch({ type: LAY_DANH_SACH_CHUONG }) // lay danh sach chuong hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC }) //lay danh sach bai hoc

    }
}
const mapStateToProps = (state) => {

    return {
        chiTietKhoaHoc: state.KhoaHocReducer.chiTietKhoaHoc,
        dsChuong: state.KhoaHocReducer.dsChuong,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
    }

}

export default connect(mapStateToProps)(BHMoTaKhoaHoc)
