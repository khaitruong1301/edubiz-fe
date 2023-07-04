import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson, setIsRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";

export default function Content_QuizzWrite_Success({ setHoanThanh, currentLesson, baiTapDaNop }) {

    const dispatch = useDispatch();
    const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);

    let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
        return item.id === currentLesson.id;
    });

    const handleNextLesson = () => {
        let nextLessonIndex = currentLessonIndex + 1;
        dispatch(setCurrentLesson(tatCaBaiHoc[nextLessonIndex]));
    };

    const handleConfirmRedoQuizz = () => {
        setHoanThanh(false);
    }

    return (
        <div className="w-full h-full ContentQuizz  flex flex-col items-center justify-center bg-dark-theme bg-opacity-20">

            <div className="w-2/3 h-1/2 ContentQuizzWrrapper flex flex-col bg-white card_theme border-none items-center justify-center space-y-7">
                <div className="space-y-7 text-center">
                    <p className="font-medium text-xl mb-3">
                        <i className="fa  fa-check mr-2 text-green-theme text-xl"></i>{" "}
                        {baiTapDaNop?.diem} điểm
                    </p>
                    {
                        baiTapDaNop && baiTapDaNop.diem < 70 ? 
                        <span>Bạn cải thiện điểm cho bài tập này!</span> 
                        : 
                        <span>Bạn đã hoàn thành bài tập này!</span>}
                </div>
                <div className="flex items-center space-x-5">
                    {/* <button
            onClick={() => openViewAnswers()}
            className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
          >
            <span> Xem kết quả</span> <i className="fa fa-eye"></i>
          </button> */}
                    {
                        baiTapDaNop && baiTapDaNop.diem < 70 ? <button
                            onClick={() => handleConfirmRedoQuizz()}
                            className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
                        >
                            <span> Làm lại</span> <i className="fa fa-redo-alt"></i>
                        </button> : null
                    }

                    {
                        currentLessonIndex + 1 !== tatCaBaiHoc.length &&
                        <button
                            onClick={() => {
                                handleNextLesson();
                            }}
                            className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"

                        >
                            Bài tiếp theo
                        </button>
                    }
                </div>
            </div>
        </div>
    );
}
