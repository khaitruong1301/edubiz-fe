import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setKhoaDangHoc } from "../../../../redux/reducer/dashboardReducer";
import { getLoTrinhDaDangKiAciton } from "../../../../redux/reducer/loTrinhReducer";
import httpServ from "../../../../services/http.service";
import DashboardLession from '../dashboard-lession/DashboardLession'
import './DashboardListLession.css'

export default function DashboardListLession() {
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
                            if(loTrinh.danhSachKhoaHoc.length > 0){
                                const khoaHocLast = loTrinh.danhSachKhoaHoc[0];
                                httpServ
                                .getDetailKhoaHoc(khoaHocLast.id)
                                .then((res) => {
                                    let khoaHoc = res.data.content;
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
                            }
                            
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
        <>
            {
                khoaDanghoc.map((item, index) => {
                    return <DashboardLession key={index} lesson={item} />;
                })
            }
        </>
    )
}