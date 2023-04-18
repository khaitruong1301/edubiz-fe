import React, { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import HightLightLanguage from "./HightLightLanguage";

const entities = require("entities");



export default function Answer_Practices_ChooseAnswerToFill({
  question,
  key,
}) {
  let cauHoi = question.noiDung;

  const noiDung = entities.decodeHTML(cauHoi.inPut);
  const renderDataConvert = () => {
    const editor = document.querySelector("#editor");

    if (editor.innerText.includes("♥")) {
      editor.innerHTML = editor.innerHTML.replaceAll(
        "♥",
        `<span class='practice_choose_ansewer'...</span>`      );
    }
    const answerDivs = document.querySelectorAll(".practice_choose_ansewer");

    let listCauTraLoi = cauHoi.cauTraLoi.map((item) => {
      let newItem = { ...item }
      newItem.ma = newItem.ma * 1
      return newItem
    })
    let listDapAn = cauHoi.dapAn.map((item) => {
      return item * 1
    })
    // let arrQuestion = listCauTraLoi.filter((item) => { return listDapAn.includes(item.ma) })
    let arrQuestion = [];
    for (let i = 0; i < listDapAn.length; i++) {
      let index = listCauTraLoi.findIndex((item) => { return item.ma === listDapAn[i] })
      console.log("🚀 ~ file: Answer_Praticees_ChooseAnserToFill.js ~ line 42 ~ renderDataConvert ~ index", index)
      if (index !== -1) {
        arrQuestion.push(listCauTraLoi[index])

      }
    }
    if (answerDivs) {
      for (let index = 0; index < answerDivs.length; index++) {
        const element = answerDivs[index];
        element.innerHTML = arrQuestion[index].noiDung
      }
    }
  };
  useEffect(() => {
    renderDataConvert();
  }, [question.id]);
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

        </div>
        <div className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md  w-full ">
          <div className="practice_output space-x-5">
            {cauHoi.cauTraLoi.map((item) => {
              return (
                <button
                  className=" px-4 py-2 font-medium tracking-wide text-white  transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700"

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
