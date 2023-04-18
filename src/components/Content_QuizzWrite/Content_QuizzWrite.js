import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBaiTapNop } from "../../redux/reducer/baiHocContentReducer";
import httpServ from "../../services/http.service";
import localStorageServ from "../../services/locaStorage.service";
import Content_BaiTapNop_type_0 from "./Content_BaiTapNop_type_0";
import Content_BaiTapNop_type_1 from "./Content_BaiTapNop_type_1";
import Content_BaiTapNop_type_2 from "./Content_BaiTapNop_type_2";
import Content_BaiTapNop_type_3 from "./Content_BaiTapNop_type_3";
import Content_BaiTapNop_type_4 from "./Content_BaiTapNop_type_4";

export default function Content_QuizzWrite({ data }) {
  const dispatch = useDispatch();

  let baiTapNop = useSelector((state) => state.baiHoc.baiTapNop);
  let userInfor = localStorageServ.userInfor.get()
  useEffect(() => {
    httpServ.getThongTinBaiTapNop(userInfor?.id, data.id)
      .then((res) => {
        dispatch(setBaiTapNop(res.data.content));
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [])
  switch (baiTapNop.trangThai) {
    case 0:
      return <Content_BaiTapNop_type_0 baiHoc={data} />;
    case 1:
      return <Content_BaiTapNop_type_1 baiTapNop={baiTapNop} baiHoc={data} />;
    case 2:
      return <Content_BaiTapNop_type_2 baiTapNop={baiTapNop} baiHoc={data} />;
    case 3:
      return <Content_BaiTapNop_type_3 baiTapNop={baiTapNop} baiHoc={data} />;
    case 4:
      return <Content_BaiTapNop_type_4 baiTapNop={baiTapNop} baiHoc={data} />;
    default:
      return <div></div>;
  }
}
