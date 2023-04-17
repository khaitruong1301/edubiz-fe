import { LAY_DANH_SACH_HOP_THU_ACTION, LAY_DANH_SACH_NGUOI_DUNG_ACTION, LAY_NGUOI_DUNG_EMAIL_ACTION, LAY_NGUOI_DUNG_ID_ACTION } from '../types/ActionsTypes'



export const layDanhSachNguoiDungAction = (dsNguoiDungAction) => {
    
    return {
        type: LAY_DANH_SACH_NGUOI_DUNG_ACTION,
        dsNguoiDungAction
    }

}

export const layNguoiDungEmailAction = (nguoiDungEmailAction) => {
    
    return {
        type: LAY_NGUOI_DUNG_EMAIL_ACTION,
        nguoiDungEmailAction
    }

}

export const layNguoiDungIDAction = (nguoiDungIDAction) => {
    
    return {
        type: LAY_NGUOI_DUNG_ID_ACTION,
        nguoiDungIDAction
    }

}


export const layDanhSachHopThuAction = (dsHopThuAction) => {
    
    return {
        type: LAY_DANH_SACH_HOP_THU_ACTION,
        dsHopThuAction
    }

}