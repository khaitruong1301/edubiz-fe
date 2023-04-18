import React, { useState } from "react";
import { Layout } from "antd";
import "antd/dist/antd.css";
import Menu_Sider_DetailKhoaHoc from "../components/Sider/Menu_Sider_DetailKhoaHoc";
import { useEffect } from "react";
import httpServ from "../services/http.service";
import { useDispatch, useSelector } from "react-redux";

import localStorageServ from "../services/locaStorage.service";
import Content_DetailKhoaHoc from "../components/Content_DetailKhoaHoc/Content_DetailKhoaHoc";
import {
  setCurrentLesson,
  setIdBaiDangHocDashboard,
  setlastVideoCanWatchIndex,
} from "../redux/reducer/baiHocContentReducer";
import {
  setAllLessons,
  setdanhSachBaiDaHoc,
  setDiemAndBaiTap,
  setKhoaHocContent,
  setKhoaHocQandA,
} from "../redux/reducer/khoaHocReducer";
import { setUserInfor } from "../redux/reducer/authReducer";
import Tour from "reactour";
import { stepDetailKhoaHocConfig } from "../tourConfig/tourConfig";
import { checkDemoUser } from "../utils/HocDemoUtils";
import { useTour } from "@reactour/tour";
import { setUserTour } from "../redux/reducer/tourReducer";
import { useHistory } from "react-router";
const widthSidebar = 450;
const { Sider } = Layout;

