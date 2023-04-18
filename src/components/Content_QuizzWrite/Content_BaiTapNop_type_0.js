import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaiTapNop } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";

export default function Content_BaiTapNop_type_0({ baiHoc }) {
  const khoaHoc = useSelector((state) => state.khoaHoc.khoaHocContent);
  const userInfor = useSelector((state) => state.authUser.userInfor);
  const dispatch = useDispatch();
  const handleStartBaiTap = () => {
    let data = {
      loTrinhId: khoaHoc.maLoTrinh,
      khoaHocId: khoaHoc.id,
      baiHocId: baiHoc.id,
      nguoiDungId: userInfor?.id,
      noiDung: "",
    };
    httpServ
      .postStartBaiTapNop(data)
      .then((res) => {
        dispatch(setBaiTapNop(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="w-full h-full card_theme border-none flex flex-col items-center p-10 space-y-9 justify-center">
      <p className="font-medium text-2xl">
        <i className="fa fa-pen-square mr-2"></i>

        {baiHoc.tenBaiHoc}
      </p>
      <div className="space-y-7 text-center">
        <p className="font-medium text-xl">
          <i className="fa fa-exclamation-triangle mr-2 text-yellow-theme text-xl"></i>{" "}
          <span className="mr-2">Lưu ý:</span>
          Bắt đầu tính thời gian làm bài khi nhấn nút bắt đầu.
        </p>

        <p className="font-medium text-color-content">
          Bắt đầu tính thời gian làm bài khi nhấn nút bắt đầu. Làm bài và nộp
          trước thời gian quy định !
        </p>
      </div>
      <button
        onClick={handleStartBaiTap}
        className=" cursor-pointer card_theme p-3 font-medium text-xl text-red-500 border-none shadow-design_code"
      >
        Bắt đầu
      </button>
    </div>
  );
}
