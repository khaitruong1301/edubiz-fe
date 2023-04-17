import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    LAY_CHI_TIET_KHOA_HOC, 
    LAY_DANH_SACH_BAI_HOC, 
    LAY_DANH_SACH_THAO_LUAN, 
    LAY_DANH_SACH_NGUOI_DUNG,
    LAY_LICH_SU_HOC_TAP 
} from '../../../redux/types/ActionsTypes';
import { Player } from 'video-react';
import { Icon } from 'antd'


class ChiTietKhoaHoc extends Component {

    layDSBaiHoc = (danhSachBaiHoc) => {
        let dataBaiHoc = [];
        let { dsBaiHoc } = this.props;
        if (danhSachBaiHoc !== undefined) {
            //load danh sach bai hoc theo ma tu khoa hoc
            return danhSachBaiHoc.map(idBai => {

                dataBaiHoc = dsBaiHoc.find(n => n.id === idBai); // duyet bai theo danh sach id khoa hoc

                if (dataBaiHoc !== undefined) {
                    return (

                        <div>
                            <b><i className="fa fa-play-circle"></i> {dataBaiHoc.tenBaiHoc} </b>
                            <div className="float-right">{dataBaiHoc.thoiLuong} phút</div>
                            <hr />
                        </div>
                    )
                }
            })
        }
    }

    layDSThaoLuan = (idKhoaHoc) => {
        let dataThaoLuan = [];
        let dataNguoiDung = [];
        let { dsThaoLuan, dsNguoiDung } = this.props;

        return dsThaoLuan.map(ds => {

            dataThaoLuan = [ds].find(n => n.khoaHocId === idKhoaHoc);

            if (dataThaoLuan !== undefined) {
                dataNguoiDung = dsNguoiDung.find(n => n.id === ds.nguoiTao);
                return (
                    <div className="py-2">
                        <b>{dataNguoiDung !== undefined ? dataNguoiDung.hoTen : ""}</b> <br/>
                        {ds.noiDung}
                    </div>
                )
            }
        })

    }
    render() {
        const { chiTietKhoaHoc } = this.props;
        return (
            <div className="container">
                <div className="col-md-8 div_left_ctKhoaHoc">
                    <p className="text-left h1">{chiTietKhoaHoc.tenKhoaHoc}</p>

                    <h2 className="text-left">Khoá học này bao gồm </h2>
                    <p> <i className="fa fa-clock-o"></i> Thời lượng: 0 phút </p>
                    <p> <i className="fa fa-book"></i> Tổng bài học: {chiTietKhoaHoc.danhSachBaiHoc !== undefined ? chiTietKhoaHoc.danhSachBaiHoc.length : "0"} bài </p>
                    <p> <i className="fa fa-list-alt"></i> Số bài trắc nghiệm: 0 </p>
                    <p> <i className="fa fa-comments"></i> Thảo luận cùng với giảng viên và những người học cùng bạn. </p>

                    <h2 className="text-left">Mô tả khoá học</h2>
                    {chiTietKhoaHoc.moTa}

                    <h2 className="text-left">Danh sách bài học</h2>
                    <hr />
                    {this.layDSBaiHoc(chiTietKhoaHoc.danhSachBaiHoc)}

                    <h2 className="text-left">Thảo luận</h2>
                    {this.layDSThaoLuan(chiTietKhoaHoc.id)}
                </div>

                <div className="col-md-4 text-center shadow-lg p-0 pb-4 div_right_ctKhoaHoc">
                    <Player playsInline poster={chiTietKhoaHoc.hinhAnh} src={chiTietKhoaHoc.videoGioiThieu} />
                    <button className="btn btn-info btn-lg px-5 mt-3">Bắt đầu học</button>
                </div>

            </div>
        )
    }
    componentDidMount = () => {
        // lay chi tiet khoa hoc tu store
        this.props.dispatch({ type: LAY_CHI_TIET_KHOA_HOC, idKhoaHoc: this.props.match.params.id })
        // lay danh sach bai hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC })
        // lay danh sach binh luan tu store
        this.props.dispatch({ type: LAY_DANH_SACH_THAO_LUAN })
        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG });
    }
}

const mapStateToProps = (state) => {
    return {
        chiTietKhoaHoc: state.KhoaHocReducer.chiTietKhoaHoc,
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsThaoLuan: state.KhoaHocReducer.dsThaoLuan,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
        lichSuHocTap: state.LichSuHocTapReducer.lichSuHocTap
    }

}

export default connect(mapStateToProps)(ChiTietKhoaHoc)
