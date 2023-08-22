import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsRedoQuizz, setIsTotalRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";

export default function Content_Quizz_Restart({ stateQuizz }) {

    const dispatch = useDispatch();
    const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
    let totalRedoQuizz = useSelector((state) => state.baiHoc.totalRedoQuizz);
    const { userInfor } = useSelector((state) => state.authUser);
    const baiHoc = useSelector((state) => state.baiHoc);
    const [isOpenModal, setIsOpenModal] = useState(false);

    let questionFail = [];

    let countCorrected = 0;
    let total = 0;
    for (let index = 0; index < baiHoc.listQuestion.length; index++) {
        total++;
        const question = baiHoc.listQuestion[index];
        question.isCorrect && countCorrected++;
        !question.isCorrect && questionFail.push(question.id);
    }

    let diemQuizz = countCorrected / total;

    const handleConfirmRedoQuizz = () => {
        httpServ.getLamLaiTracNghiem(userInfor.id, currentLesson.id).then((res) => {
            httpServ
                .getTrangThaiQuizz(userInfor?.id, currentLesson.id)
                .then((res) => {
                    dispatch(setTrangThaiQuizz(res.data.content));
                    dispatch(setIsRedoQuizz(true));
                    dispatch(setIsTotalRedoQuizz(totalRedoQuizz + 1));
                })
                .catch((err) => {
                });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    const openViewAnswers = () => {
        dispatch(setTrangThaiQuizz({ trangThai: 3 }));
    }

    return (
        <div className="w-full h-full ContentQuizz flex flex-col items-center justify-center bg-dark-theme bg-opacity-20">
            <Modal
                title="Làm lại bài trắc nghiệm "
                className="rounded-xl p-0 overflow-hidden felx flex-col items-center dialogItem"
                visible={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false)
                }}
                footer={null}
            > <div className="w-full items-center justify-center  space-y-3 px-5">
                    <p className="text-base">Lưu ý trong trường hợp làm sai quá 3 lần bạn sẽ phải chờ 30 phút để tiếp tục làm lại</p>
                    <div className="flex space-x-3 justify-end">
                        <button
                            onClick={() => {
                                handleConfirmRedoQuizz()
                            }}
                            className="rounded-lg px-3 btn-theme text-white py-1 shadow-lg hover:shadow-lg transition duration-150">Đồng ý</button>
                        <button
                            onClick={() => {
                                setIsOpenModal(false)
                            }}
                            className="rounded-lg px-3 card_theme text-btn-theme shadow-design_code py-1 ">Huỷ</button>
                    </div>
                </div>
            </Modal>

            <div className="w-2/3 h-1/2 ContentQuizzWrrapper flex flex-col bg-white card_theme border-none items-center justify-center space-y-7">
                <div className="space-y-7 text-center">
                    <p className="font-medium text-xl">
                        <i className="fa  fa-check mr-2 text-green-theme text-xl"></i>{" "}
                        {diemQuizz ? Math.floor(diemQuizz * 100) : 0}/100 điểm
                    </p>
                    <p className="text-base">Bạn cần đạt 100 điểm để qua bài kiểm tra!</p>
                    <p className="text-base">Lựa chọn <b>LÀM LẠI</b> để cải thiện điểm!</p>
                </div>
                <div className="flex items-center space-x-5">
                    <button
                        onClick={() => openViewAnswers()}
                        className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
                    >
                        <span> Xem kết quả</span> <i className="fa fa-eye"></i>
                    </button>
                    <button
                        onClick={() => {
                            setIsOpenModal(true)
                        }}
                        className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
                    >
                        <span> Làm lại</span> <i className="fa fa-redo-alt"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}