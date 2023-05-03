import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { NavBar } from "../common";
import httpServ from "../../services/http.service";
import { useMemo } from "react";
import localStorageServ from "../../services/locaStorage.service";
import CloneObjectByJSON from "../../utils/CloneObjectByJSON";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import GetLastVideoCanWatch from "../../utils/GetLastVideoCanWatch";
import { setAllKeyBaiHocReducer } from "../../redux/reducer/baiHocContentReducer";
import { setAllKeyKhoaHocReducer, setKhoaHocContent } from "../../redux/reducer/khoaHocReducer";
import { useEffect, useState } from "react";
import Content_DetailKhoaHoc from "../../components/Content_DetailKhoaHoc/Content_DetailKhoaHoc";
import Menu_Sider_DetailKhoaHoc from "../../components/Sider/Menu_Sider_DetailKhoaHoc";
import './CourseMobile.css'
import CourseHeader from "./course-header/CourseHeader";

export default function CourseMobile(props) {
    const [showMenu, setShowMenu] = useState(false);

    const dispatch = useDispatch();
    let { id } = useParams();
    let userInfo = localStorageServ.userInfor.get()
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
            httpServ.getDanhSachBaiDaHoc(id, userInfo?.id).then((res) => {
                let danhSachBaiDaHocRespon = res.data.content.baiDaHoc

                khoaHoc.danhSachBaiDaHoc = res.data.content.baiDaHoc

                httpServ
                    .getDetailKhoaHoc(id)
                    .then((res) => {
                        let khoaHocContent = res.data.content;
                        khoaHoc.khoaHocContent = khoaHocContent
                        let Q_A = fetchQ_A(khoaHocContent.maLoTrinh, userInfo?.id)
                        let DiemBaiTAp = fetchDiemAndBaiTap(khoaHocContent.maLoTrinh, userInfo?.id)
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


                        let lessonConvered = {};

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
    }, [id]);

    const handleShowMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <CourseHeader title="Khóa học" toggleLession={showMenu} onToggleLession={(handleShowMenu)} />
            <div className='course-mobile'>
                <Content_DetailKhoaHoc />
                <div className={`course-mobile_menu ${showMenu ? 'show' : ''}`}>
                    <div className="course-mobile_menucontent">
                        <Menu_Sider_DetailKhoaHoc onToggle={(handleShowMenu)} />
                    </div>
                </div>
            </div>
        </>
    )
}