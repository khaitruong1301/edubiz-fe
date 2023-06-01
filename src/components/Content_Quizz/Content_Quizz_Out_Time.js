import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson, setIsRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";

export default function Content_Quizz_Out_Time({ stateQuizz }) {

    const dispatch = useDispatch();
    const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
    const { userInfor } = useSelector((state) => state.authUser);
    const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
    const { khoaHocContent } = useSelector((state) => state.khoaHoc);
    const baiHoc = useSelector((state) => state.baiHoc);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [loading, setloading] = useState(false);

    let questionFail = [];

    let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
        return item.id === currentLesson.id;
    });

    let countCorrected = 0;
    let total = 0;
    for (let index = 0; index < baiHoc.listQuestion.length; index++) {
        total++;
        const question = baiHoc.listQuestion[index];
        question.isCorrect && countCorrected++;
        !question.isCorrect && questionFail.push(question.id);
    }

    let diemQuizz = countCorrected / total;

    const handleNopBai = () => {
        let inforQuizz = {
            loTrinhId: khoaHocContent.maLoTrinh,
            khoaHocId: khoaHocContent.id,
            baiHocId: baiHoc.currentLesson.id,
            nguoiDungId: userInfor?.id,
            soCauDung: countCorrected,
        };
        if (diemQuizz < 0.5) {
            inforQuizz.diem = 0;
            setloading(true);
            httpServ
              .postKetQuaQuizz(inforQuizz)
              .then((res) => {
                setloading(false);
                dispatch(setTrangThaiQuizz(res.data.content));
              })
              .catch((err) => {
                setloading(false);
              });
          }
          else {
            inforQuizz.diem = Math.floor(diemQuizz * 100);
            setloading(true);
            httpServ
              .postKetQuaQuizz(inforQuizz)
              .then((res) => {
                setloading(false);
                dispatch(setTrangThaiQuizz(res.data.content));
              })
              .catch((err) => {
                setloading(false);
      
                console.log("no", err);
              });
      
            httpServ
              .postCompletedBaiHoc({
                loTrinhId: khoaHocContent.maLoTrinh,
                khoaHocId: khoaHocContent.id,
                baiHocId: baiHoc.currentLesson.id,
                nguoiDungId: userInfor?.id,
              })
              .then((res) => {
                dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
              })
              .catch((err) => {
                console.log(err);
              });
          }
    };


    const handleConfirmRedoQuizz = () => {
        httpServ.getLamLaiTracNghiem(userInfor.id, currentLesson.id).then((res) => {
            httpServ
                .getTrangThaiQuizz(userInfor?.id, currentLesson.id)
                .then((res) => {
                    dispatch(setTrangThaiQuizz(res.data.content));
                    dispatch(setIsRedoQuizz(true))
                })
                .catch((err) => {
                });
        })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="w-full h-full  flex flex-col items-center justify-center bg-dark-theme bg-opacity-20">
            <Modal
                title="Làm lại bài trắc nghiệm "
                className="rounded-xl p-0 overflow-hidden felx flex-col items-center dialogItem"
                visible={isOpenModal}
                onCancel={() => {
                    setIsOpenModal(false)
                }}
                footer={null}
            > <div className="w-full items-center justify-center  space-y-3 px-5">
                    <p className="text-base">Nếu bạn chọn làm lại thì điểm số cũ sẽ bị reset hoặc mất. </p>
                    <p className="text-base">Lưu ý trong trường hợp làm sai bạn sẽ phải chờ 3 giờ để tiếp tục làm lại</p>

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

            <div className="w-2/3 h-1/2  flex flex-col bg-white card_theme border-none items-center justify-center space-y-7">
                <div className="space-y-7 text-center">
                    <p className="font-medium text-xl">
                        <i className="fa  fa-check mr-2 text-green-theme text-xl"></i>{" "}
                        {diemQuizz ? Math.floor(diemQuizz * 100) : 0} điểm
                    </p>
                    <p className="text-base">Bạn đã hết thời gian làm bài</p>
                    <p className="text-base">Lựa chọn <b>NỘP BÀI</b> để học bài mới hoặc chọn <b>LÀM LẠI</b> để cải thiện điểm</p>
                </div>
                <div className="flex items-center space-x-5">
                    <button
                        onClick={() => {
                            setIsOpenModal(true)
                        }}
                        className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
                    >
                        <span> Làm lại</span> <i className="fa fa-redo-alt"></i>
                    </button>
                    <button
                        onClick={() => {
                            handleNopBai();
                        }}
                        className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"
                    >
                        Nộp bài
                    </button>
                </div>
            </div>
        </div>
    );
}
