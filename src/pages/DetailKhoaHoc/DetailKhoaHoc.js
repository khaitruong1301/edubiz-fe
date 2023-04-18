import React, { useMemo, useState } from "react";
import { Layout } from "antd";
import Menu_Sider_DetailKhoaHoc from "../../components/Sider/Menu_Sider_DetailKhoaHoc";
import { useEffect } from "react";
import httpServ from "../../services/http.service";
import { useDispatch, useSelector } from "react-redux";
import localStorageServ from "../../services/locaStorage.service";
import Content_DetailKhoaHoc from "../../components/Content_DetailKhoaHoc/Content_DetailKhoaHoc";
import {
  setCurrentLesson,
  setlastVideoCanWatchIndex,
  setAllKeyBaiHocReducer
} from "../../redux/reducer/baiHocContentReducer";
import {
  setAllKeyKhoaHocReducer,
  setAllLessons,
  setKhoaHocContent,
} from "../../redux/reducer/khoaHocReducer";
import { getUpdateUserInforAciton, setUserInfor } from "../../redux/reducer/authReducer";
import Tour from "reactour";
import { stepDetailKhoaHocConfig } from "../../tourConfig/tourConfig";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { setUserTour } from "../../redux/reducer/tourReducer";
import { useHistory } from "react-router";
import CloneObjectByJSON from "../../utils/CloneObjectByJSON";
import useDidMount from "../../hook/useDidMount";
import GetLastVideoCanWatch from "../../utils/GetLastVideoCanWatch";
import { setIsSiderDetailKhoaHocOpen } from "../../redux/reducer/layoutReducer";
import useWindowSize from "../../hook/useWindowSize";
const { Sider } = Layout;

