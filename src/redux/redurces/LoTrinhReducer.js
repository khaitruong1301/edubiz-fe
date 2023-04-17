import { LAY_DANH_SACH_LO_TRINH_ACTION } from "../types/ActionsTypes"

const stateStore = {
    dsLoTrinh:[],
}

export const LoTrinhReducer = (state = stateStore, action) => {
    
    switch (action.type) {
        case LAY_DANH_SACH_LO_TRINH_ACTION:
        {
        return {...state, dsLoTrinh:action.dsLoTrinhAction }
        }

    default:
        return state
    }

}


