import * as types from '../types/ActionsTypes';

export const layTatCaLichSuHocTapThanhCongAction = (data) => {
    return {
        type: types.LAY_TAT_CA_LICH_SU_HOC_TAP_THANH_CONG,
        payload: data
    }
}

export const layLichSuHocTapThanhCongAction = (data) => {
    return {
        type: types.LAY_LICH_SU_HOC_TAP_THANH_CONG,
        payload: data
    }
}

export const capNhatLichSuHocTapThanhCongAction = (data) => {
    return {
        type: types.CAP_NHAT_LICH_SU_HOC_TAP_THANH_CONG,
        payload: data
    }
}

export const capNhatBaiDaHocThanhCongAction = (data) => {
    return {
        type: types.CAP_NHAT_BAI_DA_HOC_THANH_CONG,
        payload: data
    }
}