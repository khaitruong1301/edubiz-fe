import {
    LAY_DANH_SACH_DANH_GIA_KHOA_HOC_ACTION,
    LAY_DANH_SACH_DANH_GIA_MENTOR_ACTION
    
} from "../types/ActionsTypes"

const stateStore = {
    dsDanhGiaKhoaHoc: [],
    dsDanhGiaMentor:[]
}

export const DanhGiaReducer = (state = stateStore, action) => {
    
    switch (action.type) {
        case LAY_DANH_SACH_DANH_GIA_KHOA_HOC_ACTION:
            {
                return { ...state, dsDanhGiaKhoaHoc: action.dsDanhGiaKhoaHocAction }
            }
            case LAY_DANH_SACH_DANH_GIA_MENTOR_ACTION:
                {
                    return { ...state, dsDanhGiaMentor: action.dsDanhGiaMentorAction }
                }
        default:
            return state
    }

}


