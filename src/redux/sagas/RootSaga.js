import { fork, takeEvery, call, put } from 'redux-saga/effects';
import {
   LAY_DANH_SACH_NGUOI_DUNG,
   LAY_DANH_SACH_LO_TRINH, 
   THEM_NGUOI_DUNG,
   LAY_NGUOI_DUNG_EMAIL, 
   LAY_THOI_LUONG_KHOA_HOC,
   LAY_DANH_SACH_KHOA_HOC,
   LAY_DANH_SACH_TIEN_TRINH_HOC,
   LAY_LICH_SU_TUONG_TAC,
   LAY_CHI_TIET_KHOA_HOC,
   LAY_DANH_SACH_BAI_HOC,
   LAY_DANH_SACH_THAO_LUAN,
   LAY_NGUOI_DUNG_SO_DT,
   LAY_NGUOI_DUNG_ID,
   UPLOAD_CMND,
   LAY_TAT_CA_LICH_SU_HOC_TAP,
   LAY_LICH_SU_HOC_TAP,
   CAP_NHAT_LICH_SU_HOC_TAP,
   CAP_NHAT_BAI_DA_HOC,
   NOP_BAI_TEST_USER,
   LAY_DANH_SACH_NOP_BAI,
   LAY_DANH_SACH_CHUONG,
   LAY_DANH_SACH_DANH_GIA_KHOA_HOC,
   LAY_DANH_SACH_DANH_GIA_MENTOR,
   LAY_LICH_SU_TUONG_TAC_THEO_USER,
   LAY_DANH_SACH_LOAI_KHOA_HOC,
   LAY_DANH_SACH_HOP_THU,
   LAY_BAI_TAP,
   LAY_DANH_SACH_QA
} from '../types/ActionsTypes'

import { 
   layDanhSachNguoiDungSaga, 
   themNguoiDungSaga, 
   layNguoiDungEmailSaga,
   layNguoiDungSoDTSaga,
   layNguoiDungIDSaga,
   uploadCMNDSaga,
   nopBaiTestUser,
   layDanhSachHopThuSaga,
} from './NguoiDungSaga'

import { 
   layDanhSachLoTrinhSaga, 
   layThoiLuongKhoaHocSaga 
} from './LoTrinhSaga'

import {
   layDanhSachKhoaHocSaga, 
   layDanhSachTienTrinhHocSaga, 
   layChiTietKhoaHocSaga,
   layDanhSachThaoLuanSaga,
   layDanhSachChuongSaga,
   layDanhSachLoaiKhoaHocSaga,
   layDanhSachQASaga
} from './KhoaHocSaga';

import {
   layDanhSachBaiHocSaga, 
   layDanhSachNopBaiSaga,
   layBaiTapSaga
} from './BaiHocSaga';

import {layLichSuTuongTacSaga,
   layLichSuTuongTacTheoNguoiDungSaga
} from './LichSuTuongTacSaga';

import {
   layTatCaLichSuHocTapSaga,
   layLichSuHocTapSaga, 
   capNhatLichSuHocTapSaga,
   capNhatBaiDaHocSaga
} from './LichSuHocTapSaga';

import {
   layDanhSachDanhGiaKhoaHocSaga, 
   layDanhSachDanhGiaMentorSaga
} from './DanhGiaSaga';


//fork: giúp tạo ra progress mới 1 quy trình mới thực hiện các công việc gì đó lời gọi non locking

//rootSaga điểm bắt đầu của saga
function* RootSaga() {


   //Nơi khởi động các saga khác nơi kích hoạt sử lý các action (BG chạy nền lắng nghe các action nó theo dõi)
   //Saga chỉ được gọi khi đăng ký theo dõi action
   // yield fork(action);
   // yield Take
   // yield  console.log('This is root saga');
   //Lắng nghe action

   //nguoi dung
   yield takeEvery(LAY_DANH_SACH_NGUOI_DUNG, layDanhSachNguoiDungSaga);
   yield takeEvery(THEM_NGUOI_DUNG, themNguoiDungSaga);
   yield takeEvery(LAY_NGUOI_DUNG_EMAIL, layNguoiDungEmailSaga);
   yield takeEvery(LAY_NGUOI_DUNG_SO_DT, layNguoiDungSoDTSaga);
   yield takeEvery(LAY_NGUOI_DUNG_ID, layNguoiDungIDSaga);
   yield takeEvery(UPLOAD_CMND, uploadCMNDSaga);
   yield takeEvery(NOP_BAI_TEST_USER, nopBaiTestUser);

   //lo trinh
   yield takeEvery(LAY_DANH_SACH_LO_TRINH, layDanhSachLoTrinhSaga);

   //khoa hoc
   yield takeEvery(LAY_THOI_LUONG_KHOA_HOC, layThoiLuongKhoaHocSaga);
   yield takeEvery(LAY_DANH_SACH_KHOA_HOC, layDanhSachKhoaHocSaga);
   yield takeEvery(LAY_CHI_TIET_KHOA_HOC, layChiTietKhoaHocSaga);

   yield takeEvery(LAY_DANH_SACH_QA, layDanhSachQASaga);

//loai khoa hoc
yield takeEvery(LAY_DANH_SACH_LOAI_KHOA_HOC, layDanhSachLoaiKhoaHocSaga);

   //tien trinh dang ky lo trinh user
   yield takeEvery(LAY_DANH_SACH_TIEN_TRINH_HOC, layDanhSachTienTrinhHocSaga);

   //lich su tuong tac
   yield takeEvery(LAY_LICH_SU_TUONG_TAC, layLichSuTuongTacSaga);
   yield takeEvery(LAY_LICH_SU_TUONG_TAC_THEO_USER, layLichSuTuongTacTheoNguoiDungSaga);

   //lich su bai hoc
   yield takeEvery(LAY_DANH_SACH_BAI_HOC, layDanhSachBaiHocSaga);

   yield takeEvery(LAY_BAI_TAP, layBaiTapSaga);


   //lay danh sach thao luan
   yield takeEvery(LAY_DANH_SACH_THAO_LUAN, layDanhSachThaoLuanSaga);

   //lich su hoc tap
   yield takeEvery(LAY_TAT_CA_LICH_SU_HOC_TAP, layTatCaLichSuHocTapSaga);
   yield takeEvery(LAY_LICH_SU_HOC_TAP, layLichSuHocTapSaga);
   yield takeEvery(CAP_NHAT_LICH_SU_HOC_TAP, capNhatLichSuHocTapSaga);
   yield takeEvery(CAP_NHAT_BAI_DA_HOC, capNhatBaiDaHocSaga);

   //nop bai
   yield takeEvery(LAY_DANH_SACH_NOP_BAI, layDanhSachNopBaiSaga);

   //chuong hoc
   yield takeEvery(LAY_DANH_SACH_CHUONG, layDanhSachChuongSaga);

   //danh gia
   yield takeEvery(LAY_DANH_SACH_DANH_GIA_KHOA_HOC, layDanhSachDanhGiaKhoaHocSaga);
   yield takeEvery(LAY_DANH_SACH_DANH_GIA_MENTOR, layDanhSachDanhGiaMentorSaga);

   //hop thu
   yield takeEvery(LAY_DANH_SACH_HOP_THU, layDanhSachHopThuSaga);

}
//Take sẽ được kích hoạt vào saga khi 1 action được dispatch

export default RootSaga;

//fork: Rẻ nhánh action 
/*
   Kích hoạt nhiều bộ theo dõi cùng lúc
*/