export default function DetailKhoaHoc({ match }) {
  let didMount = useDidMount()
  let history = useHistory();
  let idKhoaHoc = match?.params?.idKhoaHoc;
  let userInfor = localStorageServ.userInfor.get()
  const dispatch = useDispatch();
  let dataKhoaHocReducer = useSelector((state) => state.khoaHoc);
  let { userTour } = useSelector((state) => state.tour);
  let dataBaiHocHocReducer = useSelector((state) => state.baiHoc);
  let khoaHoc = CloneObjectByJSON(dataKhoaHocReducer)
  let baiHoc = CloneObjectByJSON(dataBaiHocHocReducer)
  let baiDaHoc = khoaHoc.danhSachBaiDaHoc;
  let { idBaiDangHocDashboard } = baiHoc

  let isDemoUser = useMemo(() => checkDemoUser(), [])

  const fetchQ_A = (loTrinhId, userId) => {
    return httpServ
      .getQandA_KhoacHoc(loTrinhId, userId)
      .then((res) => {
        return res.data.content
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const fetchDiemAndBaiTap = (loTrinhId, userId) => {
    return httpServ
      .getDiemAndBaiTap(loTrinhId, userId)
      .then((res) => {
        return res.data.content
      })
      .catch((err) => {
        console.log(err);
      });
  }



  useEffect(() => {
    !isDemoUser &&
      httpServ.getDanhSachBaiDaHoc(idKhoaHoc, userInfor?.id).then((res) => {
        let danhSachBaiDaHocRespon = res.data.content.baiDaHoc

        khoaHoc.danhSachBaiDaHoc = res.data.content.baiDaHoc

        httpServ
          .getDetailKhoaHoc(idKhoaHoc)
          .then((res) => {
            let khoaHocContent = res.data.content;
            khoaHoc.khoaHocContent = khoaHocContent
            let Q_A = fetchQ_A(khoaHocContent.maLoTrinh, userInfor?.id)
            let DiemBaiTAp = fetchDiemAndBaiTap(khoaHocContent.maLoTrinh, userInfor?.id)
            let allLessons = [];
            for (let i = 0; i < khoaHocContent.danhSachChuongHoc.length; i++) {
              let course = khoaHocContent.danhSachChuongHoc[i].danhSachBaiHoc;
              allLessons = [...allLessons, ...course];
              khoaHoc.allLessons = allLessons
            }
            let results = async function () {
              results = await Promise.all([Q_A, DiemBaiTAp])
              khoaHoc.QandA = results[0]
              khoaHoc.diemAndBaiTap = results[1]
              dispatch(setAllKeyKhoaHocReducer(khoaHoc))
            }()


            let lessonConvered = {}
            if (isDemoUser && danhSachBaiDaHocRespon.length === 0) {
              let index = allLessons.findIndex((lesson) => {
                return lesson.xemDemo;
              });
              lessonConvered = { ...allLessons[index] };
            }
            if (danhSachBaiDaHocRespon.length === 0) {
              lessonConvered = { ...allLessons[0] };
            } else {
              if (isDemoUser) {
                return;
              }
              if (idBaiDangHocDashboard) {
                let currentLessonIndex = allLessons.findIndex((item) => {
                  return item.id * 1 === idBaiDangHocDashboard * 1;
                });
                lessonConvered = { ...allLessons[currentLessonIndex] };
              } else {
                let lastLessonIndex = GetLastVideoCanWatch(khoaHoc.danhSachBaiDaHoc, khoaHoc.allLessons)
                if (lastLessonIndex === allLessons.length - 1) {
                  lessonConvered = {
                    ...allLessons[lastLessonIndex],
                  };
                } else {
                  lessonConvered = {
                    ...allLessons[lastLessonIndex + 1],
                  };
                }
              }
              let lastVideoCanWatchIndex = GetLastVideoCanWatch(khoaHoc.danhSachBaiDaHoc, khoaHoc.allLessons)
              baiHoc.lastVideoCanWatchIndex = lastVideoCanWatchIndex
            }
            baiHoc.currentLesson = lessonConvered

            dispatch(setAllKeyBaiHocReducer(baiHoc))
          })
          .catch((err) => {
            console.log(err);
          });
      });
    return () => {
      let newBaiHoc = CloneObjectByJSON(baiHoc)
      newBaiHoc.currentLesson = null;
      newBaiHoc.idBaiDangHocDashboard = null
      dispatch(setAllKeyBaiHocReducer(newBaiHoc))
      dispatch(setKhoaHocContent([]))
    };
  }, [idKhoaHoc]);
  useEffect(() => {
    isDemoUser &&
      httpServ
        .getDetailKhoaHoc(idKhoaHoc)
        .then((res) => {
          let khoaHocContent = res.data.content;

          dispatch(setKhoaHocContent(khoaHocContent));

          let allLessons = [];
          for (let i = 0; i < khoaHocContent.danhSachChuongHoc.length; i++) {
            let course = khoaHocContent.danhSachChuongHoc[i].danhSachBaiHoc;
            allLessons = [...allLessons, ...course];
            if (isDemoUser) {
              let index = allLessons.findIndex((lesson) => { return lesson.xemDemo })
              if (index == -1) {
                setIsShowNotify(true)
              }
            }
            dispatch(setAllLessons(allLessons));
          }
          let currentLessonIndex = allLessons.findIndex((item) => {
            return item.xemDemo;
          });
          dispatch(setCurrentLesson(allLessons[currentLessonIndex]));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [idKhoaHoc]);
  useEffect(() => {
    !isDemoUser && didMount && dispatch(getUpdateUserInforAciton(userInfor?.id))


  }, [baiDaHoc.length, idKhoaHoc]);
  useEffect(() => {

    if (khoaHoc.khoaHocContent?.maLoTrinh && !isDemoUser) {

      httpServ
        .getCheckUserDetailBaiHoc(userInfor?.id, khoaHoc.khoaHocContent.maLoTrinh)
        .then((res) => {
          if (res.data.content.hetHan) {
            history.push("/");
          }
          let newUserInfor = { ...userInfor };
          newUserInfor.nuocNgoai = res.data.content.nuocNgoai;
          dispatch(setUserInfor(newUserInfor));
        })
        .catch((err) => {
          history.push("/");
        });
    }
  }, [khoaHoc.khoaHocContent?.maLoTrinh, idKhoaHoc]);

  useEffect(() => {
    if (didMount) {
      let lastVideoCanWatchIndex = GetLastVideoCanWatch(khoaHoc.danhSachBaiDaHoc, khoaHoc.allLessons)
      dispatch(setlastVideoCanWatchIndex(lastVideoCanWatchIndex));

    }
  }, [baiDaHoc.length, idKhoaHoc]);
  const [collapsed, setCollapsed] = useState(false);
  const [isShowNotify, setIsShowNotify] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
    dispatch(setIsSiderDetailKhoaHocOpen(collapsed))
  };
  let { widthWindow, heightWindow } = useWindowSize()

  const widthSidebar = widthWindow > 992 ? 400 : 270;

  return (
    <>
      <Tour
        onRequestClose={() => {
          let newUserTour = { ...userTour };
          newUserTour.isShowDetail = false;
          dispatch(setUserTour(newUserTour));
          if (localStorageServ.userTour.get().isShowDetail) {
            let userTour = localStorageServ.userTour.get();
            userTour.isShowDetail = false;
            localStorageServ.userTour.set(userTour);
          }
        }}
        steps={stepDetailKhoaHocConfig}
        isOpen={userTour.isShowDetail}
        className="rounded-lg p-8"
        rounded={5}
        accentColor={"#222260"}
      />
      <Layout className="w-full flex-grow  bg-transparent flex overflow-hidden ">
        <Layout
          style={collapsed ? { marginRight: 0 } : { marginRight: widthSidebar }}
          className=" duration-300 flex flex-col  bg-transparent justify-start flex-grow relative "
        >
          {collapsed ? (
            <div
              onClick={toggle}
              className="cursor-pointer absolute w-40 right-0 top-40 h-10  flex items-center space-x-3 justify-center card_theme bort transform translate-x-32 hover:translate-x-0 duration-200 z-10"
            >
              <i className=" fa fa-arrow-left text-blue-theme"></i>{" "}
              <span className="text-blue-theme ">Nội dung khóa học</span>
            </div>
          ) : (
            ""
          )}
          <div
            className="w-full h-max-content p-3 flex-grow flex flex-col"
            data-tour="detail-step-4"
          >
            {isDemoUser && isShowNotify && <div className="text-xl card_theme p-3 text-center">
              Khoá học này hiện tại không có bài học thử, bạn vui lòng chọn khoá học khác để xem video học thử nhé
            </div>}
            <Content_DetailKhoaHoc />
          </div>
        </Layout>

        <Sider
          reverseArrow={true}
          style={{
            overflow: "auto",
            height: window.innerHeight - 80,
            position: "fixed",
            top: 81,
            right: 0,
          }}
          className="  z-10  card_theme border-none  scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-50 text-left   card_theme rounded-t-none border-t-1 border-gray-400  "
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          width={widthSidebar}
        >
          <div data-tour="detail-step-3">
            <div
              className="flex p-3 items-center justify-between text-lg px-4 pr-5  card_theme  border-r-0 border-l-0 rounded-none border-b-1 border-t-1    h-16   border-gray-400"
              style={{ width: widthSidebar }}
            >
              <p className="text-color-title">Nội dung khoá học</p>
              <i className="fa fa-times cursor-pointer text-color-title" onClick={toggle}></i>
            </div>
            <Menu_Sider_DetailKhoaHoc />
          </div>
        </Sider>
      </Layout>
    </>
  );
}
