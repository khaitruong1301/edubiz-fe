import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LAY_DANH_SACH_NGUOI_DUNG } from '../../redux/types/ActionsTypes';


class CheckAdmin extends Component {
    render() {
        let { userId, khoaHocId } = this.props.match.params;
        
        let { dsNguoiDung } = this.props;
        let nguoiDung = dsNguoiDung.find(n => n.id == userId);
        
        if (nguoiDung) {
            if (nguoiDung.maNhomQuyen == "ADMIN" || nguoiDung.maNhomQuyen == "MENTOR" || nguoiDung.maNhomQuyen == "LECTURE") {
                localStorage.setItem('checkLogin', JSON.stringify(nguoiDung));
                this.props.history.push("/course/" + khoaHocId + "/0");

            } else
                this.props.history.push("/");

        }

        return (
            <div>

            </div>
        )
    }
    componentDidMount = () => {
        this.props.dispatch({ type: LAY_DANH_SACH_NGUOI_DUNG }) // lay danh sach lo trinh tu store
    }
}

const mapStateToProps = (state) => {

    return {
        dsNguoiDung: state.NguoiDungReducer.dsNguoiDung,
    }

}

export default connect(mapStateToProps)(CheckAdmin)
