import React, { memo } from "react";
import Lottie from "lottie-react";
import img3 from "../../assets/imgCarouselLotrinh/imgCarouselLoTrinh1.png";
import img4 from "../../assets/imgCarouselLotrinh/imgCarousel2.png";
import img5 from "../../assets/lottie_lotrinh/img5.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./carouselLotrinh.css";
import { arrBackgoundCarousel } from "../../utils/GenerateArrBackgoundCarousel";
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 10000,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: true,
};
function CarouselLoTrinh() {
  return (
    <Slider {...settings} className="w-full h-60 lg:h-90  carouselLotrinh  relative">
      <div className="w-full flex justify-center  h-full   overflow-hidden relative rounded-xl ">
        <div
          className="div w-full flex h-60 lg:h-90  "
          style={{ background: arrBackgoundCarousel[3] }}
        >
          <div className="flex-grow lg:w-1/2 p-5 lg:p-7 space-y-2 lg:space-y-7">
            <p className="text-blue-theme text-xl lg:text-2xl font-medium">
              Hệ thống đào tạo Di Động Việt
            </p>
            <p className="text-dark text-sm lg:text-base">
              Nơi tiếp cận các thông tin trực tuyến bao gồm ( KIẾN THỨC, KỸ NĂNG, NGHIỆP VỤ, THÔNG TIN TRUYỀN THÔNG...) phục vụ cho công việc của các bạn.
              <br />
              Chủ động sắp xếp thời gian để tham gia các buổi đào tạo/ lộ trình hoàn thiện năng lực cá nhân.
              <br />
              Quản lý tổng hợp lưu trữ cơ sở dữ liệu thông tin để các bạn tiếp cận nhanh chóng khi cần.
              <br />
              Ghi nhận lộ trình học tập và thành tích của cá nhân.
            </p>
          </div>

          <div className="w-2/5 lg:w-1/2 flex justify-center items-center flex-shrink-0 ">
            <Lottie loop={false} animationData={img5} style={{ width: "100%", height: 400 }} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center  h-full   overflow-hidden relative rounded-xl ">
        <div
          className="div w-full flex h-60 lg:h-90"
          style={{ background: arrBackgoundCarousel[1] }}
        >
          <div className="w-1/2 p-5 lg:p-7 space-y-2 lg:space-y-7">
            <p className="text-blue-theme text-xl lg:text-2xl font-medium">
              Học trực tuyến mọi lúc mọi nơi
            </p>
            <p className="text-dark text-sm lg:text-base">
              Hệ thống cho phép bạn học online mọi lúc bạn rãnh, vào bất cứ giờ
              nào bạn muốn và mọi nơi, rất linh động tùy theo nhu cầu của bạn.
            </p>
          </div>

          <div className="w-1/2 flex justify-center items-center ">
            <img src={img3} className="w-full" />
          </div>
        </div>
      </div>
    </Slider>
  );
}
export default CarouselLoTrinh = memo(CarouselLoTrinh)
