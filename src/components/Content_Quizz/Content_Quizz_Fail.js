import React, { useState } from "react";
import Countdown from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import { setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import sadIcon from "../../assets/img/sad.png";
import httpServ from "../../services/http.service";
import Button_GiaHan from "../Button_GiaHan/Button_GiaHan";
import { getUpdateUserInforAciton } from "../../redux/reducer/authReducer";
export default function Content_Quizz_Failed({ data }) {
  
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  const baiHoc = useSelector((state) => state.baiHoc);
  const userInfor = useSelector((state) => state.authUser.userInfor);
  const rendererTimer = ({ hours, minutes, seconds }) => {
    if (hours == 0 && minutes == 0 && seconds == 0) {
      httpServ
        .getTrangThaiQuizz(userInfor?.id, baiHoc.currentLesson.id)
        .then((res) => {
          dispatch(setTrangThaiQuizz(res.data.content));
        })
        .catch((err) => { });
    }
    return (
      <span className="font-medium text-lg">
        {hours} giờ {minutes} phút {seconds} giây
      </span>
    );
  };
  let hms = data.timeLamLai; // your input string

  let a = hms.split(":"); // split it at the colons

  // minutes are worth 60 seconds. Hours are worth 60 minutes.
  let seconds = +a[0] * 60 * 60 + +a[1] * 60 + +a[2];

  const handleGiaHan = () => {
    httpServ
      .getGiaHanBaiTapTracNghiem(userInfor.id, baiHoc.currentLesson.id)
      .then((res) => {
        dispatch(getUpdateUserInforAciton(userInfor.id));
        // console.log(res);
        setMessage(res.data.message);

        if (res.data.content === 0) {
        }
        if (res.data.content === 1) {
          httpServ
            .getTrangThaiQuizz(userInfor?.id, baiHoc.currentLesson.id)
            .then((res) => {
              dispatch(setTrangThaiQuizz(res.data.content));
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full  flex flex-col items-center justify-center bg-dark-theme bg-opacity-20">
      <div className="w-2/3 h-2/3  flex flex-col bg-white card_theme border-none items-center justify-center space-y-7">
        <img className="w-12 h-12 object-cover -mb-1" src={sadIcon} />

        <p className="text-xl ">
          Bạn đã không vượt qua bài kiểm tra, vui lòng thử lại sau:
        </p>
        <Countdown
          // onComplete={console.log("compllete")}
          // date={Date.now() + 500000000}
          date={Date.now() + seconds * 1000}
          // date={Date.now() + 10 * 1000}
          renderer={rendererTimer}
        />
        <Button_GiaHan
          text="Giảm thời gian chờ (60 phút)"
          handleClick={handleGiaHan}
        />
        {message ? <p className="my-1 text-red-500">{message}</p> : ""}
      </div>
    </div>
  );
}
