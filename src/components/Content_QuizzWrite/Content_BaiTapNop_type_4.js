import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentLesson,
} from "../../redux/reducer/baiHocContentReducer";
import ReactHtmlParser from "react-html-parser";
// import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";

export default function Content_BaiTapNop_type_4({ baiHoc, baiTapNop }) {
  const { currentLesson, lastVideoCanWatchIndex } = useSelector(
    (state) => state.baiHoc
  );
  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);

  const dispatch = useDispatch();
  let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
    return item.id === currentLesson.id;
  });
  const handleNextLesson = () => {

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
    <div className="w-full h-full card_theme border-none flex  flex-col items-center p-10 space-y-9 ">
      <div className="w-full flex flex-col items-center justify-center space-y-9">
        <p className="font-medium text-2xl">
          <i className="fa fa-pen-square mr-2"></i>

          {baiHoc.tenBaiHoc}
        </p>
        <div className="space-y-7 text-center">
          <p className="font-medium text-xl">
            <i className="fa  fa-check mr-2 text-green-theme text-xl"></i>{" "}
            {baiTapNop.diem} điểm
          </p>
        </div>
        <div className="flex items-center space-x-5">
          <button
            // onClick={handleStartBaiTap}
            className=" cursor-pointer  rounded-lg  shadow-design_code p-3  text-lg text-white btn-theme border-none "
          >
            <a
              href={`https://backend.cyberlearn.vn/${baiTapNop.baiGiai}`}
              target="_blank"
              className="hover:text-blue-theme"
            >
              <i className="fa fa-folder-open mr-2"></i>
              Xem Bài giải
            </a>
          </button>
          {currentLessonIndex + 1 !== tatCaBaiHoc.length && <button
            onClick={handleNextLesson}
            className=" cursor-pointer card_theme p-3  text-lg text-blue-theme border-none shadow-design_code"
          >
            Bài tiếp theo
          </button>
          }
        </div>
      </div>
      <div className="w-full flex space-x-3">
        <p className="font-medium">Nhận xét giảng viên: </p>
        <div className=" ">{ReactHtmlParser(baiTapNop.nhanXet)}</div>
      </div>
    </div>
  );
}
