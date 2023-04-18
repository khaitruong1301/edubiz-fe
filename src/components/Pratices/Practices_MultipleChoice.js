import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactHtmlParser from "react-html-parser";

import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
const entities = require("entities");

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Practices_MultipleChoice({
  question,
  handle_CheckMultipleChoice,
}) {
  let cauhoi = question.noiDung;

  useEffect(() => {
    setActiveBtnArr([]);
  }, [question?.id]);
  const [activeBtnArr, setActiveBtnArr] = useState([]);

  const handlerActiveBtn = (idBtn) => {
    let index = activeBtnArr.findIndex((index) => {
      return index === idBtn;
    });
    if (index !== -1) {
      activeBtnArr.splice(index, 1);
    } else {
      activeBtnArr.push(idBtn);
    }
  };
  useEffect(() => {

    handle_CheckMultipleChoice(question.id, activeBtnArr);
  }, [activeBtnArr]);

  const nextBtnCss =
    activeBtnArr.length == 0
      ? " text-gray-600 bg-gray-400 cursor-not-allowed"
      : "  btn-theme ";
  return (
    <div
      onCopy={(e) => {
        e.preventDefault();
        return false;
      }}
      className="w-full flex-grow flex flex-col  "
    >
      <div className="relative w-full h-full p-5 flex-grow justify-center flex-col space-y-5 ">
        <div className="w-full mx-auto  flex flex-col space-y-5 ">
          <div className="text-xl text-color-title font-medium">
            {question.noiDung.tieuDe}
          </div>
          <div className="w-full rounded-xl  overflow-hidden">
            <SyntaxHighlighter
              className="p-10"
              language="javascript"
              style={dracula}
            >
              {entities.decodeHTML(question.noiDung.inPut)}
            </SyntaxHighlighter>
          </div>
          <p className="text-lg text-color-title 	">
            <pre>{ReactHtmlParser(cauhoi.outPut)}</pre>
          </p>
          <div className="w-full h-max-content grid auto-rows-auto grid-auto-rows gap-5 grid-cols-2">
            {cauhoi.cauTraLoi.map((item, index) => {
              let indexBtn = activeBtnArr.findIndex((id) => {
                return id === item.ma;
              });
              let activeCss = "";
              if (indexBtn !== -1) {
                activeCss =
                  "bg-blue-600 border-blue-600 border-white text-white";
              } else {
                activeCss = " ";
              }

              return (
                <div
                  className={
                    "w-full cursor-pointer  flex  shadow-lg  items-center space-x-5  rounded-lg transition duration-200 card_theme_item text-color-title p-5  py-2  hover:shadow-xl"
                  }
                  onClick={() => {

                    let index = activeBtnArr.findIndex((id) => {
                      return id === item.ma;
                    });
                    if (index !== -1) {
                      let temp = [...activeBtnArr];
                      temp.splice(index, 1);
                      setActiveBtnArr(temp);
                    } else {
                      setActiveBtnArr((activeBtnArr) => [
                        ...activeBtnArr,
                        item.ma,
                      ]);
                    }

                  }}
                >
                  <span
                    className={
                      "h-9 rounded-lg border-2 flex-shrink-0  border-dark w-9 text-center font-bold leading-8 " +
                      activeCss
                    }
                  >
                    {alphabet[index]}
                  </span>
                  <p className="text-sm text-color-title">{item.noiDung}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
