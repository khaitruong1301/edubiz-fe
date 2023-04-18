import { icons } from "../assets/icons";
import ChungNhanPage from "../pages/ChungNhanPage";
import Dashboard from "../pages/Dashboard";
// import LoTrinhCuaBan from "../pages/LoTrinhPageCuaBan";
import ProjectsPage from "../pages/ProjectsPage";
// import TaoCvPage from "../pages/TaoCvPage";
import TatCaLoTrinhPage from "../pages/TatCaLoTrinhPage";
// import DetailKhoaHoc from "../pages/DetailKhoaHoc";
import LoTrinhPage from "../pages/LoTrinhPage";

import ThongBao_TaskPage from "../pages/ThongBao_TaskPage";
// import GioiThieuBanBePage from "../pages/GioiThieuBanBePage";
import TestPage from "../pages/TestPage";
import { checkDemoUser } from "../utils/HocDemoUtils";
import ChungNhanItem from "../components/ChungNhanItem/ChungNhanItem";
import SignUpPage from "../pages/SignUp/SignUpPage";

export const sidebarRoute = [
  {
    title: "Dashboard",
    component: Dashboard,
    icon: icons.dashboard,
    path: "/dashboard",
    exact: true,
  },
  // {
  //   title: "Lộ trình",
  //   component: LoTrinhCuaBan,
  //   icon: icons.loTrinh,
  //   path: "/lo-trinh-cua-ban",
  // },
  {
    title: "Lộ trình",
    component: LoTrinhPage,
    icon: icons.loTrinh,
    path: "/lo-trinh",
  },
  // {
  //   title: "Luyện tập",
  //   component: LuyenTapPage,
  //   icon: icons.luyenTap,
  //   path: "/luyen-tap",
  //   disable: checkDemoUser(),
  // },

  // {
  //   title: "Dự án",
  //   component: ProjectsPage,
  //   icon: icons.duAn,
  //   path: "/du-an",
  // },
  {
    title: (
      <>
        {" "}
        Điểm &<br /> Chứng nhận
      </>
    ),
    component: ChungNhanPage,
    icon: icons.chungNhan,
    path: "/chung-nhan",
    disable: checkDemoUser(),
  },

  {
    title: (
      <>
        {" "}
        Thông báo <br />& Sự kiện
      </>
    ),
    component: ThongBao_TaskPage,
    icon: icons.task,
    path: "/thongbao-task",
    disable: checkDemoUser(),
  },
  // {
  //   title: (
  //     <>
  //       {" "}
  //       Giới thiệu <br /> bạn bè
  //     </>
  //   ),
  //   component: GioiThieuBanBePage,
  //   icon: icons.gioiThieuBanBe,
  //   path: "/gioi-thieu-ban-be",
  //   disable: checkDemoUser(),
  // },
];
export const userRoute = [
  {
    title: "test",
    component: TestPage,
    icon: icons.dashboard,
    path: "/test",
    // path: "/dashboard",
  },

  // {
  //   title: "test/chungnhan",
  //   component: ChungNhanItem,
  //   icon: icons.dashboard,
  //   path: "/test-chungnhan",
  //   // path: "/dashboard",
  // },
  {
    title: "Dashboard",
    component: Dashboard,
    icon: icons.dashboard,
    path: "/",
    // path: "/dashboard",
    exact: true,
  },
  {
    title: "Dashboard",
    component: Dashboard,
    icon: icons.dashboard,
    path: "/dashboard",
    // path: "/dashboard",
    exact: true,
  },
  {
    title: "Lộ trình",
    component: LoTrinhPage,
    icon: icons.loTrinh,
    path: "/lo-trinh",
  },
  // {
  //   title: "Lộ trình",
  //   component: LoTrinhCuaBan,
  //   icon: icons.loTrinh,
  //   path: "/lo-trinh-cua-ban",
  // },
  // {
  //   title: "Lộ trình",
  //   component: TatCaLoTrinhPage,
  //   icon: icons.loTrinh,
  //   path: "/tat-ca-lo-trinh",
  // },
  // {
  //   title: "Luyện tập",
  //   component: LuyenTapPage,
  //   icon: icons.luyenTap,
  //   path: "/luyen-tap",
  // },
  // {
  //   title: "Dự án",
  //   component: ProjectsPage,
  //   icon: icons.duAn,
  //   path: "/du-an",
  // },
  {
    title: "Chứng nhận",
    component: ChungNhanPage,
    icon: icons.chungNhan,
    path: "/chung-nhan",
  },
  // {
  //   title: "Tạo CV",
  //   component: TaoCvPage,
  //   icon: icons.taoCV,
  //   path: "/tao-cv",
  // },
  // {
  //   title: "Giới thiệu bạn bè",
  //   component: GioiThieuBanbe,
  //   icon: icons.gioiThieuBanBe,
  //   path: "/gioi-thieu-ban-be",
  // },

  // {
  //   title: "Detail buổi học",
  //   component: DetailKhoaHoc,
  //   path: "/detail-khoa-hoc/:idKhoaHoc",
  // },

  {
    title: "Kiểm tra khóa học",
    component: ThongBao_TaskPage,

    icon: icons.luyenTap,
    path: "/thongbao-task",
  },

  // {
  //   title: "Giới thiệu bạn bè",
  //   component: GioiThieuBanBePage,
  //   icon: icons.gioiThieuBanBe,
  //   path: "/gioi-thieu-ban-be",
  // },
  // {
  //   title: "Học thử",
  //   component: LoginPageDemo,
  //   icon: icons.chungNhan,
  //   path: "/demo",
  // },
];

