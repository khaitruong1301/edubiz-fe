import * as types from "../types/ActionsTypes"

const stateStore = {
    lichSuHocTap: {},
    dsLichSuHocTap: []
}

export const LichSuHocTapReducer = (state = stateStore, action) => {

    switch (action.type) {
        case types.LAY_TAT_CA_LICH_SU_HOC_TAP_THANH_CONG:
           
            if (action.payload != null) {
                return { ...state, dsLichSuHocTap: action.payload }
            }
            return state;
        case types.LAY_LICH_SU_HOC_TAP_THANH_CONG:
            if (action.payload != null) {
                return { ...state, lichSuHocTap: action.payload }
            }else{
                return { ...state, lichSuHocTap: {} }
            }
            return state;
        case types.CAP_NHAT_LICH_SU_HOC_TAP_THANH_CONG:
            if (action.payload != null) {
                return { ...state, lichSuHocTap: action.payload }
            }
        case types.CAP_NHAT_BAI_DA_HOC_THANH_CONG:
            if (action.payload != null) {
                return { ...state, lichSuHocTap: action.payload }
            }
            return state;
        default:
            return state
    }

}