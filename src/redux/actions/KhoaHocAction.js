import {
    LAY_DANH_SACH_KHOA_HOC_ACTION,
    LAY_DANH_SACH_TIEN_TRINH_HOC_ACTION,
    LAY_CHI_TIET_KHOA_HOC_ACTION,
    LAY_DANH_SACH_THAO_LUAN_ACTION,
    LAY_DANH_SACH_CHUONG_ACTION,
    LAY_DANH_SACH_LOAI_KHOA_HOC_ACTION,
    LAY_DANH_SACH_QA_ACTION

} from '../types/ActionsTypes'


export const layDanhSachLoaiKhoaHocAction = (dsLoaiKhoaHocAction) => {

    return {
        type: LAY_DANH_SACH_LOAI_KHOA_HOC_ACTION,
        dsLoaiKhoaHocAction
    }

}


export const layDanhSachKhoaHocAction = (dsKhoaHocAction) => {

    return {
        type: LAY_DANH_SACH_KHOA_HOC_ACTION,
        dsKhoaHocAction
    }

}

export const layDanhSachTienTrinhHocAction = (dsTienTrinhHocAction) => {

    return {
        type: LAY_DANH_SACH_TIEN_TRINH_HOC_ACTION,
        dsTienTrinhHocAction
    }

}

export const layChiTietKhoaHocAction = (ChiTietKhoaHocAction) => {

    return {

        type: LAY_CHI_TIET_KHOA_HOC_ACTION,
        ChiTietKhoaHocAction
    }

}

export const layDanhSachThaoLuanAction = (DanhSachThaoLuanAction) => {

    return {

        type: LAY_DANH_SACH_THAO_LUAN_ACTION,
        DanhSachThaoLuanAction
    }

}

export const layDanhSachChuongAction = (DanhSachChuongAction) => {

    return {

        type: LAY_DANH_SACH_CHUONG_ACTION,
        DanhSachChuongAction
    }

}

export const layDanhSachQAAction = (danhSachQAAction) => {

    return {

        type: LAY_DANH_SACH_QA_ACTION,
        danhSachQAAction
    }

}