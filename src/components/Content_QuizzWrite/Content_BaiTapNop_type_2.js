import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBaiTapNop,
  setCurrentLesson,
  setTrangThaiQuizz,
} from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import { Tooltip } from "antd";
import { getUpdateUserInforAciton } from "../../redux/reducer/authReducer";
import Button_GiaHan from "../Button_GiaHan/Button_GiaHan";

export default function Content_BaiTapNop_type_2({ baiHoc, baiTapNop }) {
  const { currentLesson, lastVideoCanWatchIndex } = useSelector(
    (state) => state.baiHoc
  );
  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);
  const { userInfor } = useSelector((state) => state.authUser);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
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
  const handleGiaHan = () => {
    httpServ
      .getGiaHanBaiTapNop(userInfor.id, currentLesson.id)
      .then((res) => {
        dispatch(getUpdateUserInforAciton(userInfor.id));
        // console.log(res);
        setMessage(res.data.message);
        if (res.data.content === 0) {
        }
        if (res.data.content === 1) {
          httpServ
            .getThongTinBaiTapNop(userInfor?.id, currentLesson.id)
            .then((res) => {
              // console.log(res);
              dispatch(setBaiTapNop(res.data.content));
            })
            .catch((err) => {
              // console.log(err);
            });
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  };
  return (
    <div className="w-full h-full card_theme border-none flex flex-col items-center p-10 space-y-9 justify-center">
      <p className="font-medium text-2xl text-color-title">
        <i className="fa fa-pen-square mr-2"></i>

        {baiHoc.tenBaiHoc}
      </p>
      <div className="space-y-7 text-center">
        <p className="font-medium text-xl text-red-500">
          Bài của bạn đã hết hạn nộp.
        </p>
        <div className="space-x-3 text-color-title">
          <span className="font-medium">
            Ngày bắt đầu: {baiTapNop.ngayBatDau}
          </span>
          <span className="font-medium">-</span>
          <span className="font-medium">
            Ngày kết thúc: {baiTapNop.ngayHetHan}
          </span>
        </div>
      </div>
      <Tooltip
        mouseEnterDelay={0.1}
        mouseLeaveDelay={0.1}
        trigger={["click", "hover"]}
        placement="top"
        animation="zoom"
        overlayClassName=" w-max rounded-lg"
        overlayStyle={{ maxWidth: "900px" }}
        color="white"
        title={
          <div className="flex items-center w-max p-3 justify-center">
            <div className=" text-base  w-40 space-y-3 text-gray-800">
              <p>Bạn có thể dùng 20 coin để nộp bài quá hạn</p>
            </div>
          </div>
        }
      >
        <Button_GiaHan text="Nộp bài" handleClick={handleGiaHan} />
        {message ? <p className="my-1 text-red-500">{message}</p> : ""}
      </Tooltip>
      <button
        onClick={handleNextLesson}
        className=" cursor-pointer card_theme p-3 font-medium text-xl text-color-blue-white border-none shadow-design_code"
      >
        Bài tiếp theo
      </button>
    </div>
  );
}
