import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentLesson, setIsRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";

export default function Content_Quizz_Success({ stateQuizz }) {

  const dispatch = useDispatch();
  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
  const { userInfor } = useSelector((state) => state.authUser);
  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
  const [isOpenModal, setIsOpenModal] = useState(false)
  let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
    return item.id === currentLesson.id;
  });


  const handleNextLesson = () => {

    let nextLessonIndex = currentLessonIndex + 1;
    dispatch(setCurrentLesson(tatCaBaiHoc[nextLessonIndex]));
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
    <div className="w-full h-full ContentQuizz  flex flex-col items-center justify-center bg-dark-theme bg-opacity-20">
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
          <p className="text-base">Lưu ý trong trường hợp làm sai bạn sẽ phải chờ 30 phút để tiếp tục làm lại</p>

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
            {stateQuizz?.diem} điểm
          </p>
          <span>Bạn đã hoàn thành bài tập này</span>
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
          {/* <button
            onClick={() => {
              dispatch(setTrangThaiQuizz({ trangThai: 3 }))
            }}
            className=" cursor-pointer  btn-theme p-3 shadow-xl font-medium text-base text-white border-none rounded-lg flex space-x-1 items-center  "
          >
            Xem đáp án
          </button> */}
          {currentLessonIndex + 1 !== tatCaBaiHoc.length && <button
            onClick={() => {
              handleNextLesson();
            }}
            className=" cursor-pointer card_theme p-3 font-medium text-base text-color-blue-white border-none shadow-design_code space-x-2"

          >
            Bài tiếp theo
          </button>}
        </div>
      </div>
    </div>
  );
}
