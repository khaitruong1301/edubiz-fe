import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import Content_Quizz_Failed from "./Content_Quizz_Fail";
import ContentQuizz_Start from "./Content_Quizz_Start";
import Content_Quizz_Success from "./Content_Quizz_Success";
import ContentQuizz_ViewAnsers from "./Content_Quizz_ViewAnswer";
import './Praticess.css'
import Content_Quizz_Out_Time from "./Content_Quizz_Out_Time";

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
      });

    return () => {
      dispatch(setIsRedoQuizz(false))
    }
  }, [currentLesson.id]);


  // if (testMode) {
  // return <ContentQuizz_ViewAnsers stateQuizz={stateQuizz} />;
  // }


  switch (stateQuizz?.trangThai) {
    case 3:
      return <ContentQuizz_ViewAnsers stateQuizz={stateQuizz} />;
    case 0:
      return <ContentQuizz_Start stateQuizz={stateQuizz} />;
    case 1:
      return <Content_Quizz_Failed data={stateQuizz} />;
    case 2:
      return <Content_Quizz_Success stateQuizz={stateQuizz} />;
    case 4:
      return <Content_Quizz_Out_Time stateQuizz={stateQuizz} />;
    default:

      break;
  }
  return <div></div>;
}
