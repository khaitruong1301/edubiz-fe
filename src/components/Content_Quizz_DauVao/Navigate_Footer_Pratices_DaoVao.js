import { Button, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
import httpServ from "../../services/http.service";
import {
  setCurrentStep,
  setLoadingSigup,
} from "../../redux/reducer/signUpReducer";
import { useHistory } from "react-router-dom";
let datjson = "";
export default function Navigate_Footer_Pratices_DaoVao({
  current,
  handleClickNextQuestion,
  isDisableBtn,
}) {
  let history = useHistory();
  const dispatch = useDispatch();
  const { userInfor, listCauHoi } = useSelector((state) => state.signUp);

  const [loading, setloading] = useState(false);

  const listQuestion = listCauHoi;
  let total = listCauHoi.length;

  const handle_PostKetQua = () => {
    let countCorrected = 0;
    for (let index = 0; index < listQuestion.length; index++) {
      const question = listQuestion[index];
      question.isCorrect && countCorrected++;
    }
    let diemQuizz = (countCorrected / total) * 10;
    let inforQuizz = {
      soCauDung: countCorrected,
      diem: diemQuizz,
      noiDungbaiLàm: listQuestion.map((item) => {
        return item.userAnsers;
      }),
    };
    // gọi api và đá ra màn hình step 3 trang đăng kí
    let newUserInfor = { ...userInfor };
    newUserInfor.linkNopBai = JSON.stringify(inforQuizz);
    // return
    httpServ
      .postDangKyUser(newUserInfor)
      .then((res) => {
        dispatch(setLoadingSigup(false));
        dispatch(setCurrentStep(2));
        history.push("/signup");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickNext = () => {
    return !isDisableBtn ? handleClickNextQuestion() : null;
  };
  const percent = Math.floor((current / total) * 100);
  const nextBtnCss = isDisableBtn
    ? " text-gray-600 bg-gray-300 cursor-not-allowed"
    : "  btn-theme text-white ";
  return (
    <div className="  flex items-center h-16 w-full justify-center space-x-10 px-16 border-none rounded-2xl">
      <div className="flex items-cente space-x-5 justify-center max-w-screen-md w-full">
        <Progress
          step={total}
          percent={percent}
          // size="small"
          className="w-full"
          showInfo={false}
          strokeWidth={15}
          // rgb(139, 29, 234) 1.36%, rgb(74, 0, 224) 100%)
          strokeColor={{
            "0%": "#4A00E0",
            "100%": "#8E2DE2",
          }}
          // trailColor="rgba(34, 34, 96,0,1)"
          trailColor={"rgba(68, 66, 178, 0.1)"}
        />
        <span className="font-bold flex-shrink-0 text-color-title">
          {current}/{total} câu
        </span>
      </div>

      <Button
        onClick={() => {
          return current === total ? handle_PostKetQua() : handleClickNext();
        }}
        className={
          "  text-white duration-150 font-bold px-8 rounded  flex items-center h-10 flex-shrink-0 border-none  focus:border-blue-theme hover:border-transparent hover:shadow-lg" +
          nextBtnCss
        }
        loading={loading}
      >
        {current == total ? "Hoàn thành" : " Câu tiếp theo"}
      </Button>
    </div>
  );
}
