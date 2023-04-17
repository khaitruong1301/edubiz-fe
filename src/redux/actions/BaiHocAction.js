import { LAY_BAI_TAP_ACTION, LAY_DANH_SACH_BAI_HOC_ACTION, LAY_DANH_SACH_NOP_BAI_ACTION } from '../types/ActionsTypes'



export const layDanhSachBaiHocAction = (dsBaiHocAction) => {
    
    return {
        type: LAY_DANH_SACH_BAI_HOC_ACTION,
        dsBaiHocAction
    }

}

export const layDanhSachNopBaiAction = (dsNopBaiAction) => {
    
    return {
        type: LAY_DANH_SACH_NOP_BAI_ACTION,
        dsNopBaiAction
    }

}



export const layBaiTapAction = (dsBaiTapAction) => {
    
    return {
        type: LAY_BAI_TAP_ACTION,
        dsBaiTapAction
    }

}