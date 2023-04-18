import React from "react";
import Content_Quizz from "../Content_Quizz/Content_Quizz";

export default function ContentQuizz_DetailKhoaHoc() {
  return (
    <div className="w-full  flex-grow h-full flex flex-col ">
      <div className="w-full h-full card_theme border-none flex-grow flex flex-col  overflow-hidden relative">
        <Content_Quizz />
      </div>
    </div>
  );
}
