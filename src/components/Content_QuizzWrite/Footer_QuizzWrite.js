import { Button, Modal, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import httpServ from "../../services/http.service";
import { useHistory } from "react-router-dom";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";

export default function Footer_QuizzWrite({
    current,
    total,
    handleClickNextQuestion,
    isDisableBtn,
    currentLesson,
    allQuestions,
    baiTapDaNop
}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const baiHoc = useSelector((state) => state.baiHoc);
    const { khoaHocContent } = useSelector((state) => state.khoaHoc);
    const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
    const userInfor = useSelector((state) => state.authUser.userInfor);

    const handle_PostKetQua = () => {

        let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
            return item.id === currentLesson.id;
        });

        let inforQuizz = {
            loTrinhId: khoaHocContent.maLoTrinh,
            khoaHocId: khoaHocContent.id,
            baiHocId: currentLesson.id,
            nguoiDungId: userInfor?.id,
            baiLam: JSON.stringify(allQuestions),
        };

        if (baiTapDaNop && baiTapDaNop.trangThai == 'PENDING') {
            httpServ
                .putRedoBaiTapTuLuanQuizz(baiTapDaNop.id, inforQuizz)
                .then((res) => {
                    dispatch(setCurrentLesson(tatCaBaiHoc[currentLessonIndex + 1]));
                })
                .catch((err) => {
                    console.log("no", err);
                });
        }
        else {
            httpServ
                .postBaiTapTuLuanQuizz(inforQuizz)
                .then((res) => {
                    dispatch(setCurrentLesson(tatCaBaiHoc[currentLessonIndex + 1]));
                })
                .catch((err) => {
                    console.log("no", err);
                });
        }
        
        httpServ
            .postCompletedBaiHoc({
                loTrinhId: khoaHocContent.maLoTrinh,
                khoaHocId: khoaHocContent.id,
                baiHocId: baiHoc.currentLesson.id,
                nguoiDungId: userInfor?.id,
            })
            .then((res) => {
                dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
                if(currentLessonIndex + 1 == tatCaBaiHoc.length){
                    Modal.confirm({
                        title: "Xác nhận",
                        content: 'Bạn đã hoàn thành tất cả các bài học!',
                        cancelText: 'Ở lại',
                        okText: 'Xem lộ trình',
                        onOk: () => {
                            history.push('/lo-trinh');
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleClickNext = () => {
        return !isDisableBtn ? handleClickNextQuestion() : null;
    };

    const percent = Math.floor((current / total) * 100);
    const nextBtnCss = isDisableBtn
        ? " text-gray-600 bg-gray-300 cursor-not-allowed"
        : "  btn-theme text-white ";

    return (
        <div className="  flex items-center h-16 w-full justify-center space-x-10 px-16 border-none rounded-2xl">
            <div className="flex items-cente space-x-5 justify-center max-w-screen-md w-full">
                <Progress
                    step={total}
                    percent={percent}
                    className="w-full"
                    showInfo={false}
                    strokeWidth={15}
                    strokeColor={{
                        "0%": "#4A00E0",
                        "100%": "#8E2DE2",
                    }}
                    trailColor={"rgba(68, 66, 178, 0.1)"}
                />
                <span className="font-bold flex-shrink-0 text-color-title">
                    {current}/{total} câu
                </span>
            </div>

            <Button
                onClick={() => {
                    return current === total
                        ? handle_PostKetQua()
                        : handleClickNext()
                }}
                className={
                    "  text-white duration-150 font-bold px-8 rounded  flex items-center h-10 flex-shrink-0 border-none  focus:border-blue-theme hover:border-transparent hover:shadow-lg" +
                    nextBtnCss
                }
            >
                {current == total ? "Hoàn thành" : " Câu tiếp theo"}
            </Button>
        </div>
    );
}

