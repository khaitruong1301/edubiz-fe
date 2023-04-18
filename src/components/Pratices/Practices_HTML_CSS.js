import React, { useEffect, useState } from "react";
import { Button } from "antd";

import ReactHtmlParser from "react-html-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
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
export default function Practices_HTML_CSS({
  question,
  handle_CheckFinll_IN_Blank_CSS,
}) {
  let cauHoi = question.noiDung;
  const noiDung = entities.decodeHTML(cauHoi.inPut);
  const noiDungCss = entities.decodeHTML(cauHoi.inputCss);

  const [anser1, setstateAnser1] = useState("?");
  const [answerArr, setAnswerArr] = useState(new Array(cauHoi.dapAn.length));

  const [isRenderChooseBtn, SetIsRenderChooseBtn] = useState(false);
  const [activeIndex, SetActiveIndex] = useState(0);

  const totalChossenBtn = document.querySelectorAll(".practice_choose_ansewer");
  const totalChossenBtnLength = totalChossenBtn.length;
  const renderDataConvert = () => {
    const editor = document.querySelector("#editor ");
    if (editor.innerText.includes("♥")) {
      let find = "♥";
      let re = new RegExp(find, "g");

      // let str = str.replace(re, "");
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
  }, []);
  useEffect(() => {
    setAnswerArr(new Array(cauHoi.dapAn.length));
    resetTextMonitor();
  }, [question.id]);
  useEffect(() => {
    setActiveCss(totalChossenBtn, activeIndex);
    handle_CheckFinll_IN_Blank_CSS(question.id, answerArr);
  }, [activeIndex, answerArr]);
  useEffect(() => {
    SetActiveIndex(0);
    setAnswerArr(new Array(cauHoi.dapAn.length));
  }, [question.id]);
  const nextBtnCss = !answerArr[0]
    ? " text-gray-600 bg-gray-400 cursor-not-allowed"
    : "  btn-theme text-white ";
  return (
    <div className="w-full   flex flex-grow flex-col box-border p-3 space-y-5  ">
      <p className="practice_tieuDe flex-shrink-0  text-lg text-color-title font-medium  ">
        {cauHoi.tieuDe}
      </p>
      <div className="w-full flex-grow items-start h-full    flex ">
        <div className="w-1/2 justify-between flex-shrink-0  ">
          <div
            id="editor"
            className="w-full rounded-xl  overflow-hidden space-y-5 text-blue-800"
          >
            <p className="practice_tieuDe  text-lg text-color-title font-medium ">
              {/* {data.tieuDe} */}
              HTML
            </p>
            <SyntaxHighlighter className="p-5" language="html" style={dracula}>
              {noiDung}
            </SyntaxHighlighter>
            <p className="practice_tieuDe  text-lg text-color-title font-medium ">
              {/* {data.tieuDe} */}
              CSS
            </p>
            <SyntaxHighlighter className="p-5" language="css" style={dracula}>
              {noiDungCss}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className="  h-full w-1/2 space-y-5 pl-5">
          <div className="h-max-content w-full  space-y-5">
            <p className="practice_tieuDe  text-lg text-color-title font-medium ">
              Kết quả:
            </p>
            <div className="p-5  bg-white rounded-lg shadow-md  w-full h-max-content">
              <div className="practice_output ">
                {ReactHtmlParser(cauHoi.outPut)}
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <div className="h-1/2 space-y-5 w-full">
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
              <div
                className="
                p-3  bg-white rounded-lg shadow-md w-full flex flex-wrap  justify-between  
                "
              >
                {cauHoi.cauTraLoi.map((item) => {
                  return (
                    <button
                      className="px-4 my-2 mx-1 flex-shrink-0  text-base h-10 font-medium tracking-wide text-white  transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700 "
                      onClick={() => {
                        // setstateAnser1(item.noiDung);

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
                <button className="flex-grow"></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
