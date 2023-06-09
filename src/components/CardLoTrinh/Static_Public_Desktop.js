import React from "react";
import { VC } from "../../utils/Constant";
import GetGameItem from "../../utils/GetGameItem";
import { checkDemoUser } from "../../utils/HocDemoUtils";
// import Registed_Users_Bar from "../Registed_Users_Bar/Registed_Users_Bar";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from 'antd'
import httpServ from "../../services/http.service";
import { setCapNhatDanhSachLoTrinh } from "../../redux/reducer/loTrinhReducer";

function Static_Public_Desktop({ loTrinhPublic, isBlackFridayDay = false }) {
  let loTrinh = loTrinhPublic;
  let isDemoMode = checkDemoUser() || isBlackFridayDay;
  let widthItem = isDemoMode ? "w-1/4" : "w-1/5";

  let textTitle = "font-medium text-base lg:text-lg text-color-title";
  let textNumber = "font-bold text-lg lg:text-2xl text-color-title";

  const dispatch = useDispatch();
  const { userInfor } = useSelector((state) => state.authUser);
  const { tatCaLoTrinh, currentActiveTypeFilter } = useSelector((state) => state.loTrinh);

  const handleRegister = () => {
    let ngayBatDau = new Date();
    let ngayKetThuc = new Date();
    ngayKetThuc.setMonth(ngayBatDau.getMonth() + loTrinh.thoiHan);

    const model = {
      maNguoiDung: userInfor.id,
      maLoTrinh: loTrinh.id,
      ngayBatDau: ngayBatDau,
      ngayKetThuc: ngayKetThuc
    }

    Modal.confirm({
      title: 'Ghi danh lộ trình',
      content: 'Bạn chắc chắn muốn ghi danh vào lộ trình này?',
      okText: 'Ghi danh',
      onOk: () => {
        const dsTatCaLoTrinh = tatCaLoTrinh.filter(x => x.id != loTrinh.id);
        httpServ.ghiDanhLoTrinh(model)
          .then(res => {
            dispatch(setCapNhatDanhSachLoTrinh({ tatCaLoTrinh: dsTatCaLoTrinh }));
            alert.show('Ghi danh thành công, vui lòng chờ duyệt!')
          })
          .catch(err => console.log(err));
      }
    });
  }

  return (
    <div className="w-full h-full flex flex-col  card_theme md:p-2 lg:p-3 relative">
      <div className="flex absolute w-max space-x-4 lef -top-5 right-3">
        {!isDemoMode ? <GetGameItem types={[VC]} size="12" /> : ""}
      </div>
      <div className="w-full p-1 lg:p-3 h-5/6 lg:h-full flex   items-center justify-between space-x-3 lg:space-x-5 ">
        <div
          className={
            "flex  px-3   items-center flex-col justify-between md:h-40 lg:h-44 p-5 bg-purple-theme rounded-xl bg-opacity-25 " +
            widthItem
          }
        >
          <div className="w-12 h-12 flex justify-center items-center bg-purple-theme rounded-2xl bg-opacity-50 border-purple-theme">
            <div className="w-11/12 h-11/12 flex-shrink-0 flex justify-center items-center bg-purple-theme rounded-2xl  ">
              <i className="fa fa-book text-xl text-white "></i>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className={textTitle}>Khoá học</p>
            <span className={textNumber}>{loTrinh.tongKhoa}</span>
          </div>
        </div>
        <div
          className={
            "flex  px-3   items-center flex-col justify-between md:h-40 lg:h-44 p-5 bg-green-mint-theme rounded-xl bg-opacity-25 " +
            widthItem
          }
        >
          <div className="w-12 h-12 flex justify-center items-center bg-green-mint-theme rounded-2xl bg-opacity-50 border-green-minbg-green-mint-theme">
            <div className="w-11/12 h-11/12 flex-shrink-0 flex justify-center items-center bg-green-mint-theme rounded-2xl  ">
              <i className="fab fa-leanpub text-xl text-white "></i>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className={textTitle}> Bài học</p>
            <span className={textNumber}>{loTrinh.tongBaiHoc}</span>
          </div>
        </div>

        <div
          className={
            "flex  px-3   items-center flex-col justify-between md:h-40 lg:h-44 p-5 bg-pink-theme rounded-xl bg-opacity-25 " +
            widthItem
          }
        >
          <div className="w-12 h-12 flex justify-center items-center bg-pink-theme rounded-2xl bg-opacity-50 border-green-minbg-pink-theme">
            <div className="w-11/12 h-11/12 flex-shrink-0 flex justify-center items-center bg-pink-theme rounded-2xl  ">
              <i className="fa fa-clock text-xl text-white "></i>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className={textTitle}> Phút video</p>
            <span className={textNumber}>{loTrinh.tongPhut}</span>
          </div>
        </div>

        {!isDemoMode ? (
          <>
            {" "}
            <div
              className={
                "flex  px-3   items-center flex-col justify-between md:h-40 lg:h-44 p-5 bg-yellow-theme rounded-xl bg-opacity-25 " +
                widthItem
              }
            >
              <div className="w-12 h-12 flex justify-center items-center bg-yellow-theme rounded-2xl bg-opacity-50 border-yellow-theme">
                <div className="w-11/12 h-11/12 flex-shrink-0 flex justify-center items-center bg-yellow-theme rounded-2xl  ">
                  <i className="fa fa-dumbbell text-xl text-white "></i>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className={textTitle}>Bài tập</p>
                <span className={textNumber}>{loTrinh.tongBaiTapNop}</span>
              </div>
            </div>
            <div
              className={
                "flex  px-3   items-center flex-col justify-between md:h-40 lg:h-44 p-5 bg-green-mint-theme rounded-xl bg-opacity-25 " +
                widthItem
              }
            >
              <div className="w-12 h-12 flex justify-center items-center  rounded-2xl bg-opacity-50 border-green-min bg-green-mint-theme">
                <div className="w-11/12 h-11/12 flex-shrink-0 flex justify-center items-center bg-green-mint-theme rounded-2xl  ">
                  <i className="fa fa-question text-xl text-white "></i>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className={textTitle}>Trắc nghiệm</p>
                <span className={textNumber}>{loTrinh.tongTracNghiem}</span>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="flex space-x-5 items-center justify-end  mb-8">
        {/* <p className=" text-base lg:text-lg text-color-title w-max flex-shrink-0">
          Học viên đã đăng kí
        </p>
        <Registed_Users_Bar
          dsAvatar={loTrinh.dsAvatar}
          totalUser={loTrinh.tongHocVien}
        /> */}
        <div onClick={(handleRegister)} className=" btn-theme text-white text-base lg:text-lg font-medium lg:font-bold md:px-3 lg:px-7 p-2  rounded leading-10 flex-shrink-0  shadow_designCode ">
          Đăng kí
        </div>
      </div>
    </div>
  );
}

export default Static_Public_Desktop = React.memo(Static_Public_Desktop);