export default function DetailKhoaHoc({ match }) {
  let history = useHistory();
  let idKhoaHoc = match?.params?.idKhoaHoc;
  let idBaiDangHocDashboard = useSelector(
    (state) => state.baiHoc.idBaiDangHocDashboard
  );
  let userInfor = useSelector((state) => state.authUser.userInfor);
  const dispatch = useDispatch();
  let khoaHoc = useSelector((state) => state.khoaHoc);
  let { allLessons } = useSelector((state) => state.khoaHoc);
  let baiDaHoc = khoaHoc.danhSachBaiDaHoc;
  useEffect(() => {
    !checkDemoUser() &&
      httpServ.getDanhSachBaiDaHoc(idKhoaHoc, userInfor?.id).then((res) => {
        let danhSachBaiDaHocRespon = res.data.content;
        danhSachBaiDaHocRespon = JSON.parse(danhSachBaiDaHocRespon);
        if (danhSachBaiDaHocRespon.length === 0) {
        }
        dispatch(setdanhSachBaiDaHoc(danhSachBaiDaHocRespon));

        httpServ
          .getDetailKhoaHoc(idKhoaHoc)
          .then((res) => {
            let khoaHocContent = res.data.content;
            dispatch(setKhoaHocContent(khoaHocContent));
            httpServ
              .getQandA_KhoacHoc(khoaHocContent.maLoTrinh, userInfor?.id)
              .then((res) => {
                dispatch(setKhoaHocQandA(res.data.content));
              })
              .catch((err) => {
                console.log(err);
              });
            httpServ
              .getDiemAndBaiTap(khoaHocContent.maLoTrinh, userInfor?.id)
              .then((res) => {
                dispatch(setDiemAndBaiTap(res.data.content));
              })
              .catch((err) => {
                console.log(err);
              });
            let allLessons = [];
            for (let i = 0; i < khoaHocContent.danhSachChuongHoc.length; i++) {
              let course = khoaHocContent.danhSachChuongHoc[i].danhSachBaiHoc;
              allLessons = [...allLessons, ...course];
              dispatch(setAllLessons(allLessons));
              if (checkDemoUser() && danhSachBaiDaHocRespon.length === 0) {
                let index = allLessons.findIndex((lesson) => {
                  return lesson.xemDemo;
                });
                let lessonConvered = { ...allLessons[index] };
                dispatch(setCurrentLesson(lessonConvered));
                break;
              }
              if (danhSachBaiDaHocRespon.length === 0) {
                let lessonConvered = { ...allLessons[0] };
                dispatch(setCurrentLesson(lessonConvered));
              } else {
                if (checkDemoUser()) {
                  return;
                }
                if (idBaiDangHocDashboard) {
                  let currentLessonIndex = allLessons.findIndex((item) => {
                    return item.id * 1 === idBaiDangHocDashboard * 1;
                  });
                  let lessonConvered = { ...allLessons[currentLessonIndex] };
                  dispatch(setCurrentLesson(lessonConvered));
                } else {
                  let lastLessonIndex =
                    danhSachBaiDaHocRespon[danhSachBaiDaHocRespon.length - 1];
                  let currentLessonIndex = allLessons.findIndex((item) => {
                    return item.id === lastLessonIndex;
                  });
                  // console.log(currentLessonIndex, lastLessonIndex, allLessons);
                  if (currentLessonIndex === allLessons.length - 1) {
                    let lessonConvered = {
                      ...allLessons[currentLessonIndex],
                    };
                    dispatch(setCurrentLesson(lessonConvered));
                  } else {
                    let lessonConvered = {
                      ...allLessons[currentLessonIndex + 1],
                    };
                    dispatch(setCurrentLesson(lessonConvered));
                  }
                }
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    return () => {
      dispatch(setIdBaiDangHocDashboard(null));

    };
  }, []);
  useEffect(() => {
    checkDemoUser() &&
      httpServ
        .getDetailKhoaHoc(idKhoaHoc)
        .then((res) => {
          let khoaHocContent = res.data.content;
          // console.log("khoaHocContent", khoaHocContent); / d  g

          dispatch(setKhoaHocContent(khoaHocContent));
          httpServ
            .getQandA_KhoacHoc(khoaHocContent.maLoTrinh, userInfor?.id)
            .then((res) => {
              dispatch(setKhoaHocQandA(res.data.content));
            })
            .catch((err) => {
              console.log(err);
            });

          let allLessons = [];
          for (let i = 0; i < khoaHocContent.danhSachChuongHoc.length; i++) {
            let course = khoaHocContent.danhSachChuongHoc[i].danhSachBaiHoc;
            allLessons = [...allLessons, ...course];
            dispatch(setAllLessons(allLessons));
          }
          // let lastVideoCanWatchIndex = -1;
          // // console.log("allLessons", allLessons);
          // if (baiDaHoc.length == 0) {
          //   let lesson = allLessons.findIndex((lesson) => {
          //     return lesson.maLoaiBaiHoc !== "QUIZ_WRITE";
          //   })
          //   lastVideoCanWatchIndex = lesson.id

          // } else {
          //   for (let index = baiDaHoc.length - 1; index >= 0; index--) {
          //     let idBaiDaHoc = baiDaHoc[index];
          //     lastVideoCanWatchIndex = allLessons.findIndex((lesson) => {
          //       return (
          //         lesson.id * 1 === idBaiDaHoc * 1 &&
          //         lesson?.maLoaiBaiHoc !== "QUIZ_WRITE"
          //       );
          //     });
          //     if (lastVideoCanWatchIndex !== -1) break;
          //   }
          // }
          // console.log(lastVideoCanWatchIndex);
          let currentLessonIndex = allLessons.findIndex((item) => {
            return item.xemDemo;
          });
          dispatch(setCurrentLesson(allLessons[currentLessonIndex]));
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  useEffect(() => {
    !checkDemoUser() &&
      httpServ
        .getInforUser(userInfor?.id)
        .then((res) => {
          localStorageServ.userInfor.set(res.data.content);
          let userInfor = res.data.content;
          dispatch(setUserInfor(userInfor));
        })
        .catch((err) => {
          console.log(err);
        });
  }, [baiDaHoc.length]);
  useEffect(() => {
    !checkDemoUser() &&
      httpServ
        .getCheckUserDetailBaiHoc(userInfor?.id, khoaHoc.khoaHocContent.id)
        .then((res) => {
          // console.log("res", res);
          if (res.data.content.hetHan) {
            history.push("/");
          }
          let newUserInfor = { ...userInfor };
          newUserInfor.nuocNgoai = res.data.content.nuocNgoai;
          dispatch(setUserInfor(newUserInfor));
        })
        .catch((err) => {
        });

    if (checkDemoUser()) {
      let isNuocNgoai = localStorageServ.nuocngoaiDemo.get()
      let newUserInfor = { ...userInfor };
      newUserInfor.nuocNgoai = isNuocNgoai * 1;
      dispatch(setUserInfor(newUserInfor));
    }
  }, []);

  useEffect(() => {
    let lastVideoCanWatchIndex = -1;
    if (baiDaHoc.length == 0) {
      let lessonIndex = allLessons.findIndex((lesson) => {
        return lesson.maLoaiBaiHoc !== "QUIZ_WRITE";
      })
      if (lessonIndex) {

        lastVideoCanWatchIndex = lessonIndex
      }
    } else {
      for (let index = baiDaHoc.length - 1; index >= 0; index--) {
        let idBaiDaHoc = baiDaHoc[index];
        lastVideoCanWatchIndex = allLessons.findIndex((lesson) => {
          return (
            lesson.id * 1 === idBaiDaHoc * 1 &&
            lesson?.maLoaiBaiHoc !== "QUIZ_WRITE"
          );
        });
        if (lastVideoCanWatchIndex !== -1) break;
      }
    }
    dispatch(setlastVideoCanWatchIndex(lastVideoCanWatchIndex));
  }, [allLessons.length, baiDaHoc.length]);
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
    setIsOpen(true);
  };
  const { setIsOpen } = useTour();

  let userTour = useSelector((state) => state.tour.userTour);

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
        isOpen={false}
        className="rounded-lg p-8"
        rounded={5}
        accentColor={"#222260"}
      />
      <Layout className="w-full flex-grow  bg-transparent flex ">
        <Layout
          style={collapsed ? { marginRight: 0 } : { marginRight: widthSidebar }}
          className=" duration-300 flex flex-col  bg-transparent justify-start flex-grow "
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
          {/* <ContentVideo_DetailKhoaHoc /> */}
          <div
            className="w-full h-max-content p-3 flex-grow flex flex-col"
            data-tour="detail-step-4"
          >
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
          className="  z-10 card_theme border-none  pt-16 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-50 text-left   card_theme rounded-t-none border-t-1 border-gray-400  "
          collapsible
          collapsed={collapsed}
          collapsedWidth={0}
          width={widthSidebar}
        >
          <div data-tour="detail-step-3">
            <div
              className="flex p-3 items-center justify-between text-lg px-4 pr-5  card_theme  border-r-0 border-l-0 rounded-none border-b-1 border-t-1    h-16 fixed top-0 right-0 z-20  border-gray-400"
              style={{ width: widthSidebar }}
            >
              <p className="">Nội khoá học</p>
              <i className="fa fa-times cursor-pointer" onClick={toggle}></i>
            </div>
            <Menu_Sider_DetailKhoaHoc />
          </div>
        </Sider>
      </Layout>
    </>
  );
}
