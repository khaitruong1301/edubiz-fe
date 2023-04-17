import { LAY_DANH_SACH_NGUOI_DUNG_ACTION, LAY_NGUOI_DUNG_EMAIL_ACTION, LAY_NGUOI_DUNG_ID_ACTION, LAY_DANH_SACH_HOP_THU_ACTION } from "../types/ActionsTypes"

const stateStore = {
    dsNguoiDung:[],
    nguoiDung:[],
    dsHopThu:[]
}

export const NguoiDungReducer = (state = stateStore, action) => {
    
    switch (action.type) {
        case LAY_DANH_SACH_NGUOI_DUNG_ACTION: 
        return {...state, dsNguoiDung:action.dsNguoiDungAction }
        
        case LAY_NGUOI_DUNG_EMAIL_ACTION:
        return { ...state, nguoiDung:action.nguoiDungEmailAction }

        case LAY_NGUOI_DUNG_ID_ACTION:
        return { ...state, nguoiDung:action.nguoiDungIDAction }
            
        case LAY_DANH_SACH_HOP_THU_ACTION:
        return { ...state, dsHopThu:action.dsHopThuAction }
           
    default:
        return state
    }

}


