import React, { useEffect, useState } from "react";
import { Layout, Tooltip } from "antd";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import TabDetailBaiHoc from "../TabDetailBaiHoc/TabDetailBaiHoc";
import { Mark_Video } from "../../helper/watermark";
import httpServ from "../../services/http.service";
import { Checkbox } from "antd";
import { setCurrentLesson } from "../../redux/reducer/baiHocContentReducer";
import { setdanhSachBaiDaHoc } from "../../redux/reducer/khoaHocReducer";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import { setUserInfor } from "../../redux/reducer/authReducer";
import CollapseGhiChu from "../CollapseGhiChu/CollapseGhiChu";
import localStorageServ from "../../services/locaStorage.service";
import CloneObjectByJSON from "../../utils/CloneObjectByJSON";
import axios from "axios";
import FPTPlayer from "../FPTPlayer/FPTPlayer";
const { Content } = Layout;

const ContentVideo_DetailKhoaHoc = React.memo(() => {

  const [isDisableHoanThanh, seIsDisableHoanThanh] = useState(true);
  const dispatch = useDispatch();
  const userInforRedux = useSelector((state) => state.authUser.userInfor);
  const userInfor = CloneObjectByJSON(userInforRedux);
  const currentLesson = useSelector((state) => state.baiHoc.currentLesson);

  const { danhSachBaiDaHoc } = useSelector((state) => state.khoaHoc);
  const { isSiderDetailKhoaHocOpen } = useSelector((state) => state.layout);
  const [urlVideo, setUrlVideo] = useState("");

  useEffect(() => {
    let infor = userInfor.hoTen + " - " + userInfor.dienThoai;
    if (checkDemoUser()) {
      infor = localStorageServ.codeDemo.get();
      userInfor.nuocNgoai = localStorageServ.nuocngoaiDemo.get() * 1;
    }
  }, [urlVideo]);


  useEffect(() => {
    !userInfor.nuocNgoai &&
      httpServ.getUrlVideo_FPT(currentLesson.noiDung).then((res) => {
        setUrlVideo(res.data);
      });
    userInfor.nuocNgoai &&
      currentLesson.video == "0" &&
      axios({
        url: `https://apicrm.cybersoft.edu.vn/api/file/ftp-video-digital/${currentLesson.noiDung}`,
        method: "GET",
      })
        .then((res) => {
          setUrlVideo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    seIsDisableHoanThanh(true)
  }, [currentLesson.id]);

  const baiDaHoc = useSelector((state) => state.khoaHoc.danhSachBaiDaHoc);
  const khoaHocContent = useSelector((state) => state.khoaHoc.khoaHocContent);
  const tatCaBaiHoc = useSelector((state) => state.khoaHoc.allLessons);

  const handleNextLesson = () => {
    let currentLessonIndex = tatCaBaiHoc.findIndex((item) => {
      return item.id === currentLesson.id;
    });

    const data = {
      loTrinhId: khoaHocContent.maLoTrinh,
      baiHocId: currentLesson.id,
      khoaHocId: khoaHocContent.id,
      nguoiDungId: userInfor?.id,
    };

    !checkDemoUser() &&
      httpServ
        .postCompletedBaiHoc(data)
        .then((res) => {
          dispatch(setdanhSachBaiDaHoc(res.data.content.baiDaHoc));
        })
        .catch((err) => { });

    if (checkDemoUser()) {
      let newInfor = { ...userInfor };
      newInfor.coin++;
      newInfor.tichCuc += 100;
      newInfor.kinhNghiem += 10;
      dispatch(setUserInfor(newInfor));
      let stt = tatCaBaiHoc.findIndex((lesson) => {
        return lesson.id == currentLesson.id;
      });
      let newDs = [
        ...danhSachBaiDaHoc,
        {
          baiHocId: currentLesson.id,
          stt,
        },
      ];
      dispatch(setdanhSachBaiDaHoc(newDs));

      for (
        let index = currentLessonIndex;
        index < tatCaBaiHoc.length;
        index++
      ) {
        const lesson = tatCaBaiHoc[index];
        if (
          lesson.maLoaiBaiHoc === "VIDEO_FPT" &&
          lesson.xemDemo &&
          lesson.id !== currentLesson.id
        ) {
          dispatch(setCurrentLesson(tatCaBaiHoc[index]));
          return;
        }
      }
    }

    let nextLessonIndex = currentLessonIndex + 1;

    !checkDemoUser() &&
      dispatch(setCurrentLesson(tatCaBaiHoc[nextLessonIndex]));
  };

  let index_lesson = baiDaHoc.findIndex(
    (item) => item.baiHocId === currentLesson.id
  );

  let isDaHoc = index_lesson !== -1 ? true : false;
  if (checkDemoUser()) {
    userInfor.nuocNgoai = localStorageServ.nuocngoaiDemo.get() * 1;
  }

  const renderVideoContent = () => {
    if (!userInfor.nuocNgoai) {
      return (
        <FPTPlayer
          source={urlVideo}
          setIsDisableHoanThanh={seIsDisableHoanThanh}
        />
      );
    } else {
      if (currentLesson.video * 1 == 0) {
        return (
          <FPTPlayer
            source={urlVideo}
            setIsDisableHoanThanh={seIsDisableHoanThanh}
          />
        );
      } else {
        return (
          // <ReactPlayer
          //   playbackRate={1}
          //   width="100%"
          //   height="100%"
          //   controls={true}
          //   url={`https://vimeo.com/${currentLesson.video}`}
          // />
          <FPTPlayer
            source={`https://vimeo.com/${currentLesson.video}`}
            setIsDisableHoanThanh={seIsDisableHoanThanh}
          />
        );
      }
    }
  };

  return (
    <Content className="w-full h-max-content space-y-3   flex-shrink-0 relative overflow-hidden flex flex-col justify-start">
      <div className="w-full  card_theme rounded border-none">
        <div
          style={{ height: isSiderDetailKhoaHocOpen ? "66vh" : "85vh" }}
          className="water-mark-wrapper "
        >
          {renderVideoContent()}
        </div>
        <div className="w-full   flex items-start justify-between py-1 p-3">
          <div>
            {currentLesson.ghiChu ? (
              <CollapseGhiChu data={currentLesson.ghiChu} />
            ) : (
              ""
            )}
          </div>

          <div className="w-max uppercase transform lg:scale-150 -translate-x-3 lg:-translate-x-7 flex-shrink-0 flex items-center my-2">
            {
              isDaHoc ? (
                <p className="font-medium text-color-blue-white">
                  <i className="fa fa-check mr-2 text-sm flex-shrink-0 text-green-600"></i>{" "}
                  Đã hoàn thành
                </p>
              )
                : isDisableHoanThanh ? (
                  <Tooltip
                    placement="topLeft"
                    title="Bạn cần xem tiếp để hoàn thành"
                    arrowPointAtCenter
                    defaultVisible={false}
                  >
                    <Checkbox
                      disabled={isDisableHoanThanh}
                      checked={false}
                      className="font-medium text-color-blue-white "
                    >
                      {" "}
                      Hoàn thành
                    </Checkbox>
                  </Tooltip>
                ) : (
                  <Checkbox
                    disabled={isDisableHoanThanh}
                    checked={false}
                    className="font-medium text-color-blue-white"
                    onChange={handleNextLesson}
                  >
                    {" "}
                    Hoàn thành
                  </Checkbox>
                )}
          </div>
        </div>
      </div>

      <TabDetailBaiHoc />
    </Content>
  );
});
export default ContentVideo_DetailKhoaHoc;
