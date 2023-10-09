import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Practices_ChooseAnswer from "../Pratices/Practices_ChooseAnser";
import Practices_ChooseAnswerToFill from "../Pratices/Praticees_ChooseAnserToFill";
import Practices_HTML_CSS from "../Pratices/Practices_HTML_CSS";
import Practices_FillCodeToInput from "../Pratices/Practices_FillCodeToInput";
import Practices_MultipleChoice from "../Pratices/Practices_MultipleChoice";
import { initalAnwerUser } from "../../utils/ConvertLesson";
import { Portal } from "react-portal";
import { Modal } from "antd";
import _ from "lodash";
import httpServ from "../../services/http.service";
import Navigate_Footer_Pratices_DaoVao from "./Navigate_Footer_Pratices_DaoVao";
import { setListCauHoiDauVao } from "../../redux/reducer/signUpReducer";

export default function Content_Quizz_TestDauVao() {
  let [currentQuestionIndex, setCurrentQuestsionIndex] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(true);
  let { currentLesson, isRedoQuizz } = useSelector((state) => state.baiHoc);
  let allQuestions = useSelector((state) => state.signUp?.listCauHoi);

  let dispatch = useDispatch();
  useEffect(() => {
    httpServ
      .getDanhSachCauHoiTestDauVao()
      .then((res) => {
        let listQuestionRaw = JSON.parse(res.data.content.giaTri).map(
          (item, index) => {
            return {
              id: index,
              noiDung: item,
              isCorrect: false,
              userAnsers: [],
            };
          }
        );

        // Create subarrays with each capDo value
        const capDo1Array = listQuestionRaw.filter(
          (item) => item.noiDung.capDo == "1"
        );
        const capDo2Array = listQuestionRaw.filter(
          (item) => item.noiDung.capDo == "2"
        );
        const capDo3Array = listQuestionRaw.filter(
          (item) => item.noiDung.capDo == "3"
        );

        // Randomly select 7 items from capDo1Array
        const selectedCapDo1 = [];
        while (selectedCapDo1.length < 7 && capDo1Array.length > 0) {
          const index = Math.floor(Math.random() * capDo1Array.length);
          selectedCapDo1.push(capDo1Array.splice(index, 1)[0]);
        }

        // Randomly select 5 items from capDo2Array
        const selectedCapDo2 = [];
        while (selectedCapDo2.length < 5 && capDo2Array.length > 0) {
          const index = Math.floor(Math.random() * capDo2Array.length);
          selectedCapDo2.push(capDo2Array.splice(index, 1)[0]);
        }

        // Randomly select 3 items from capDo3Array
        const selectedCapDo3 = [];
        while (selectedCapDo3.length < 3 && capDo3Array.length > 0) {
          const index = Math.floor(Math.random() * capDo3Array.length);
          selectedCapDo3.push(capDo3Array.splice(index, 1)[0]);
        }

        // Combine the selected items into a single array
        const selectedItems = [
          ...selectedCapDo1,
          ...selectedCapDo2,
          ...selectedCapDo3,
        ];

        let baseNumber = Math.floor(listQuestionRaw.length / 3);
        let listQuestion = [];
        if (!isRedoQuizz) {
          listQuestion = listQuestionRaw
            .slice(baseNumber * 2)
            .concat(listQuestionRaw.slice(0, baseNumber));
        } else {
          listQuestion = listQuestionRaw.slice(0, baseNumber * 2);
        }
        dispatch(setListCauHoiDauVao(_.shuffle(selectedItems)));
        setCurrentQuestsionIndex(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let handleClickNextQuestion = () => {
    setCurrentQuestsionIndex(currentQuestionIndex + 1);
  };

  let handle_CheckSingleChoice = (id, value, userAnsers) => {
    let currentQuestionIndex = allQuestions.findIndex((item) => {
      return item.id === id;
    });
    let newCurrentQuestion = { ...allQuestions[currentQuestionIndex] };
    if (value) {
      newCurrentQuestion.isCorrect = true;
    } else {
      newCurrentQuestion.isCorrect = false;
    }

    newCurrentQuestion.userAnsers = userAnsers;
    let newAllQuestion = [...allQuestions];

    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;

    dispatch(setListCauHoiDauVao(newAllQuestion));
  };
  let handle_CheckMultipleChoice = (id, userAnsers) => {
    let currentQuestionIndex = allQuestions.findIndex((item) => {
      return item.id === id;
    });
    let newCurrentQuestion = { ...allQuestions[currentQuestionIndex] };
    let arrDapAn = [...newCurrentQuestion.noiDung.dapAn];
    if (arrDapAn.sort().toString() == userAnsers.sort().toString()) {
      newCurrentQuestion.isCorrect = true;
    } else {
      newCurrentQuestion.isCorrect = false;
    }
    let newAllQuestion = [...allQuestions];
    newCurrentQuestion.userAnsers = userAnsers;

    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;

    dispatch(setListCauHoiDauVao(newAllQuestion));
  };
  let handle_CheckFinll_IN_Blank = (id, userAnsers) => {
    let currentQuestionIndex = allQuestions.findIndex((item) => {
      return item.id === id;
    });
    let newCurrentQuestion = { ...allQuestions[currentQuestionIndex] };
    if (
      newCurrentQuestion.noiDung.dapAn.length === userAnsers.length &&
      newCurrentQuestion.noiDung.dapAn.every(function (value, index) {
        return value == userAnsers[index];
      })
    ) {
      newCurrentQuestion.isCorrect = true;
    } else {
      newCurrentQuestion.isCorrect = false;
    }
    let newAllQuestion = [...allQuestions];

    newCurrentQuestion.userAnsers = userAnsers;

    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;

    dispatch(setListCauHoiDauVao(newAllQuestion));
  };
  let handle_CheckFillInput = (id, userAnsers = []) => {
    let currentQuestionIndex = allQuestions.findIndex((item) => {
      return item.id === id;
    });
    let newCurrentQuestion = { ...allQuestions[currentQuestionIndex] };

    let arrDapAn = [...newCurrentQuestion.noiDung.dapAn];
    if (arrDapAn.sort().toString() == userAnsers.sort().toString()) {
      newCurrentQuestion.isCorrect = true;
    } else {
      newCurrentQuestion.isCorrect = false;
    }

    let newAllQuestion = [...allQuestions];

    newCurrentQuestion.userAnsers = userAnsers;

    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;
    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;

    dispatch(setListCauHoiDauVao(newAllQuestion));
  };
  let handle_CheckFinll_IN_Blank_CSS = (id, userAnsers) => {
    let currentQuestionIndex = allQuestions.findIndex((item) => {
      return item.id === id;
    });
    let newCurrentQuestion = { ...allQuestions[currentQuestionIndex] };
    if (
      newCurrentQuestion.noiDung.dapAn.length === userAnsers.length &&
      newCurrentQuestion.noiDung.dapAn.every(function (value, index) {
        return value == userAnsers[index];
      })
    ) {
      newCurrentQuestion.isCorrect = true;
    } else {
      newCurrentQuestion.isCorrect = false;
    }
    newCurrentQuestion.userAnsers = userAnsers;
    let newAllQuestion = [...allQuestions];
    newAllQuestion.userAnsers = userAnsers;

    newAllQuestion[currentQuestionIndex] = newCurrentQuestion;

    dispatch(setListCauHoiDauVao(newAllQuestion));
  };
  let arrRenderQuestion = [];
  arrRenderQuestion = allQuestions.map((question, index) => {
    let keyIndex = index + currentLesson?.id;
    switch (question?.noiDung.maLoaiBaiTap) {
      case "SINGLE":
        return (
          <Practices_ChooseAnswer
            key={keyIndex}
            question={question}
            handle_CheckSingleChoice={handle_CheckSingleChoice}
          />
        );
      case "multiple_choice":
        return (
          <Practices_MultipleChoice
            key={keyIndex}
            handle_CheckMultipleChoice={handle_CheckMultipleChoice}
            question={question}
          />
        );
      case "fill_inblank_css":
        return (
          <Practices_HTML_CSS
            key={keyIndex}
            handle_CheckFinll_IN_Blank_CSS={handle_CheckFinll_IN_Blank_CSS}
            question={question}
          />
        );
      case "fill_inblank":
        return (
          <Practices_ChooseAnswerToFill
            key={keyIndex}
            handle_CheckFinll_IN_Blank={handle_CheckFinll_IN_Blank}
            question={question}
          />
        );
      case "fill_input":
        return (
          <Practices_FillCodeToInput
            key={keyIndex}
            question={allQuestions[currentQuestionIndex]}
            handle_CheckFillInput={handle_CheckFillInput}
          />
        );

      default:
        break;
    }
  });

  let isDisableNextBtn;
  let typeQuestion = allQuestions[currentQuestionIndex]?.noiDung.maLoaiBaiTap;
  if (typeQuestion === "SINGLE" || typeQuestion === "multiple_choice") {
    isDisableNextBtn =
      allQuestions[currentQuestionIndex]?.userAnsers?.length === 0;
  }
  if (typeQuestion === "fill_inblank_css" || typeQuestion === "fill_inblank") {
    isDisableNextBtn = !allQuestions[currentQuestionIndex].userAnsers[0];
  }

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
  // console.log("setAllQuestions", allQuestions);
  // allQuestions.forEach((item, index) => {
  //   console.log("heere : ", index, item.isCorrect);
  // });
  // console.log("current index", currentQuestionIndex);
  // console.log(
  //   "current question",
  //   allQuestions[currentQuestionIndex]?.noiDung.dapAn
  // );
  // console.log(
  //   "current question",
  //   allQuestions[currentQuestionIndex].noiDung.dapAn
  // );
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
          setIsOpenModal(false);
        }}
        footer={null}
      >
        {" "}
        <div className="w-full items-center justify-center  space-y-3 px-5">
          <p className="text-base">
            Bạn cần trả lời đúng ít nhất 70% số lượng câu hỏi để vượt qua bài
            kiểm tra này{" "}
          </p>
          {/* <p className="text-base">
            Lưu ý: trong trường hợp làm sai bạn s`ẽ phải chờ 3 giờ để tiếp tục
            làm lại
          </p> */}
          <div className="flex space-x-3 justify-end">
            <button
              onClick={() => {
                setIsOpenModal(false);
              }}
              className="rounded-lg px-3 btn-theme text-white py-1 shadow-lg hover:shadow-lg transition duration-150"
            >
              Bắt đầu
            </button>
          </div>
        </div>
      </Modal>

      <div className="w-full h-full  flex-grow flex flex-col  p-3 relative">
        <div className="w-full  h-full">
          {/* {!isOpenModal && arrRenderQuestion[currentQuestionIndex]} */}
          {arrRenderQuestion[currentQuestionIndex]}
        </div>
        <div className="h-22 w-full"></div>
      </div>
      <Portal>
        <div
          id="footerTracNghiem"
          className="h-max-content   flex-shrink-0  bg-transparent fixed bottom-3 card_theme  border-none shadow-lg hover:shadow-xl transition duration-200 cursor-pointer left-0  border-0"
        >
          <Navigate_Footer_Pratices_DaoVao
            current={currentQuestionIndex + 1}
            handleClickNextQuestion={handleClickNextQuestion}
            isDisableBtn={isDisableNextBtn}
          />
        </div>
      </Portal>
    </div>
  );
}

// live coding
