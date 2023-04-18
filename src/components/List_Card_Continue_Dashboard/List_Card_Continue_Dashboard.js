import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKhoaDangHoc } from "../../redux/reducer/dashboardReducer";
import { getLoTrinhDaDangKiAciton } from "../../redux/reducer/loTrinhReducer";
import httpServ from "../../services/http.service";

import Card_Continue_Dashboard from "../Card_Continue_Dashboard/Card_Continue_Dashboard";

export default function List_Card_Continue_Dashboard() {
  const dispatch = useDispatch();
  const khoaDanghoc = useSelector((state) => state.dashboard.khoaDangHoc);
  const userInfor = useSelector((state) => state.authUser.userInfor);
  useEffect(() => {
    httpServ
      .getKhoaDangHoc(userInfor?.id)
      .then((res) => {
        if (res.data.content.length > 0) {
          dispatch(setKhoaDangHoc(res.data.content));
        } else {
          dispatch(getLoTrinhDaDangKiAciton(userInfor.id))
            .then((res) => {
              let loTrinh = res?.payload[0];
              httpServ
                .getDetailKhoaHoc(loTrinh.danhSachKhoaHoc[0].id)
                .then((res) => {
                  let khoaHoc = res.data.content;
                  // console.log(khoaHoc.danhSachChuongHoc[0]);
                  let chuongHoc = khoaHoc.danhSachChuongHoc[0];
                  let data = {
                    loTrinhId: khoaHoc.maLoTrinh,
                    khoaHocId: khoaHoc.id,
                    baiHocId: chuongHoc.danhSachBaiHoc[0].id,
                    phanTram: 0,
                    loTrinhChu: loTrinh.tenLoTrinh,
                    khoaHocChu: loTrinh.danhSachKhoaHoc[0].tenKhoaHoc,
                    baiHocChu: chuongHoc.danhSachBaiHoc[0].tenBaiHoc,
                  };
                  dispatch(setKhoaDangHoc([data]));
                })
                .catch((err) => {
                  // console.log("err", err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className=" flex flex-col h-full card_theme p-3" data-tour="db-step-4">
      <p className="text-lg text-color-title flex-shrink-0 mb-1 ">Khóa đang học</p>
      <div
        className="list_khoaHoc
    h-40 flex-grow space-y-2  "
      >
        {khoaDanghoc.map((item) => {
          return <Card_Continue_Dashboard lesson={item} />;
        })}
      </div>
    </div>
  );
}
