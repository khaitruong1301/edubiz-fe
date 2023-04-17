
import { LAY_LICH_SU_TUONG_TAC_ACTION, LAY_LICH_SU_TUONG_TAC_THEO_USER_ACTION } from "../types/ActionsTypes"

const stateStore = {
    dsLichSu:[],
}

export const LichSuTuongTacReducer = (state = stateStore, action) => {
    
    switch (action.type) {
        case LAY_LICH_SU_TUONG_TAC_ACTION:
        {
        return { ...state, dsLichSu:action.dsLichSuAction }
        }
        case LAY_LICH_SU_TUONG_TAC_THEO_USER_ACTION:
            {
            return { ...state, dsLichSu:action.dsLichSuAction }
            }

    default:
        return state
    }

}


