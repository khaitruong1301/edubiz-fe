import React, { useEffect, useRef } from "react";
import HtmlParser from "react-html-parser";
import ReactHtmlParser from "react-html-parser";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";


export default function Answer_Practices_FillCodeToInput({
  question,
}) {
  const containerRef = useRef();


  useEffect(() => {
    const editor = document.querySelector("#editor pre code");
    if (editor.innerText.includes("♥")) {
      editor.innerHTML = editor.innerHTML.replace(
        "♥",
        `<input class='practice_fill_input' id='input_box'  /> `
      );
      const answerDivs = document.querySelectorAll(".practice_fill_input");
      if (answerDivs) {
        for (let index = 0; index < answerDivs.length; index++) {
          const element = answerDivs[index];
          element.value = question.noiDung.dapAn[index]
        }
      }
    }

  }, []);


  return (
    <div className="w-full h-max-content  p-3 flex-grow flex flex-col ">
      <div className="w-full mx-auto  flex flex-col space-y-5 relative">
        <p className="practice_tieuDe  text-xl text-color-title  font-medium ">
          {question.noiDung.tieuDe}
        </p>
        <div
          ref={containerRef}
          id="editor"
          className="w-full rounded-xl  overflow-hidden  "
        >
          <SyntaxHighlighter
            className="p-10"
            language="javascript"
            style={dracula}
            wrapLines={true}
          >
            {HtmlParser(question.noiDung.inPut)}
          </SyntaxHighlighter>
        </div>
        <p className="practice_tieuDe  text-xl text-color-title  font-medium ">
          Output:
        </p>
        <div className="px-8 py-4 mx-auto bg-white rounded-lg shadow-md  w-full ">
          <div className="practice_output space-y-5">
            {ReactHtmlParser(question.noiDung.outPut)}
          </div>
        </div>
      </div>
    </div>
  );
}
