import { LAY_DANH_SACH_DANH_GIA_KHOA_HOC_ACTION, LAY_DANH_SACH_DANH_GIA_MENTOR_ACTION } from '../types/ActionsTypes'



export const layDanhSachDanhGiaKhoaHocAction = (dsDanhGiaKhoaHocAction) => {
    
    return {
        type: LAY_DANH_SACH_DANH_GIA_KHOA_HOC_ACTION,
        dsDanhGiaKhoaHocAction
    }

}

export const layDanhSachDanhGiaMentorAction = (dsDanhGiaMentorAction) => {

    return {
        type: LAY_DANH_SACH_DANH_GIA_MENTOR_ACTION,
        dsDanhGiaMentorAction
    }

}

