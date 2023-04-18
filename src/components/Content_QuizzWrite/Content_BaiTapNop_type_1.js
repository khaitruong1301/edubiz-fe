import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBaiTapNop } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import { Input } from "antd";
import { useRef } from "react";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
export default function Content_BaiTapNop_type_1({ baiHoc, baiTapNop }) {
  // console.log("baitap", baiHoc);
  // console.log("baiTapNop", baiTapNop);
  const refLinkDriver = useRef(null);
  const khoaHoc = useSelector((state) => state.khoaHoc.khoaHocContent);
  const userInfor = useSelector((state) => state.authUser.userInfor);
  const [valueInput, setValueInput] = useState()
  const dispatch = useDispatch();

  const handleStartBaiTap = () => {
    if (!refLinkDriver.current.value.trim()) {
      return
    }
    let data = {
      loTrinhId: khoaHoc.maLoTrinh,
      khoaHocId: khoaHoc.id,
      baiHocId: baiHoc.id,
      nguoiDungId: userInfor?.id,
      noiDung: refLinkDriver.current.value,
    };
    httpServ
      .postNopBaiTapNop(data)
      .then((res) => {
        // console.log(res);
        dispatch(setBaiTapNop(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
    httpServ
      .postCompletedBaiHoc({
        loTrinhId: khoaHoc.maLoTrinh,
        khoaHocId: khoaHoc.id,
        baiHocId: baiHoc.id,
        nguoiDungId: userInfor?.id,
      })
      .then((res) => {
        dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));

      })
      .catch((err) => {
        console.log(err);
      });
    httpServ.getDanhSachBaiDaHoc(khoaHoc.id, userInfor?.id).then((res) => {
      dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
    });
  };
  let extraCssInput = valueInput ? "cursor-pointer" : " cursor-not-allowed"
  return (
    <div className="w-full h-full  border-none flex flex-col items-center p-10 space-y-9 justify-center ">
      <p className="font-medium text-xl">
        <i className="fa fa-pen-square mr-2"></i>

        {baiHoc.tenBaiHoc}
      </p>
      <button className=" cursor-pointer card_theme p-3 text-lg  border-none shadow-lg text-blue-theme">
        <a
          href={`https://backend.cyberlearn.vn/${baiHoc.noiDung}`}
          target="_blank"
          className="hover:text-blue-theme"

        >
          <i className="fa fa-folder-open mr-2"></i>
          Click vào đây để lấy đề bài
        </a>
      </button>

      <button className=" cursor-pointer card_theme p-3 text-lg border-none shadow-lg text-blue-theme">
        <a
          href="https://backend.cyberlearn.vn/files/huong_dan_nop_bai.pdf"
          target="_blank"
          className="hover:text-blue-theme"
        >
          Xem hướng dẫn nộp bài
        </a>
      </button>
      <div className="space-y-7 text-center">
        <p className="font-medium text-xl">
          <i className="fa fa-exclamation-triangle mr-2 text-yellow-theme text-xl"></i>{" "}
          <span className="mr-2">Lưu ý:</span>
          Sau khi làm bài xong, các bạn vui lòng up bài của mình lên Google
          Drive và nộp link drive.
        </p>

        <p className="font-medium text-color-content">
          File được nén theo định dạng zip và đặt tên file: [Khoá
          học]_[Chương]_[Họ tên].
        </p>
      </div>
      <div className="flex items-center space-x-3 w-2/3">
        <p className="flex-shrink-0 font-medium">Link drive</p>
        <input
          onChange={(e) => {
            setValueInput(e.target.value)
          }}
          ref={refLinkDriver}
          className="shadow-lg shadow-design_code  border rounded-lg w-full hover:shadow-xl py-4 px-3 bg-white focus:outline-none placeholder-blue-700 "
          placeholder="Nộp link bài làm của bạn đã up lên driver"
        />
      </div>
      <button
        onClick={handleStartBaiTap}
        className={"  card_theme p-3 font-medium text-lg text- border-none shadow-design_code text-blue-theme " + extraCssInput}
      >
        Nộp bài
      </button>
      <p className="flex items-center">
        <i className="fa fa-clock mr-1"></i>Bạn còn{" "}
        <span className="font-medium inline-block mx-1">
          {baiTapNop.ngayNopConLai}
        </span>{" "}
        để nộp bài
      </p>
    </div>
  );
}
