import React, { useEffect, useState } from "react";
import ReactHtmlParser from "react-html-parser";
// import Highlight from "react-highlight";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "antd";
import HightLightLanguage from "./HightLightLanguage";

const entities = require("entities");

const setActiveCss = (arr, indexActive) => {
  let list = Array.from(arr);
  list.map((item, index) => {
    if (index !== indexActive) {
      item.classList.contains("practice_choose_ansewer--active");
      item.classList.remove("practice_choose_ansewer--active");
    } else {
      item.classList.add("practice_choose_ansewer--active");
    }
  });
};

export default function Practices_ChooseAnswerToFill({
  question,
  handle_CheckFinll_IN_Blank,
  key,
}) {
  let cauHoi = question.noiDung;
  const noiDung = entities.decodeHTML(cauHoi.inPut);
  const [anser1, setstateAnser1] = useState("?");
  const [anser2, setstateAnser2] = useState("?");
  const [answerArr, setAnswerArr] = useState(new Array(cauHoi.dapAn.length));

  const [isRenderChooseBtn, SetIsRenderChooseBtn] = useState(false);
  const [activeIndex, SetActiveIndex] = useState(0);
  const totalChossenBtn = document.querySelectorAll(".practice_choose_ansewer");
  const totalChossenBtnLength = totalChossenBtn.length;

  const renderDataConvert = () => {
    const editor = document.querySelector("#editor");
    // const editor = document.querySelector("#editor pre code");

    if (editor.innerText.includes("♥")) {
      editor.innerHTML = editor.innerHTML.replaceAll(
        "♥",
        `<span class='practice_choose_ansewer'>${anser1}</span>`
      );
      SetIsRenderChooseBtn(true);
    }
    const answerDiv = document.querySelector(".practice_choose_ansewer");
    if (answerDiv) {
      answerDiv.innerHTML = anser1;
      answerDiv.classList.add("practice_choose_ansewer--active");
    }
  };
  const resetTextMonitor = () => {
    let answerEls = document.querySelectorAll(".practice_choose_ansewer");
    for (let index = 0; index < answerEls.length; index++) {
      const element = answerEls[index];
      element.innerText = "?";
    }
  };
  useEffect(() => {
    renderDataConvert();
  }, [question.id]);

  useEffect(() => {
    setAnswerArr(new Array(cauHoi.dapAn.length));
    resetTextMonitor();
  }, [question.id]);

  useEffect(() => {
    setActiveCss(totalChossenBtn, activeIndex);
    handle_CheckFinll_IN_Blank(question.id, answerArr);
  }, [activeIndex, answerArr]);
  const nextBtnCss = !answerArr[0]
    ? " text-gray-600 bg-gray-400 cursor-not-allowed"
    : "  btn-theme text-white ";

  const renderNoiDung = () => {
    // console.log("redner");
    return (
      <SyntaxHighlighter
        className="p-10"
        language="javascript"
        style={dracula}
        wrapLines={true}
      // showLineNumbers={true}
      >
        {noiDung}
      </SyntaxHighlighter>
    );
  };
  return (
    <div key={key} className="w-full h-full flex flex-col flex-grow p-3">
      <div className="w-full mx-auto  flex flex-col space-y-5 relative">
        <p className="practice_tieuDe  text-lg text-color-title font-medium ">
          {cauHoi.tieuDe}
        </p>
        <div
          id="editor"
          className="w-full rounded-xl  overflow-hidden  text-blue-800"
        >
          {/* {renderNoiDung()} */}
          <HightLightLanguage noiDung={noiDung} />
        </div>
        <p className="practice_tieuDe  text-lg text-color-title font-medium ">
          Kết quả:
        </p>
        <div className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md  w-full ">
          <div className="practice_output space-y-5">
            {ReactHtmlParser(cauHoi.outPut)}
          </div>
        </div>
        <div className="w-full flex items-center justify-between space-x-5">
          <p className="practice_tieuDe  text-lg text-color-title font-medium ">
            Câu trả lời
          </p>
          <Button
            onClick={() => {
              SetActiveIndex(0);
              setAnswerArr(new Array(cauHoi.dapAn.length));
              resetTextMonitor();
            }}
            className={
              "  text-white font-bold px-4 space-x-2 rounded  flex items-center h-10 flex-shrink-0 border-none  focus:border-blue-theme hover:border-transparent hover:shadow-lg" +
              nextBtnCss
            }
          >
            <i className="fa fa-redo hover:rotate-90 transform duration-200"></i>{" "}
            Chọn lại
          </Button>
        </div>
        <div className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md  w-full ">
          <div className="practice_output space-x-5">
            {cauHoi.cauTraLoi.map((item) => {
              return (
                <button
                  className=" px-4 py-2 font-medium tracking-wide text-white  transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700"
                  onClick={() => {
                    totalChossenBtn[activeIndex].innerText = item.noiDung;
                    totalChossenBtn[activeIndex].classList.add(
                      "practice_choose_ansewer--active"
                    );
                    let tempAnserArr = [...answerArr];
                    tempAnserArr[activeIndex] = item.ma;
                    setAnswerArr(tempAnserArr);
                    if (activeIndex == totalChossenBtnLength - 1) {
                      SetActiveIndex(0);
                    } else {
                      SetActiveIndex(activeIndex + 1);
                    }
                  }}
                >
                  {item.noiDung}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
