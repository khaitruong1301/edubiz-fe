import { Button, Progress } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setTrangThaiQuizz } from "../../redux/reducer/baiHocContentReducer";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
import httpServ from "../../services/http.service";

export default function Navigate_Footer_ViewAnsers({
  current,
  total,
  handleChangeCurrentQuestion
}) {
  const dispatch = useDispatch();
  const percent = Math.floor((current / total) * 100);
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
        <span className="font-bold flex-shrink-0 text-color-title ">
          {current}/{total} câu
        </span>
      </div>
      <Button
        onClick={() => {
          current > 1 && handleChangeCurrentQuestion(-1)
        }}
        className={
          "   font-bold px-8 rounded  flex items-center h-10 flex-shrink-0   focus:border-blue-theme   bg-white text-blue-theme shadow-lg border-blue-theme border-2 border-opacity-50 hover:shadow-xl hover:border-opacity-100  transition duration-200"
        }
      >
        Quay lại
      </Button>
      <Button
        onClick={() => {
          current < total && handleChangeCurrentQuestion(+1)
        }}
        className={
          "   duration-150 font-bold px-8 rounded  flex items-center h-10 flex-shrink-0 border-none  focus:border-blue-theme hover:border-transparent hover:shadow-xl  btn-theme text-white"
        }
      >
        Câu tiếp theo
      </Button>
    </div>
  );
}

