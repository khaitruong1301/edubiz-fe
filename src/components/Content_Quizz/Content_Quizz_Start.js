import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navigate_Footer_Pratices from "../Navigate_Footer_Pratices/Navigate_Footer_Pratices";
import { setListQuestion, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import { Portal } from "react-portal";
import { Modal } from "antd";
import { CloseOutlined } from '@ant-design/icons'
import _ from "lodash";
import SingleChooseQuestion from "../Pratices/SingleChooseQuestion";
import MultipleChooseQuestion from "../Pratices/MultipleChooseQuestion";
import TrueOrFalseQuestion from "../Pratices/TrueOrFalseQuestion";
import FillWordQuestion from "../Pratices/FillWordQuestion";
import SorttingQuestion from "../Pratices/SorttingQuestion";

let checkTime = null;
let time = 0;

export default function ContentQuizz_Start({ stateQuizz }) {

  let dispatch = useDispatch();

  const danhSachBaiDaHoc = useSelector((state) => state.khoaHoc.danhSachBaiDaHoc);
  let listQuestionState = useSelector((state) => state.baiHoc.listQuestion);
  let { currentLesson, isRedoQuizz } = useSelector((state) => state.baiHoc);
  let { khoaHocContent } = useSelector((state) => state.khoaHoc);
  let { testMode } = useSelector((state) => state.baiHoc);

  let [currentQuestionIndex, setCurrentQuestsionIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isDisableNextBtn, setIsDisableNextBtn] = useState(true);
  const [showTime, setShowTime] = useState(false);

  useEffect(() => {
    handleStopCheckTime();
    let indexCheck = danhSachBaiDaHoc.findIndex(item => item.baiHocId == currentLesson.id)
    if (!indexCheck) {
      setShowTime(false);
    }
    else {
      setShowTime(true);
      setIsOpenModal(true)
    }
  }, [currentLesson.id]);

  useEffect(() => {
    setAllQuestions(listQuestionState)
  }, [listQuestionState]);

  useEffect(() => {
    let listQuestionRaw = JSON.parse(currentLesson.noiDung);
    // let baseNumber = Math.floor(listQuestionRaw.length / 3)
    // let listQuestion = []
    // if (!isRedoQuizz) {
    //   listQuestion = listQuestionRaw.slice(baseNumber * 2).concat(listQuestionRaw.slice(0, baseNumber))
    // } else {
    //   listQuestion = listQuestionRaw.slice(0, baseNumber * 2)
    // }

    // dispatch(setListQuestion(_.shuffle(listQuestion)));
    dispatch(setListQuestion(listQuestionRaw));
    setCurrentQuestsionIndex(0);
  }, [stateQuizz?.trangThai, currentLesson.id, isRedoQuizz]);

  // ===============================================
  const handleUserAnswers = (items, userAnswers, index) => {
    
    const newAllQuestion = allQuestions.map((question, i) => {
      if (i != index) return question;
      return {
        ...question,
        userAnswers: userAnswers,
        items: items,
        isCorrect: checkCorrectAnswer(question.answers, userAnswers)
      }
    });
    dispatch(setListQuestion(newAllQuestion));
    setIsDisableNextBtn(userAnswers.length == 0);
  }
  // ===================================================
  const checkCorrectAnswer = (answers, userAnswers) => {
    let correct = true;
    // Số đáp an ko bằng nhau => đáp án của user sai
    if (answers.length != userAnswers.length) {
      correct = false;
    }
    else {
      for (let i = 0; i < answers.length; i++) {
        // check từng đáp án
        if (answers[i].toLocaleLowerCase().trim() != userAnswers[i].toLocaleLowerCase().trim()) {
          correct = false;
          break;
        }
      }
    }

    return correct;
  }
  // ===============================================
  const handleStart = () => {
    setIsOpenModal(false);
    handleStopCheckTime();

    checkTime = setInterval(function () {
      time++;
      let distance = currentLesson.thoiLuong * 60 - time;
      let seconds = Math.floor(distance % 60);
      let minute = Math.floor((distance % (60 * 1000)) / 60);
      const minuteEle = document.getElementById('minute');
      if (minuteEle != null && minute == 0)
        minuteEle.innerText = `${seconds} giây`;
      else if (minuteEle != null)
        minuteEle.innerText = `${minute} phút ${seconds} giây`;

      if (distance <= 0) {
        clearInterval(checkTime);
        checkTime = null;
        time = 0;
        dispatch(setTrangThaiQuizz({ trangThai: 4 }))
      }
    }, 1000);
  }

  const handleStopCheckTime = () => {
    if (checkTime == null) return;
    clearInterval(checkTime);
    checkTime = null;
    time = 0;
  }
  // ===============================================
  let handleClickNextQuestion = () => {
    setCurrentQuestsionIndex(currentQuestionIndex + 1);
  };

  // ================================================
  let arrRenderQuestion = [];

  arrRenderQuestion = allQuestions.map((question, index) => {
    switch (question.type) {
      case "SINGLE":
        return (
          <SingleChooseQuestion
            itemIndex={index}
            question={question}
            handleUserAnswers={handleUserAnswers}
          />
        );
      case "MULTIPLE":
        return (
          <MultipleChooseQuestion
            itemIndex={index}
            question={question}
            handleUserAnswers={handleUserAnswers}
          />
        );
      case "FILLWORD":
        return (
          <FillWordQuestion
            itemIndex={index}
            question={question}
            handleUserAnswers={handleUserAnswers}
          />
        );
      case "TRUEORFALSE":
        return (
          <TrueOrFalseQuestion
            itemIndex={index}
            question={question}
            handleUserAnswers={handleUserAnswers}
          />
        );
      case "SORTING":
        return (
          <SorttingQuestion
            itemIndex={index}
            question={question}
            handleUserAnswers={handleUserAnswers}
          />
        );

      default:
        break;
    }
  });

  let containerTracNhiem = document.getElementById("containerTracNhiem");
  setTimeout(() => {
    if (containerTracNhiem) {
      let widthContainer = containerTracNhiem.clientWidth;
      let navigateFooter = document.getElementById("footerTracNghiem");
      if (navigateFooter) {
        navigateFooter.style.width = `${widthContainer}px`;
        var rect = containerTracNhiem.getBoundingClientRect();
        navigateFooter.style.marginLeft = `${rect.left}px`;
      }
    }
  }, 300);

  return (
    <div
      id="containerTracNhiem"
      className="w-full  flex-grow h-full flex flex-col "
    >
      <Modal
        title="Quy định làm bài"
        className="rounded-xl p-0 overflow-hidden felx flex-col items-center dialogItem"
        visible={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false)
        }}
        footer={null}
      > <div className="w-full items-center justify-center  space-y-3 px-5">
          <p className="text-base">Bạn cần trả lời đúng ít nhất 70% số lượng câu hỏi để vượt qua bài kiểm tra này </p>
          <p className="text-base">Lưu ý: trong trường hợp làm sai bạn sẽ được làm lại 3 lần nếu vẫn không vượt qua phải chờ 30 phút để tiếp tục làm lại</p>
          <div className="flex space-x-3 justify-end">

            <button
              onClick={(handleStart)}
              className="rounded-lg px-3 btn-theme text-white py-1 shadow-lg hover:shadow-lg transition duration-150">Bắt đầu</button>

          </div>
        </div>
      </Modal>

      {testMode ? (
        <div className="pt-3 pl-2 text-gray-500 space-y-1">
          <p>
            Trong trường hợp lỗi, anh/chị hãy báo lại bằng thông tin id của khóa
            học và lộ trình nha
          </p>
          <p>
            Bài học id : {currentLesson.id}. Khoá học id:{khoaHocContent.id}
          </p>
        </div>
      ) : (
        ""
      )}

      <div className="w-full h-full  flex-grow flex flex-col  p-3 relative">
        <div className="w-full question-wrapper">
          <div className="quizz-close" style={{display: 'none'}}>
            <div><CloseOutlined /></div>
          </div>

          <div className="question-time" style={{ display: showTime ? 'flex' : 'none' }}>
            <div>THỜI GIAN LÀM BÀI</div>
            <span id="minute"></span>
          </div>
          {
            !isOpenModal && arrRenderQuestion[currentQuestionIndex]
          }
        </div>
        <div className="h-22 w-full"></div>
      </div>
      <Portal>
        <div
          id="footerTracNghiem"
          className="h-max-content  FooterTracNghiem flex-shrink-0  bg-transparent fixed bottom-3 card_theme  border-none shadow-lg hover:shadow-xl transition duration-200 cursor-pointer left-0  border-0"
        >
          <Navigate_Footer_Pratices
            current={currentQuestionIndex + 1}
            total={allQuestions.length}
            handleClickNextQuestion={handleClickNextQuestion}
            isDisableBtn={isDisableNextBtn}
            handleStopCheckTime={handleStopCheckTime}
          />
        </div>
      </Portal>
    </div>
  );
}
