import AxiosServ from "./axios.service";

/* eslint-disable no-useless-constructor */
class HttpRequestService {
  constructor() { }

  login = (data, setLoading = true) => {
    const uri = "nguoidung/facebook";
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  signIn = (data, setLoading = true) => {
    const uri = "nguoidung/signin";
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  getTuDongGiaHanLoTrinh = (setLoading = true) => {
    const uri = `/lotrinh/tu-dong-gia-han`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getCheckBaiKiemTraDanhGia = (nguoiDungId, setLoading = true) => {
    const uri = `/nganhangdethi/kiem-tra/${nguoiDungId}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getLoTrinhDaDangKI = (idUser, setLoading = true) => {
    const uri = `/lotrinh/lay-ds-tt-lotrinh/${idUser}/1`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getTatCaLoTrinh = (idUser, setLoading = true) => {
    const uri = `/lotrinh/lay-ds-tt-lotrinh/${idUser}/0`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  ghiDanhLoTrinh = (data, setLoading = true) => {
    const uri = "lotrinh/ghi-danh";
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  getDetailKhoaHoc = (id, setLoading = true) => {
    //sang update
    let getInfo = localStorage.getItem("USER_INFOR")
      ? JSON.parse(localStorage.getItem("USER_INFOR"))
      : { id: 0 };

    const uri = `khoahoc/info/${id}/${getInfo.id}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getUrlVideo_FPT = (noiDung, setLoading = true) => {
    const uri = `file/ftp-video/${noiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getCheckUserDetailBaiHoc = (idUser, idLoTrinh, setLoading = true) => {
    const uri = `tientrinhhoc/kiemtrahethan/${idUser}/${idLoTrinh}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getDanhSachBaiDaHoc = (idKhoacHoc, idNguoiDung, setLoading = true) => {
    const uri = `lichsuhoctap/danhsachdahocnew/${idKhoacHoc}/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
 
  // ======== BÌNH LUẬN KHÓA HỌC ===============
  getBinhLuan_KhoacHoc = (maKhoaHoc, setLoading = true) => {
    const uri = `binhluan/by-khoa-hoc/${maKhoaHoc}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  postBinhLuan_KhoaHoc = (model, setLoading = true) => {
    const uri = `binhluan`;
    return AxiosServ.postMethod(uri, model, setLoading);
  };

  putBinhLuan_KhoaHoc = (id, model, setLoading = true) => {
    const uri = `binhluan/${id}`;
    return AxiosServ.putMethod(uri, model, setLoading);
  };

  // ======== Q & A ===============
  postQandA_KhoacHoc = (model, setLoading = true) => {
    const uri = `cauhoithaoluan`;
    return AxiosServ.postMethod(uri, model, setLoading);
  };
  getQandA_KhoacHoc = (idLoTrinh, setLoading = true) => {
    const uri = `cauhoithaoluan/lay-theo-lo-trinh/${idLoTrinh}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getQandA_KhoacHoc = (idLoTrinh, setLoading = true) => {
    const uri = `cauhoithaoluan/lay-theo-lo-trinh/${idLoTrinh}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getInforUser = (idUser, setLoading = true) => {
    const uri = `nguoidung/laythongtinuser/${idUser}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  putChangePassword = (model, setLoading = true) => {
    const uri = `nguoidung/change-password`;
    return AxiosServ.putMethod(uri, model, setLoading);
  };

  putChangeAvatar = (model, setLoading = true) => {
    const uri = `nguoidung/change-avatar`;
    return AxiosServ.putMethod(uri, model, setLoading);
  };

  postCompletedBaiHoc = (data, setLoading = true) => {
    const uri = `lichsuhoctap/hoanthanhbaihocnew`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };
  getDiemAndBaiTap = (idLoTrinh, idNguoiDung, setLoading = true) => {
    const uri = `nopbai/laydanhsachbaitap/${idLoTrinh}/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getThongTinBaiTapNop = (idNguoiDung, idBaiTap, setLoading = true) => {
    const uri = `nopbai/kiemtrabaitap/${idNguoiDung}/${idBaiTap}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getGiaHanBaiTapNop = (idNguoiDung, idBaiTap, setLoading = true) => {
    const uri = `nopbai/tangthoigiannopbai/${idNguoiDung}/${idBaiTap}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getGiaHanBaiTapTracNghiem = (idNguoiDung, idBaiTap, setLoading = true) => {
    const uri = `nopbai/giamthoigiantracnghiem/${idNguoiDung}/${idBaiTap}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getGiamThoiGianTracNghiem = (idNguoiDung, idBaiTap, setLoading = true) => {
    const uri = `nopbai/giamthoigiantracnghiem/${idNguoiDung}/${idBaiTap}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getTrangThaiQuizz = (idNguoiDung, idBaiHoc, setLoading = true) => {
    const uri = `nopbai/kiemtratracnghiem/${idNguoiDung}/${idBaiHoc}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getLamLaiTracNghiem = (idNguoiDung, idBaiHoc, setLoading = true) => {
    const uri = `nopbai/lamlaitracnghiem/${idNguoiDung}/${idBaiHoc}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  postStartBaiTapNop = (data, setLoading = true) => {
    const uri = `nopbai/nopbaitap`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  getDiemBaiTap = (idNguoiDung, idBaiHoc, setLoading = true) => {
    const uri = `nopbai/laydiem/${idBaiHoc}/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  postNopBaiTapNop = (data, setLoading = true) => {
    const uri = `nopbai/nopbaitap`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  postKetQuaQuizz = (data, setLoading = true) => {
    const uri = `nopbai/noptracnghiem`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  postBaiTapTuLuanQuizz = (data, setLoading = true) => {
    const uri = `nopbai/noptuluan`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  putRedoBaiTapTuLuanQuizz = (id, data, setLoading = true) => {
    const uri = `nopbai/noplaituluan/${id}`;
    return AxiosServ.putMethod(uri, data, setLoading);
  };

  getStatisChartDashboard = (
    idNguoiDung,
    thoiGian,
    top = false,
    setLoading = true
  ) => {
    const uri = `lichsutuongtac/thongkethoigianvideo/${idNguoiDung}/${thoiGian}/${top}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getStatisTopUser = (loai, setLoading = true) => {
    const uri = `lichsutuongtac/thongkenguoidung/${loai}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getDanhSachDeadline = (idNguoiDung, setLoading = true) => {
    const uri = `lichsutuongtac/thongkedeadlinebaitap/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getKhoaDangHoc = (idNguoiDung, setLoading = true) => {
    const uri = `lichsutuongtac/baidanghoc/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getAllItems = (setLoading = true) => {
    const uri = `vatpham`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getYoursItems = (idNguoiDung, setLoading = true) => {
    const uri = `/vatpham/layvatpham/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getBuyItem = (idNguoiDung, idVatPham, setLoading = true) => {
    const uri = `/vatpham/layvatpham/${idNguoiDung}/${idVatPham}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getAllThongBao = (idNguoiDung, setLoading = true) => {
    const uri = `/thongbao/laythongbao/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getChangeStatusThongBao = (idNguoiDung, setLoading = true) => {
    const uri = `/thongbao/daxem/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getAllDiemBaiTapUser = (idNguoiDung, setLoading = true) => {
    const uri = `/nopbai/danhsachdiemtatca/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getLichSuHoatDong = (idNguoiDung, setLoading = true) => {
    const uri = `/lichsutuongtac/laylichsu/${idNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getAllTypeLoTrinh = (setLoading = true) => {
    const uri = `/loaikhoahoc`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getTatCaBaiTapDaLam = (idNguoiDung, setLoading = true) => {
    const uri = `/lichsutuongtac/baitaphoanthanh/${idNguoiDung}`;

    return AxiosServ.getMethod(uri, setLoading);
  };
  getMuaItem = (idNguoiDung, idVatPham, setLoading = true) => {
    const uri = `vatpham/muavatpham/${idNguoiDung}/${idVatPham}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  postCheckUserDemoLogin = (code, email, setLoading = true) => {
    const uri = `nguoidung/checkcodenewmoi/${code}/${email}`;
    return AxiosServ.postMethod(uri, setLoading);
  };
  getCheckThoiGianHocDemo = (code, setLoading = true) => {
    const uri = `nguoidung/laythoigiandemonewmoi/${code}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getMaVaTenLoTrinh = (setLoading = true) => {
    const uri = `lotrinh`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getCheckSDT = (soDienThoai, setLoading = true) => {
    const uri = `nguoidung/so-dien-thoai/${soDienThoai}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getCheckGmail = (gmail, setLoading = true) => {
    const uri = `nguoidung/email/${gmail}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  postDangKyUser = (data, setLoading = true) => {
    const uri = `nguoidung/dang-ky-nguoi-dung`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };
  postUpCMND = (data, setLoading = true) => {
    const uri = `file/cmnd`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };
  postKetQuaLuckyWhell = (data, setLoading = true) => {
    const uri = `cauhinh/vongquay`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };
  postNhaUuDai = (data, setLoading = true) => {
    const uri = `cauhinh/nhanuudai`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };
  getCheckGmail = (gmail, setLoading = true) => {
    const uri = `nguoidung/email/${gmail}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getReportLoTrinh = (NguoiDungId, LoTrinhId, setLoading = true) => {
    const uri = `nopbai/quatrinhhoctap/${NguoiDungId}/${LoTrinhId}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getLayDuongDanVideoDigitalService = (fileName, setLoading = true) => {
    const uri = `/file/ftp-video-digital/${fileName}`;
    return AxiosServ.getMethod(uri, setLoading);
  };
  getDanhSachCauHoiTestDauVao = (setLoading = true) => {
    const uri = `/cauhinh/48`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  // ============= SOCIAL ==================
  getThongTinBangMaNguoiDung = (maNguoiDung, setLoading = true) => {
    const uri = `/mangxahoi/thongtin/${maNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  ketNoiMangXaHoi = (maNguoiDung, maPhongBan, setLoading = true) => {
    const uri = `/mangxahoi/ketnoi/${maNguoiDung}/${maPhongBan}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  ngatKetNoiMangXaHoi = (maNguoiDung, maPhongBan, setLoading = true) => {
    const uri = `/mangxahoi/ngatketnoi/${maNguoiDung}/${maPhongBan}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  dangTrangThai = (data, setLoading = true) => {
    const uri = `/mangxahoi`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  // ============= EXAM TEST ==================
  getDeThiTheoId = (id, setLoading = true) => {
    const uri = `/nganhangdethi/${id}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  getDeThiTheoNguoiDung = (maNguoiDung, setLoading = true) => {
    const uri = `/dethinguoidung/by-nguoi-dung/${maNguoiDung}`;
    return AxiosServ.getMethod(uri, setLoading);
  };

  putDeThiNguoiDung = (id, data, setLoading = true) => {
    const uri = `/dethinguoidung/${id}`;
    return AxiosServ.putMethod(uri, data, setLoading);
  };
}

const httpServ = new HttpRequestService();

export default httpServ;
