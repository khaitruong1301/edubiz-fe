import localStorageServ from "../services/locaStorage.service";
export let dataUserDemo = {
  avatar: "https://graph.facebook.com/706889296629670/picture?type=large",
  capDo: 25,
  capTangDanhHieu: 10,
  coin: 25,
  danhHieu: "Junior",

  email: "tranquangsigl@gmail.com",
  hoTen: "Demo CyberLearn",
  huyHieu: "/images/hh_3.png",
  id: "65072719-3fe5-40b4-930c-d074e1a53be8",
  danhHieuHinh: "/images/DH_1.png",
  kinhNghiem: 70,
  kinhNghiemToiDa: 100,
  nuocNgoai: false,
  tichCuc: 1400,
  tichCucToiDa: 2000,
};
export const checkDemoUser = () => {
  // console.log('yess');
  if (localStorageServ.userDemo.get()) {
    return true;
  }
  return false;
};

export const removeRealUser = () => {
  let userInfor = localStorageServ.userInfor;
  if (userInfor) {
    userInfor.remove();
  }

  localStorageServ.userDemo.set(dataUserDemo);
};
export const removeDemoUser = () => {
  let dataUserDemo = localStorageServ.userDemo;
  let codeDemo = localStorageServ.codeDemo;
  let nuocngoaiDemo = localStorageServ.nuocngoaiDemo;
  let timeDemo = localStorageServ.timeDemo;
  // let timeDemo = localStorageServ.timeDemo;
  if (dataUserDemo) {
    dataUserDemo.remove();
  }
  codeDemo && codeDemo.remove()
  timeDemo && timeDemo.remove()
  nuocngoaiDemo && nuocngoaiDemo.remove()
};

export const initialDemoTaskDeadline = () => {
  return [
    {
      tenKhoaHoc: "Khóa 1: Tư duy lập trình & nền tảng",
      tenBaiTap: "Bài tập chương 2",
      ngayHetHan: `10/16/2021 1:13:47 AM`,
      hetHan: true,
    },
    {
      tenKhoaHoc: "Khóa 2: Lập trình xử lý Mảng căn bản chuyên sâu",
      tenBaiTap: "Bài tập chương 1 (mảng)",
      ngayHetHan: "10/20/2021 6:27:10 PM",
      hetHan: true,
    },
  ];
};