// export const Navbar_DeatilbaiHoc_Route = [
//   {
//     title: "Dashboard",
//     component: Dashboard,
//     icon: icons.dashboard,
//     path: "/",
//     // path: "/dashboard",
//     exact: true,
//   },
//   {
//     title: "Lộ trình",
//     component: LoTrinhCuaBan,
//     icon: icons.loTrinh,
//     path: "/lo-trinh-cua-ban",
//   },
// ];
export const sidebar_Mobie_Route = [
  {
    title: "Dashboard",
    component: Dashboard,
    icon: icons.dashboard,
    path: "/",
    // path: "/dashboard",
    exact: true,
  },
  {
    title: "Lộ trình",
    component: LoTrinhPage,
    icon: icons.loTrinh,
    path: "/lo-trinh",
  },
  // {
  //   title: "Lộ trình",
  //   component: LoTrinhCuaBan,
  //   icon: icons.loTrinh,
  //   path: "/lo-trinh-cua-ban",
  // }, // {
  //   title: "Luyện tập",
  //   component: LuyenTapPage,
  //   icon: icons.luyenTap,
  //   path: "/luyen-tap",
  // },
  // {
  //   title: "Dự án",
  //   component: ProjectsPage,
  //   icon: icons.duAn,
  //   path: "/du-an",
  // },
  {
    title: "Chứng nhận và điểm",
    component: ChungNhanPage,
    icon: icons.chungNhan,
    path: "/chung-nhan",
  },

  // {
  //   title: "Tạo CV",
  //   component: TaoCvPage,
  //   icon: icons.taoCV,
  //   path: "/tao-cv",
  // },
  // {
  //   title: "Giới thiệu bạn bè",
  //   component: GioiThieuBanbe,
  //   icon: icons.gioiThieuBanBe,
  //   path: "/gioi-thieu-ban-be",
  // },
  // {
  //   title: "Daily Task",
  //   component: GioiThieuBanbe,
  //   icon: icons.dailyTask,
  //   path: "/gioi-thieu-ban-be",
  // },
  // {
  //   title: "Trợ giúp",
  //   component: GioiThieuBanbe,
  //   icon: icons.question,
  //   path: "/gioi-thieu-ban-be",
  // },
];
