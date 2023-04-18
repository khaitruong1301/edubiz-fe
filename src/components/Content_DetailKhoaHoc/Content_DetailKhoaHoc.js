import React from "react";
import { useSelector } from "react-redux";
import ContentArticle_DetailKhoaHoc from "./ContentArticle_DetailKhoaHoc";
import ContentQuizzWrite_DetailKhoaHoc from "./ContentQuizzWrite_DetailKhoaHoc";
import ContentQuizz_DetailKhoaHoc from "./ContentQuizz_DetailKhoaHoc";
import ContentVideo_DetailKhoaHoc from "./ContentVideo_DetailKhoaHoc";

export default function Content_DetailKhoaHoc() {
  const typeContentDisplay = useSelector(
    (state) => state.baiHoc?.currentLesson?.maLoaiBaiHoc
  );
  switch (typeContentDisplay) {
    case "VIDEO_FPT":
      return <ContentVideo_DetailKhoaHoc />;

    case "ARTICLE":
      return <ContentArticle_DetailKhoaHoc />;
    case "QUIZ":
      return <ContentQuizz_DetailKhoaHoc />;

    case "QUIZ_WRITE":
      return <ContentQuizzWrite_DetailKhoaHoc />;
    default:
      return <div></div>;
  }
}
