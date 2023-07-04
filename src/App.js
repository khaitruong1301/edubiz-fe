import "./App.css";
import HomeTemplate from "./pages/HomeTemplate/HomeTemplate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { userRoute } from "./routes";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoginPageDemo from "./pages/LoginPage/LoginHocDemo";
import { useEffect, useMemo, useState } from "react";
import { connection } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { setAllThongBao } from "./redux/reducer/thongBaoReducer";
import { checkDemoUser, removeDemoUser } from "./utils/HocDemoUtils";
import httpServ from "./services/http.service";
import localStorageServ from "./services/locaStorage.service";
import PopUpAlertDemoUser from "./components/PopUpAlertDemoUser/PopUpAlertDemoUser";
import SignUpPage from "./pages/SignUp/SignUpPage";
import Upgrade_Notify_Page from "./pages/Upgrade_Notify_Page";
import DetailKhoaHoc from "./pages/DetailKhoaHoc/DetailKhoaHoc";
import { getCurrentDay, handleLogoutAction } from "./utils/LogOut";
import { Redirect } from "react-router";
import useWindowSize from "./hook/useWindowSize";
import SpinnerComponent from "./components/Spinner";
import backGrountTemplate from "./assets/img/background.png";
import "./css/overwriteCssTemplateAntd.css";
import "antd/dist/antd.css";
import "./index.css";
import "./css/DetailKhoaHoc.css";
import "./css/Header_Sider.css";
import BlackFriday from "./pages/BlackFriday/BlackFriday";
import { DARK_MODE, LIGHT_MODE } from "./constants/theme";
import LuckyTetPage from "./pages/LuckyTetPage/LuckyTetPage";
import { ChinhSachBaoMat } from "./pages/ChinhSachBaoMat";
import TestQuizPage from "./pages/TestQuizPage/TestQuizPage";
import { useMediaQuery } from "react-responsive";
import { MobileTemplate } from "./mobile-template";
import useFullscreenStatus from "./hook/useFullscreenStatus";
import { useRef } from "react";

// useEffect(() => {
const root = window.document.documentElement;

let theme = localStorageServ.modeTheme.get()
  ? localStorageServ.modeTheme.get()
  : LIGHT_MODE;
if (theme === DARK_MODE) {
  root.classList.add(DARK_MODE);
  root.classList.remove(LIGHT_MODE);
}

if (theme === LIGHT_MODE) {
  root.classList.add(LIGHT_MODE);
  root.classList.remove(DARK_MODE);
}
// }, [])

function DesktopTemlate() {
  const theme = useSelector((state) => state.theme.theme);

  const dispatch = useDispatch();
  const [isShowModalAlert, setisShowModalAlert] = useState(false);

  let isDemoUser = useMemo(() => checkDemoUser(), []);

  useEffect(() => {
    connection.on("GetThongBaoRT", (items) => {
      dispatch(setAllThongBao(items));
    });
    if (!isDemoUser) {
      connection.on("GetThongBaoFakeRT", (items) => { });
    }

    httpServ.getTuDongGiaHanLoTrinh()
    .then(res => console.log(true))
    .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    if (isDemoUser) {
      let myInterval;

      let codeDemo = localStorageServ.codeDemo.get();
      httpServ
        .getCheckThoiGianHocDemo(codeDemo)
        .then((res) => {
          if (!res.data.content) {
            let userDemo = localStorageServ.userDemo;
            userDemo.remove();
            window.location.href = "https://www.facebook.com/lophocviet/";
          }

          localStorageServ.timeDemo.set(res.data.content);
          let result = res.data.content.split("-");
          let time = result[0].split(":");
          let totalTime = time[0] * 3600 + time[1] * 60 + time[2] * 1;
          myInterval = setInterval(() => {
            totalTime = totalTime - 1;
            if (totalTime === 300 || totalTime === 301) {
              setisShowModalAlert(true);
            }
            // console.log({ totalTime });
            if (totalTime <= 0) {
              removeDemoUser();
              return (window.location.href =
                "https://www.facebook.com/lophocviet/");
            }
          }, 2000);
        })
        .catch((err) => {
          let userDemo = localStorageServ.userDemo;
          userDemo.remove();
          window.location.href = "https://www.facebook.com/lophocviet/";
        });
    }
    if (!isDemoUser) {
      if (localStorageServ.timeLogin.get()) {
        if (
          localStorageServ.timeLogin.get() !== getCurrentDay() &&
          window.location.pathname !== "/lms" &&
          window.location.pathname !== "/demo" &&
          window.location.pathname !== "/signup" &&
          window.location.pathname !== "/lucky" &&
          window.location.pathname !== "/blackfriday" &&
          window.location.pathname !== "/baomat"
        ) {
          handleLogoutAction();
        }
      } else {
        if (
          window.location.pathname !== "/lms" &&
          window.location.pathname !== "/demo" &&
          window.location.pathname !== "/signup" &&
          window.location.pathname !== "/lucky" &&
          window.location.pathname !== "/blackfriday" &&
          window.location.pathname !== "/baomat"
        ) {
          handleLogoutAction();
        }
      }
    }
  }, []);

  const renderUserModule = (routers) => {
    return routers.map((route, index) => {
      return (
        <HomeTemplate
          Component={route.component}
          path={route.path}
          exact={route.exact}
          key={index}
        ></HomeTemplate>
      );
    });
  };
  let { widthWindow, heightWindow } = useWindowSize();
  if (widthWindow < 760) {
    if (
      window.location.pathname !== "/lms" &&
      window.location.pathname !== "/signup" &&
      window.location.pathname !== "/demo" &&
      !window.location.pathname.includes("detail-khoa-hoc") &&
      window.location.pathname !== "/lucky" &&
      window.location.pathname !== "/blackfriday"
    ) {
      return <Upgrade_Notify_Page />;
    }
  }
  let css_bg_theme = {};
  if (theme === DARK_MODE) {
    css_bg_theme.background = `#222736`;
  } else {
    css_bg_theme.background = `url(${backGrountTemplate})`;
  }
  return (
    <div style={css_bg_theme} className="backgoundTemplate bg-cover  ">
      {isDemoUser ? (
        <PopUpAlertDemoUser
          isShowModal={isShowModalAlert}
          handleOk={(value) => {
            setisShowModalAlert(value);
          }}
        />
      ) : (
        ""
      )}
      <SpinnerComponent />
      <BrowserRouter>
        <Switch>
          <Route path="/baomat" component={ChinhSachBaoMat} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/lms" component={LoginPage} />

          <HomeTemplate
            Component={DetailKhoaHoc}
            path={"/detail-khoa-hoc/:idKhoaHoc"}
            isCurrentDetailPage={true}
          ></HomeTemplate>
          {
            renderUserModule(userRoute)
          }
          <Route path="/demo" component={LoginPageDemo} />
          {/* <Route path="/lucky" component={LuckyWhell} /> */}
          {/* <Route path="/blackfriday" component={BlackFriday} /> */}
          <Route path="/lucky" component={LuckyTetPage} />
          <Route path="/java-quiz" component={TestQuizPage} />
          <Redirect to="/lms" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

function App() {
  // const mediaQuery = useMediaQuery({ maxWidth: 767 });992
  const mediaQuery = useMediaQuery({ maxWidth: 991 });

  return (
    mediaQuery ? <MobileTemplate /> : <DesktopTemlate />
  )
}

export default App;
