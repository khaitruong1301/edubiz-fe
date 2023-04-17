import { LAY_LICH_SU_TUONG_TAC_ACTION, LAY_LICH_SU_TUONG_TAC_THEO_USER_ACTION } from '../types/ActionsTypes'



export const layLichSuTuongTacAction = (dsLichSuAction) => {
    
    return {
        type: LAY_LICH_SU_TUONG_TAC_ACTION,
        dsLichSuAction
    }

}


export const layLichSuTuongTacTheoNguoiDungAction = (dsLichSuAction) => {
    
    return {
        type: LAY_LICH_SU_TUONG_TAC_THEO_USER_ACTION,
        dsLichSuAction
    }

}