import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Portal } from "react-portal";
import _ from "lodash";
import Footer_QuizzWrite from "./Footer_QuizzWrite";
import MuiEditor from "../../mobile-template/common/editor/MuiEditor";

export default function Content_QuizzWrite({ currentLesson }) {

  let dispatch = useDispatch();

  let [currentQuestionIndex, setCurrentQuestsionIndex] = useState(0);
  const [allQuestions, setAllQuestions] = useState([]);
  const [isDisableNextBtn, setIsDisableNextBtn] = useState(true);

  useEffect(() => {
    setAllQuestions(JSON.parse(currentLesson.noiDung));
    setIsDisableNextBtn(true);
  }, [currentLesson]);

  // ===============================================
  let handleClickNextQuestion = () => {
    setCurrentQuestsionIndex(currentQuestionIndex + 1);
    setIsDisableNextBtn(true);
  };

  // ===============================================
  const handleQuestionAnswers = (field, value) => {
    if (!value)
      setIsDisableNextBtn(true);
    else
      setIsDisableNextBtn(false);

    setAllQuestions(allQuestions.map((item, index) => {
      if (index == currentQuestionIndex)
        return { ...item, answers: value }
      return item;
    }));
  };

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

  const renderQuestion = () => {
    const question = allQuestions[currentQuestionIndex];
    if (!question) return null;
    return <div className="QuizzWrite">
      <div className="QuizzWrite_Title">{question.question}</div>
      <div className="QuizzWrite_Answers">
        <MuiEditor
          html={question.answers ?? ''}
          onChange={(handleQuestionAnswers)}
          placeholder="Nhập đáp án của bạn"
          tagName="div"
          field="dapAn"
        />
      </div>
    </div>
  }

  return (
    <div
      id="containerTracNhiem"
      className="w-full  flex-grow h-full flex flex-col "
    >
      <div className="w-full h-full  flex-grow flex flex-col  p-3 relative">
        <div className="w-full question-wrapper">
          {
            allQuestions ? renderQuestion() : null
          }
        </div>
        <div className="h-22 w-full"></div>
      </div>
      <Portal>
        <div
          id="footerTracNghiem"
          className="h-max-content  FooterTracNghiem flex-shrink-0  bg-transparent fixed bottom-3 card_theme  border-none shadow-lg hover:shadow-xl transition duration-200 cursor-pointer left-0  border-0"
        >
          <Footer_QuizzWrite
            current={currentQuestionIndex + 1}
            total={allQuestions.length}
            handleClickNextQuestion={handleClickNextQuestion}
            isDisableBtn={isDisableNextBtn}
            currentLesson={currentLesson}
            allQuestions={allQuestions}
          />
        </div>
      </Portal>
    </div>
  );
}

