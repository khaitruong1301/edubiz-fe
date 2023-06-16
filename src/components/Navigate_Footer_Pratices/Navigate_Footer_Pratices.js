import { Button, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsTotalRedoQuizz, setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
import httpServ from "../../services/http.service";

export default function Navigate_Footer_Pratices({
  current,
  total,
  handleClickNextQuestion,
  isDisableBtn,
  handleStopCheckTime
}) {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const baiHoc = useSelector((state) => state.baiHoc);
  let totalRedoQuizz = useSelector((state) => state.baiHoc.totalRedoQuizz);
  const { khoaHocContent } = useSelector((state) => state.khoaHoc);

  const listQuestion = baiHoc.listQuestion;
  const userInfor = useSelector((state) => state.authUser.userInfor);
  let questionFail = [];

  useEffect(() => {
    questionFail = [];
  }, [baiHoc.currentLesson.id]);

  const handle_PostKetQua = () => {

    handleStopCheckTime();

    let countCorrected = 0;

    for (let index = 0; index < listQuestion.length; index++) {
      const question = listQuestion[index];
      question.isCorrect && countCorrected++;
      !question.isCorrect && questionFail.push(question.id);
    }

    let diemQuizz = countCorrected / total;
    let inforQuizz = {
      loTrinhId: khoaHocContent.maLoTrinh,
      khoaHocId: khoaHocContent.id,
      baiHocId: baiHoc.currentLesson.id,
      nguoiDungId: userInfor?.id,
      soCauDung: countCorrected,
    };

    if (diemQuizz < 0.7) {
      if (totalRedoQuizz >= 3) {
        inforQuizz.diem = Math.floor(diemQuizz * 100);
        setloading(true);

        httpServ
          .postKetQuaQuizz(inforQuizz)
          .then((res) => {
            setloading(false);
            dispatch(setTrangThaiQuizz(res.data.content));
            dispatch(setIsTotalRedoQuizz(0));
          })
          .catch((err) => {
            setloading(false);
          });
      }
      else {
        dispatch(setTrangThaiQuizz({ trangThai: 5 }));
        dispatch(setIsTotalRedoQuizz(totalRedoQuizz ? totalRedoQuizz + 1 : 1));
      }
    }
    else {
      inforQuizz.diem = Math.floor(diemQuizz * 100);
      setloading(true);
      httpServ
        .postKetQuaQuizz(inforQuizz)
        .then((res) => {
          setloading(false);
          dispatch(setTrangThaiQuizz(res.data.content));
          dispatch(setIsTotalRedoQuizz(0));
        })
        .catch((err) => {
          setloading(false);

          console.log("no", err);
        });

      httpServ
        .postCompletedBaiHoc({
          loTrinhId: khoaHocContent.maLoTrinh,
          khoaHocId: khoaHocContent.id,
          baiHocId: baiHoc.currentLesson.id,
          nguoiDungId: userInfor?.id,
        })
        .then((res) => {
          dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (baiHoc.testMode) {
    isDisableBtn = false;
  }

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
          className="w-full"
          showInfo={false}
          strokeWidth={15}
          strokeColor={{
            "0%": "#4A00E0",
            "100%": "#8E2DE2",
          }}
          trailColor={"rgba(68, 66, 178, 0.1)"}
        />
        <span className="font-bold flex-shrink-0 text-color-title">
          {current}/{total} câu
        </span>
      </div>

      <Button
        onClick={() => {
          return current === total
            ? handle_PostKetQua()
            : handleClickNext()
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

