import {
    LAY_DANH_SACH_KHOA_HOC_ACTION,
    LAY_DANH_SACH_TIEN_TRINH_HOC_ACTION,
    LAY_CHI_TIET_KHOA_HOC_ACTION,
    LAY_DANH_SACH_THAO_LUAN_ACTION,
    LAY_DANH_SACH_CHUONG_ACTION,
    LAY_DANH_SACH_LOAI_KHOA_HOC_ACTION,
    LAY_DANH_SACH_QA_ACTION
} from "../types/ActionsTypes"

const stateStore = {
    dsKhoaHocTheoLoTrinh: [],
    dsTienTrinhHoc: [],
    chiTietKhoaHoc: [],
    dsThaoLuan: [],
    dsChuong: [],
    dsLoaiKhoaHoc:[],
    dsQA:[]
}

export const KhoaHocReducer = (state = stateStore, action) => {

    switch (action.type) {
        case LAY_DANH_SACH_LOAI_KHOA_HOC_ACTION:
            {
                return { ...state, dsLoaiKhoaHoc: action.dsLoaiKhoaHocAction }
            }
        case LAY_DANH_SACH_KHOA_HOC_ACTION:
            {
                return { ...state, dsKhoaHocTheoLoTrinh: action.dsKhoaHocAction }
            }
        case LAY_DANH_SACH_TIEN_TRINH_HOC_ACTION:
            {
                return { ...state, dsTienTrinhHoc: action.dsTienTrinhHocAction }
            }
        case LAY_CHI_TIET_KHOA_HOC_ACTION:
            {
                return { ...state, chiTietKhoaHoc: action.ChiTietKhoaHocAction }
            }
        case LAY_DANH_SACH_THAO_LUAN_ACTION:
            {
                return { ...state, dsThaoLuan: action.DanhSachThaoLuanAction }
            }
        case LAY_DANH_SACH_CHUONG_ACTION:
            {
                return { ...state, dsChuong: action.DanhSachChuongAction }
            }
            case LAY_DANH_SACH_QA_ACTION:
                {
                    return { ...state, dsQA: action.danhSachQAAction }
                }
        default:
            return state
    }

}


