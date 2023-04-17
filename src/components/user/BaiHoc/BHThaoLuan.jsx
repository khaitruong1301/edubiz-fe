import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LAY_DANH_SACH_THAO_LUAN, LAY_DANH_SACH_BAI_HOC, LAY_DANH_SACH_NGUOI_DUNG } from '../../../redux/types/ActionsTypes';
import { Input, Select, Avatar } from 'antd';

const { Search } = Input;
const { Option } = Select;

class BHThaoLuan extends Component {
    layDSThaoLuan = (idKhoaHoc) => {
        let dataThaoLuan = [];
        let dataNguoiDung = [];
        let dataBaiHoc = [];
        let { dsThaoLuan, dsNguoiDung, dsBaiHoc } = this.props;

        dataThaoLuan = dsThaoLuan.filter(n => n.khoaHocId === parseInt(idKhoaHoc));

        return dataThaoLuan.map(ds => {
            dataNguoiDung = dsNguoiDung.find(n => n.id === ds.nguoiTao);
            dataBaiHoc = dsBaiHoc.find(n => n.id === ds.baiHocId);
            return (
                <div className="col-md-12 py-3 baitap_div_binhluan_noidung">
                    <div className="col-md-1">
                        <Avatar src style={{ backgroundColor: '#87d068' }} />

                    </div>
                    <div className="col-md-11">
                        <div className="baitap_div_binhluan_cauhoi">
                            <b>{ds.tieuDe}</b>
                            <br />
                            {ds.noiDung}
                        </div>

                        <div className=" pt-4 baitap_div_binhluan_noidung_name">
                            <a href="#"> {dataNguoiDung !== undefined ? dataNguoiDung.hoTen : ""}</a> ·
                        <a href="#"> {dataBaiHoc !== undefined ? dataBaiHoc.tenBaiHoc : ""}</a>  ·
                                    0 phút trước
                    </div>
                    </div>

                </div>
            )
        })
    }
    render() {
        const { idKhoaHoc } = this.props
        return (
            <div className="px-5 py-3 baitap_div_binhluan">
                {/* <div className="pb-2">
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                </div> */}
                <div className="row">
                    {/* <div className="col-md-4">
                        <Select defaultValue="lucy" style={{ width: "100%" }} >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>
                    <div className="col-md-4 p-0">
                        <Select defaultValue="lucy" style={{ width: "100%" }} >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div>
                    <div className="col-md-4">
                        <Select defaultValue="lucy" style={{ width: "100%" }} >
                            <Option value="jack">Jack</Option>
                        </Select>
                    </div> */}
                    <div className="col-md-12 pt-4 baihoc_div_binhluan_dem">
                        <div className="col-md-10 p-0">
                            <b>0 câu hỏi trên bài học</b>
                        </div>
                        <div className="col-md-2 p-0">
                            <a href="#">Tạo câu hỏi mới</a>
                        </div>

                    </div>
                </div>
                <hr />
                {this.layDSThaoLuan(idKhoaHoc)}
            </div>
        )
    }
    componentDidMount = () => {
        // lay danh sach bai hoc tu store
        this.props.dispatch({ type: LAY_DANH_SACH_BAI_HOC })
        // lay danh sach binh luan tu store
        this.props.dispatch({ type: LAY_DANH_SACH_THAO_LUAN })
        //lay danh sach nguoi dung
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG })

    }
}

const mapStateToProps = (state) => {

    return {
        dsBaiHoc: state.BaiHocReducer.dsBaiHoc,
        dsThaoLuan: state.KhoaHocReducer.dsThaoLuan,
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung

    }

}

export default connect(mapStateToProps)(BHThaoLuan)
