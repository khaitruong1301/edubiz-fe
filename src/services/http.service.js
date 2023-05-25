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
  postNopBaiTapNop = (data, setLoading = true) => {
    const uri = `nopbai/nopbaitap`;
    return AxiosServ.postMethod(uri, data, setLoading);
  };

  postKetQuaQuizz = (data, setLoading = true) => {
    const uri = `nopbai/noptracnghiem`;
    return AxiosServ.postMethod(uri, data, setLoading);
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

  ketNoiMangXaHoi = (data, setLoading = true) => {
    const uri = `/mangxahoi/ketnoi`;
    return AxiosServ.postMethod(uri, data, setLoading);
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
}

const httpServ = new HttpRequestService();

export default httpServ;
