import React from "react";
import { useEffect } from "react";
import httpServ from "../../services/http.service";
import Content_Quizz_TestDauVao from "../../components/Content_Quizz_DauVao/Content_Quizz_TestDauVao";
export default function TestQuizPage() {
  useEffect(() => {
    httpServ
      .getDanhSachCauHoiTestDauVao()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="h-screen">
      <Content_Quizz_TestDauVao />
    </div>
  );
}
