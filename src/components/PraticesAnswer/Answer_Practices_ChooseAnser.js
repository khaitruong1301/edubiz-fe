import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SingleChoice_Answer } from "../../model/QuizzModel";
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

export default function Answer_Practices_ChooseAnswer({question}) {
  
  const noiDung = entities.decodeHTML(question.noiDung.inPut);

  const answers = question.noiDung.dapAn.map((item, index) => {
    return new SingleChoice_Answer(index, item.cauTraLoi, item.luaChon);
  });

  return (
    <div
      onCopy={(e) => {
        e.preventDefault();
        return false;
      }}
      className="w-full flex-grow flex flex-col  "
    >
      <div className="relative w-full h-full p-3 flex-grow justify-center flex-col space-y-5 ">
        <div className="text-xl text-color-title font-medium ">
          {question.noiDung?.tieuDe}
        </div>
        <div className="w-full rounded-xl  overflow-hidden">
          <SyntaxHighlighter
            className="p-10"
            language="javascript"
            style={dracula}
          >
            {noiDung}
          </SyntaxHighlighter>
        </div>
        <p className="text-lg text-color-content capitalize	">
          {question.noiDung.outPut}
        </p>
        <div className="w-full h-max-content grid auto-rows-auto grid-auto-rows gap-5 grid-cols-2">
          {answers.map((item, index) => {
            let activeCss = "";
            if (item.luaChon) {
              activeCss = "bg-blue-600 border-blue-600 border-white text-white";
            } else {
              activeCss = " ";
            }

            return (
              <div
                className={
                  "text-color-title -full cursor-pointer  flex  shadow-lg  items-center space-x-5  rounded-lg transition  card_theme_item p-5  py-2 hover:shadow-xl duration-200"
                }

              >
                <span
                  className={
                    "h-9 rounded-full border-2 flex-shrink-0  border-dark w-9 text-center font-bold leading-8 " +
                    activeCss
                  }
                >
                  {alphabet[index]}
                </span>
                <p className="text-sm ">{item.cauTraLoi}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
