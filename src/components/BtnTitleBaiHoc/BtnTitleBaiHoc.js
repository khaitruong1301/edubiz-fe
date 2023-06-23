import React from "react";
import BtnTitleArticle from "./BtnTitleArticle";
import BtnTitleQuizz from "./BtnTitleQuizz";
import BtnTitleQuizz_Write from "./BtnTitleQuizz_Write";
import BtnTitleVideo from "./BtnTitleVideo";
import { useSelector } from "react-redux";

export default function BtnTitleBaiHoc({ lesson, isDemoUser, onToggle, itemIndex }) {
  const danhSachBaiDaHoc = useSelector(
    (state) => state.khoaHoc.danhSachBaiDaHoc
  );
  const { allLessons } = useSelector((state) => state.khoaHoc);

  const { lastVideoCanWatchIndex, testMode } = useSelector(
    (state) => state.baiHoc
  );

  let idBaiHoc = lesson.id;
  let isLearned = false;
  let indexCheck = danhSachBaiDaHoc.findIndex((item) => { return item.baiHocId == idBaiHoc })

  if (indexCheck !== -1) {
    isLearned = true;
  }

  let isCancelUserClick = () => {
    if (isDemoUser || testMode) {
      return true;
    }
    let currentLessonIndex;
    if (lesson.maLoaiBaiHoc === "QUIZ_WRITE") {
      return false;
    } else {
      currentLessonIndex = allLessons.findIndex((baiHoc) => {
        return baiHoc?.id === lesson.id;
      });
    }

    if (
      currentLessonIndex === lastVideoCanWatchIndex + 1 ||
      currentLessonIndex <= lastVideoCanWatchIndex
    ) {
      return true;
    }
    if (allLessons[currentLessonIndex - 1].maLoaiBaiHoc === "QUIZ_WRITE" && currentLessonIndex === lastVideoCanWatchIndex + 2) {
      return true
    }
    return false;
  };

  let isCanWatch = false;
  const lessonCanWatch = allLessons.find((item, i) => i == (lastVideoCanWatchIndex + 1));
  if (lessonCanWatch) {
    isCanWatch = lessonCanWatch.id == lesson.id;
  }

  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
  const hightLightcss =
    currentLesson?.id === lesson.id
      ? "btn-highlight-baihoc bg-opacity-30  text-color-title font-medium hover "
      : "";

  let isLock = false;
  // if (isLearned)
  //   isLock = false;
  // if (hightLightcss)
  //   isLock = false;
  // if (isCanWatch)
  //   isLock = false;

  switch (lesson.maLoaiBaiHoc) {
    case "VIDEO_FPT":
      return (
        <BtnTitleVideo
          hightLightcss={hightLightcss}
          lesson={lesson}
          isLearned={isLearned}
          isCancelUserClick={isCancelUserClick()}
          isDemoUser={isDemoUser}
          onToggle={onToggle}
          isCanWatch={isCanWatch}
          isLock={isLock}
        />
      );

    case "ARTICLE":
      return (
        <BtnTitleArticle
          hightLightcss={hightLightcss}
          lesson={lesson}
          isLearned={isLearned}
          isCancelUserClick={isCancelUserClick()}
          onToggle={onToggle}
          isCanWatch={isCanWatch}
          isLock={isLock}
        />
      );

    case "QUIZ":
      return (
        <BtnTitleQuizz
          hightLightcss={hightLightcss}
          lesson={lesson}
          isLearned={isLearned}
          isCancelUserClick={isCancelUserClick()}
          onToggle={onToggle}
          isCanWatch={isCanWatch}
          isLock={isLock}
        />
      );
    case "QUIZ_WRITE":
      return (
        <BtnTitleQuizz_Write
          hightLightcss={hightLightcss}
          lesson={lesson}
          isLearned={isLearned}
          isDemoUser={isDemoUser}
          onToggle={onToggle}
          isCanWatch={isCanWatch}
          isLock={isLock}
        />
      );

    default:
      break;
  }
}
