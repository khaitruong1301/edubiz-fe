import React, { useEffect } from "react";
import httpServ from "../services/http.service";
import { useDispatch, useSelector } from "react-redux";
import Item_ListDiem_LoTrinh from "../components/Item_ListDiem_LoTrinh.js/Item_ListDiem_LoTrinh";
// import PaginationBar from "../components/Pagination/PaginationBar";
import { setDanhSachLoTrinh } from "../redux/reducer/diemAndChungNhanReducer";
import lotrinhLottie1 from "../assets/lottie_json/chungNhanLottie.json";
import Lottie from "lottie-react";
import { getLoTrinhDaDangKiAciton } from "../redux/reducer/loTrinhReducer";



export default function ChungNhanPage() {
  const { danhSachLoTrinh } = useSelector((state) => state.diemChungNhan);

  const { userInfor } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoTrinhDaDangKiAciton(userInfor?.id));

    httpServ
      .getAllDiemBaiTapUser(userInfor.id)
      .then((res) => {
        dispatch(setDanhSachLoTrinh(res.data.content));
        // console.log("res chung nhan page ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full h-full flex flex-grow  p-3  flex-col ">
      <div className="w-full   card_theme flex-grow   space-y-7 p-3 ">
        <div className="w-full flex items-center card_theme h-60 lg:h-80   space-x-10">
          <div className=" w-1/2 lg:w-1/3  text-base text-color-title h-full justify-center px-5   flex flex-col space-y-2">
            <p className=" font-medium">
              Điều kiện in chứng nhận và bảng điểm:
            </p>
            <p>- Hãy hoàn thành tất cả các bài tập của lộ trình.</p>
            <p>- Điểm trung bình lộ trình trên 7 (đối với chứng nhận).</p>

            <p>- Mỗi lộ trình bạn sẽ được in chứng nhận và bảng điểm riêng.</p>
          </div>
          <div className=" h-60 lg:h-80 w-60 lg:w-80 transform scale-150 ">
            <Lottie
              loop={false}
              animationData={lotrinhLottie1}
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="flex-grow space-y-5  lg:p-3 border-none">
          {danhSachLoTrinh.map((loTrinh) => {
            return <Item_ListDiem_LoTrinh loTrinh={loTrinh} />;
          })}
        </div>
      </div>
    </div>
  );
}
