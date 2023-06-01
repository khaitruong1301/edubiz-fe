import React, { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SingleChoice_Answer } from "../../model/QuizzModel";
const entities = require("entities");
const question = {
  id: 4,
  tieuDe: "kết quả đoạn chương trình trên là gì?",
  noiDung:
    "const sumCount &equals; function &lpar;&rpar; &lcub; &NewLine; let count &equals; 0&semi; &NewLine; return function &lpar;&rpar; &lcub; &NewLine; let count &equals; 5 &NewLine; return count&plus;&plus; &plus; count &NewLine; &rcub;&semi; &NewLine;&rcub;&semi; &NewLine;const result &equals; sumCount&lpar;&rpar;&lpar;&rpar;",
  noiDungCss: "",
  outPut: "kết quả chương trình trên là gì ? result = ?",
  cauTraLoi: [
    { ma: 1, noiDung: 6 },
    { ma: 2, noiDung: 5 },
    { ma: 3, noiDung: 11 },
    { ma: 4, noiDung: 1 },
  ],
  dapAn: '["3"]',
  loaiBaiTap: 4,
  ngonNgu: 1,
  capDo: 1,
};
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

export default function Practices_ChooseAnswer({
  question,
  handle_CheckSingleChoice,
}) {
  console.log(question);
  const noiDung = entities.decodeHTML(question.noiDung.inPut);
  // console.log("question here", noiDung);
  // noiDung = JSON.parse(noiDung);
  const answers = question.noiDung.dapAn.map((item, index) => {
    return new SingleChoice_Answer(index, item.cauTraLoi, item.luaChon);
  });
  // console.log("answers", answers);
  // console.log(question.userAnsers);
  const [activeBtnArr, setActiveBtnArr] = useState(
    question.userAnsers
    // []
  );
  useEffect(() => {
    setActiveBtnArr(question.userAnsers);
  }, [question.id]);
  const handle_ChooseAnser = () => {
    // console.log("activeBtnArr", activeBtnArr);
    if (activeBtnArr.length === 1) {
      // console.log("yes 1 choice");
      handle_CheckSingleChoice(
        question.id,
        activeBtnArr[0].luaChon,
        activeBtnArr
      );
    } else {
      handle_CheckSingleChoice(question.id, false, activeBtnArr);
    }
  };
  useEffect(() => {
    handle_ChooseAnser();
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
      <div className="relative w-full h-full p-3 flex-grow justify-center flex-col space-y-5 ">
        <div className="text-xl text-color-title font-medium">
          {question.noiDung.tieuDe}

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
            let result = activeBtnArr.find((activeItem) => {
              return activeItem.id === item.id;
            });
            if (result) {
              activeCss = "bg-blue-600 border-blue-600 border-white text-white";
            } else {
              activeCss = " ";
            }

            return (
              <div
                className={
                  "text-color-title  w-full cursor-pointer  flex  shadow-lg  items-center space-x-5  rounded-lg transition  card_theme_item p-5  py-2 hover:shadow-xl duration-200"
                }
                onClick={() => {
                  let index = activeBtnArr.findIndex((activeBtn) => {
                    return activeBtn.id === item.id;
                  });
                  if (index !== -1) {
                    let temp = [...activeBtnArr];
                    temp.splice(index, 1);
                    setActiveBtnArr(temp);
                  } else {
                    setActiveBtnArr([item]);
                  }
                }}
              >
                <span
                  className={
                    "h-9 border-2 flex-shrink-0  border-dark w-9 text-center font-bold leading-8  rounded-full " +
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
