import React, { useEffect } from "react";

import ReactHtmlParser from "react-html-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
const entities = require("entities");


export default function Answer_Practices_HTML_CSS({
  question,
}) {
  let cauHoi = question.noiDung;
  const noiDung = entities.decodeHTML(cauHoi.inPut);
  const noiDungCss = entities.decodeHTML(cauHoi.inputCss);



  const renderDataConvert = () => {
    const editor = document.querySelector("#editor ");
    if (editor.innerText.includes("♥")) {

      editor.innerHTML = editor.innerHTML.replaceAll(
        "♥",
        `<span class='practice_choose_ansewer'>a</span>`
      );
    }
    const answerDivs = document.querySelectorAll(".practice_choose_ansewer");
    cauHoi = question.noiDung
    let listCauTraLoi = cauHoi.cauTraLoi.map((item) => {
      let newItem = { ...item }
      newItem.ma = newItem.ma * 1
      return newItem
    })
    let listDapAn = cauHoi.dapAn.map((item) => {
      return item * 1
    })
    let arrQuestion = listCauTraLoi.filter((item) => { return listDapAn.includes(item.ma) })
    if (answerDivs) {
      for (let index = 0; index < answerDivs.length; index++) {
        const element = answerDivs[index];
        element.innerHTML = arrQuestion[index].noiDung
      }
    }
  };

  useEffect(() => {
    renderDataConvert();
  }, []);




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
