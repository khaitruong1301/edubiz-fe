import {
    LAY_DANH_SACH_BAI_HOC_ACTION,
    LAY_DANH_SACH_NOP_BAI_ACTION,
    LAY_BAI_TAP_ACTION
} from "../types/ActionsTypes"

const stateStore = {
    dsBaiHoc: [],
    dsNopBai: [],
    dsBaiTap:[]
}

export const BaiHocReducer = (state = stateStore, action) => {
    
    switch (action.type) {
        case LAY_DANH_SACH_BAI_HOC_ACTION:
            {
                return { ...state, dsBaiHoc: action.dsBaiHocAction }
            }
        case LAY_DANH_SACH_NOP_BAI_ACTION:

            
            {
                return { ...state, dsNopBai: action.dsNopBaiAction }
            }
            case LAY_BAI_TAP_ACTION:

            
                {
                    return { ...state, dsBaiTap: action.dsBaiTapAction }
                }
        default:
            return state
    }

}


