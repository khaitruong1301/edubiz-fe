import React from "react";
import Item_LoTrinh_Recomemended from "./Item_LoTrinh_Recomemended";
import { LoTrinhCuaBan_Fake_Data } from "../../fakeData/LoTrinhCuaBan_Fake_Data";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { useSelector, useDispatch } from "react-redux";
import { LoTrinhChuaDangKi_Fake_DATA } from "../../fakeData/LoTrinhChuaDangKi_Fake_DATA";
import { getTatCaLoTrinhAciton } from "../../redux/reducer/loTrinhReducer";
import { useEffect } from "react";
export default function Card_LoTrinh_Recommended() {
  const { userInfor } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTatCaLoTrinhAciton(userInfor.id));
  }, []);
  let listLoTrinh = [];

  let { tatCaLoTrinh } = useSelector((state) => state.loTrinh);
  let filterLoTrinhChuaDangki = tatCaLoTrinh.filter((item) => {
    return !item.daDangKy;
  });
  listLoTrinh = checkDemoUser()
    ? LoTrinhChuaDangKi_Fake_DATA
    : filterLoTrinhChuaDangki;
  let extraCss = listLoTrinh.length > 2 ? "list_khoaHoc" : "";
  return (
    <div className={"w-full space-y-3  h-full " + extraCss}>
      {listLoTrinh.map((loTrinh) => {
        return <Item_LoTrinh_Recomemended loTrinh={loTrinh} />;
      })}
    </div>
  );
}
