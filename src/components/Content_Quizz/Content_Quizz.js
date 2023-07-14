import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import Content_Quizz_Failed from "./Content_Quizz_Fail";
import ContentQuizz_Start from "./Content_Quizz_Start";
import Content_Quizz_Success from "./Content_Quizz_Success";
import ContentQuizz_ViewAnsers from "./Content_Quizz_ViewAnswer";
import './Praticess.css'
import Content_Quizz_Out_Time from "./Content_Quizz_Out_Time";
import Content_Quizz_Restart from "./Content_Quizz_Restart";
import { Modal } from "antd";

export default function Content_Quizz() {

  const dispatch = useDispatch();
  const baiHoc = useSelector((state) => state.baiHoc);
  const userInfor = useSelector((state) => state.authUser.userInfor);
  const { testMode } = useSelector((state) => state.baiHoc);
  let stateQuizz = useSelector((state) => state.baiHoc.trangThaiQuizz);
  let { currentLesson } = useSelector((state) => state.baiHoc);

  useEffect(() => {
    httpServ
      .getTrangThaiQuizz(userInfor?.id, baiHoc.currentLesson.id)
      .then((res) => {
        dispatch(setTrangThaiQuizz(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });

    return () => {
      dispatch(setIsRedoQuizz(false))
    }
  }, [currentLesson.id]);


  // if (testMode) {
  // return <ContentQuizz_ViewAnsers stateQuizz={stateQuizz} />;
  // }


  switch (stateQuizz?.trangThai) {
    case 3: // XEM BÀI LÀM
      return <ContentQuizz_ViewAnsers />;
    case 0: // BẮT ĐẦU LÀM
      return <ContentQuizz_Start stateQuizz={stateQuizz} />;
    case 1: // KHÔNG QUA BÀI TEST
      return <Content_Quizz_Failed data={stateQuizz} />;
    case 2: // QUA BÀI TEST
      return <Content_Quizz_Success stateQuizz={stateQuizz} />;
    case 4: // HẾT ThỜI GIAN LÀM BÀI
      return <Content_Quizz_Out_Time stateQuizz={stateQuizz} />;
    case 5: // LÀM SAI CHƯA TỚI 3 LẦN => CHO LÀM LẠI
      return <Content_Quizz_Restart stateQuizz={stateQuizz} />;
    default:

      break;
  }

  return <div></div>;
}
