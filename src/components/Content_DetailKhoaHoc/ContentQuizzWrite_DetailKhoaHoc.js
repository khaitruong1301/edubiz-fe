import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TabDetailBaiHoc from "../TabDetailBaiHoc/TabDetailBaiHoc";

import { Layout } from "antd";
import Content_QuizzWrite from "../Content_QuizzWrite/Content_QuizzWrite";
import Content_QuizzWrite_Success from "./Content_QuizzWrite_Success";
import httpServ from "../../services/http.service";
const { Content } = Layout;

export default function ContentQuizzWrite_DetailKhoaHoc() {
  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);
  const danhSachBaiDaHoc = useSelector((state) => state.khoaHoc.danhSachBaiDaHoc);
  const { userInfor } = useSelector((state) => state.authUser);

  const [daHoanThanh, setDaHoanThanh] = useState(false);
  const [baiTapDaNop, setBaiTapDaNop] = useState(null);

  useEffect(() => {
    const daHoanThanh = danhSachBaiDaHoc.find(x => x.baiHocId == currentLesson.id);
    setDaHoanThanh(daHoanThanh ? true : false);
    httpServ.getDiemBaiTap(userInfor.id, currentLesson.id)
      .then(res => {
        setBaiTapDaNop(res.data.content);
      })
      .catch(err => console.log(err))
  }, []);

  useEffect(() => {
    const daHoanThanh = danhSachBaiDaHoc.find(x => x.baiHocId == currentLesson.id);
    setDaHoanThanh(daHoanThanh ? true : false);
    httpServ.getDiemBaiTap(userInfor.id, currentLesson.id)
      .then(res => {
        setBaiTapDaNop(res.data.content);
      })
      .catch(err => console.log(err))
  }, [currentLesson.id]);

  return (
    <Content className="w-full h-max-content space-y-3 flex-shrink-0 relative overflow-hidden flex flex-col justify-start">
      <div className="w-full flex-grow  rounded-none border-none">
        <div className="w-full h-full card_theme border-none">
          {
            daHoanThanh ?
              <Content_QuizzWrite_Success baiTapDaNop={baiTapDaNop} currentLesson={currentLesson} setHoanThanh={setDaHoanThanh} />
              : <Content_QuizzWrite baiTapDaNop={baiTapDaNop} currentLesson={currentLesson} danhSachBaiDaHoc={danhSachBaiDaHoc} />
          }
        </div>
      </div>
    </Content>
  );
}
