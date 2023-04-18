import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Answer_Practices_ChooseAnswer from "../PraticesAnswer/Answer_Practices_ChooseAnser";
import Answer_Practices_ChooseAnswerToFill from "../PraticesAnswer/Answer_Praticees_ChooseAnserToFill";
import Answer_Practices_HTML_CSS from "../PraticesAnswer/Answer_Practices_HTML_CSS";
import Answer_Practices_FillCodeToInput from "../PraticesAnswer/Answer_Practices_FillCodeToInput";
import Answer_Practices_MultipleChoice from "../PraticesAnswer/Answer_Practices_MultipleChoice";
import { setListQuestion } from "../../redux/reducer/baiHocContentReducer";
import { initalAnwerUser } from "../../utils/ConvertLesson";
import { Portal } from "react-portal";
import Navigate_Footer_ViewAnsers from "../Navigate_Footer_ViewAnsers/Navigate_Footer_ViewAnsers";

export default function ContentQuizz_ViewAnsers({ stateQuizz }) {
  let [currentQuestionIndex, setCurrentQuestsionIndex] = useState(0);
  let { currentLesson, isRedoQuizz } = useSelector((state) => state.baiHoc);
  let allQuestions = useSelector((state) => state.baiHoc.listQuestion);
  let dispatch = useDispatch();
  useEffect(() => {
    let listQuestionRaw = JSON.parse(currentLesson.noiDung).map((item, index) => {
      let userAnser = initalAnwerUser(item);
      return {
        id: index,
        noiDung: item,
        isCorrect: false,
        userAnsers: [],
      };
    });
    let baseNumber = Math.floor(listQuestionRaw.length / 3)
    let listQuestion = []
    if (!isRedoQuizz) {
      listQuestion = listQuestionRaw.slice(baseNumber * 2).concat(listQuestionRaw.slice(0, baseNumber))
    } else {
      listQuestion = listQuestionRaw.slice(0, baseNumber * 2)
    }
    dispatch(setListQuestion(listQuestion));
    setCurrentQuestsionIndex(0);
  }, [stateQuizz?.trangThai, currentLesson.id]);


  let arrRenderQuestion = [];
  arrRenderQuestion = allQuestions.map((question, index) => {
    let keyIndex = index + currentLesson?.id;
    switch (question?.noiDung.maLoaiBaiTap) {
      case "SINGLE":
        return (
          <Answer_Practices_ChooseAnswer
            key={keyIndex}
            question={question}
          />
        );
      case "multiple_choice":
        return (
          <Answer_Practices_MultipleChoice
            key={keyIndex}
            question={question}
          />
        );
      case "fill_inblank_css":
        return (
          <Answer_Practices_HTML_CSS
            key={keyIndex}
            question={question}
          />
        );
      case "fill_inblank":
        return (
          <Answer_Practices_ChooseAnswerToFill
            key={keyIndex}
            question={question}
          />
        );
      case "fill_input":
        return (
          <Answer_Practices_FillCodeToInput
            key={keyIndex}
            question={allQuestions[currentQuestionIndex]}
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

  let handleChangeCurrentQuestion = (value) => {
    setCurrentQuestsionIndex(currentQuestionIndex + value);
  };
  return (
    <div
      id="containerTracNhiem"
      className="w-full  flex-grow h-full flex flex-col "
    >
      <div className="w-full h-full  flex-grow flex flex-col  relative p-2">
        <div className="w-full  ">
          {arrRenderQuestion[currentQuestionIndex]}
        </div>

        <div className="h-22 w-full"></div>
      </div>
      <Portal>
        <div
          id="footerTracNghiem"
          className="h-max-content   flex-shrink-0  bg-transparent fixed bottom-3 card_theme  border-none shadow-lg hover:shadow-xl transition duration-200 cursor-pointer left-0  border-0"
        >
          <Navigate_Footer_ViewAnsers
            current={currentQuestionIndex + 1}
            total={allQuestions.length}
            handleChangeCurrentQuestion={handleChangeCurrentQuestion}

          />
        </div>
      </Portal>
    </div>
  );
}
