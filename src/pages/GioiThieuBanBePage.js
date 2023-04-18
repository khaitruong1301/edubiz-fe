import Lottie from "lottie-react";
import React from "react";
import imgSpeaker from "../assets/lottie_json/47322-alert.json";
import gift_lottie from "../assets/lottie_json/gift-lottie.json";
import Table_GioiThieuBanBe from "../components/Table_GioiThieuBanBe/Table_GioiThieuBanBe";

export default function GioiThieuBanBePage() {
  return (
    <div className="w-full h-full p-3  flex flex-col flex-grow">
      <div className="w-full card_theme flex-grow p-10">
        <p className="text-3xl text-color-title mb-10">THÊM BẠN THÊM QUÀ</p>
        <div className="w-full flex items-center space-x-10 h-max-content">
          <div className="w-1/2  h-full relative">
            <div className="w-full h-max  ">
              <Lottie
                animationData={imgSpeaker}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </div>
          <div className="w-1/2 flex flex-col items-start space-y-5 justify-start huf">
            <div className="w-full flex justify-center text-center items-center space-x-2">
              <p className="font-medium text-2xl ">
                Giới thiệu bạn bè, nhận Ưu Đãi ngay
              </p>
              <div className="w-24 h-24 ">
                <Lottie
                  animationData={gift_lottie}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
            <p className="font-medium text-xl ">
              Với mỗi lượt giới thiệu đăng kí lộ trình lần đầu thành công bạn sẽ
              nhận được xxx coin
            </p>
            <div className="w-full h-16 flex rounded-xl overflow-hidden">
              <div className="flex-grow h-full card_theme border-none shadow font-medium  flex items-center p-3 rounded-none">
                <p className=" text-color-content p-0 m-0  text-xl">
                  https://cyberlearnreferralCode=tranquangsigl-qZ6MRLJBvGp
                </p>
              </div>

              <button className="w-20 text-lg  h-full flex-shrink-0 px-3 text-white font-bold btn-theme ">
                Copy
              </button>
            </div>
            <p className="text-sm font-medium text-red-500">
              Không giới hạn số lần nhận thưởng, giới thiệu càng nhiều nhận càng
              nhiều ưu đãi
            </p>
            <div className="w-full space-y-2 ">
              <p className="font-medium text-2xl">Giới thiệu bằng cách nào?</p>
              <p className>Bước 1: Chia sẽ mã giới thiệu của bạn với bạn bè</p>
              <p className>
                Bước 2: Bạn bè của bạn đăng kí lộ trình lần đầu tại CyberLearn
                và nhập mã giới thiệu của bạn
              </p>
              <p className>
                Bước 3: Nhận thưởng coin sau khi bạn bè đăng kí lộ trình đầu
                tiên thành công
              </p>
            </div>
          </div>
        </div>
        <div className="w-full mt-10 space-y-5">
          <p className="font-medium text-2xl">
            Danh sách giới thiệu bạn bè thành công
          </p>
          <div className="w-full">
            <Table_GioiThieuBanBe />
          </div>
        </div>
      </div>
    </div>
  );
}
// https://assets8.lottiefiles.com/packages/lf20_BB6RdX.json
