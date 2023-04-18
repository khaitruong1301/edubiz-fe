import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";

export default function Content_BaiTapNop_type_3({ baiHoc }) {
  // console.log("baitap", baiHoc);
  const dispatch = useDispatch();

  const { currentLesson, lastVideoCanWatchIndex } = useSelector(
    (state) => state.baiHoc
  );

  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);

  const handleNextLesson = () => {
    let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
      return item.id === currentLesson.id;
    });
    let nextLessonIndex = lastVideoCanWatchIndex;

    if (
      currentLessonIndex < lastVideoCanWatchIndex ||
      currentLessonIndex === lastVideoCanWatchIndex + 1
    ) {
      nextLessonIndex = currentLessonIndex + 1;
    }
    dispatch(setCurrentLesson(tatCaBaiHoc[nextLessonIndex]));
  };
  return (
    <div className="w-full h-full card_theme border-none flex flex-col items-center p-10 space-y-9 justify-center">
      <p className="font-medium text-2xl">
        <i className="fa fa-pen-square mr-2"></i>

        {baiHoc.tenBaiHoc}
      </p>
      <div className="space-y-7 text-center">
        <p className="font-medium text-xl">
          <i className="fa  fa-check mr-2 text-green-theme text-xl"></i> Bạn đã
          nộp bài, giảng viên sẽ chấm và cho điểm bài tập của bạn.
        </p>
      </div>
      <button
        onClick={handleNextLesson}
        className=" cursor-pointer card_theme p-3 font-medium text-xl text-blue-theme border-none shadow-design_code"
      >
        Bài tiếp theo
      </button>
    </div>
  );
}
