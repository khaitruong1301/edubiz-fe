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
              E-learning Gaminification
            </p>
            <p className="text-dark text-sm lg:text-base">
              Tính năng độc đáo nhất E-learning Gaminification tại CyberLearn
              đầu tiên trên thế giới dành cho mảng lập trình sử dụng các yếu tố
              chơi trò chơi trong trải nghiệm học tập, đây là công cụ mạnh mẽ để
              truyền cảm hứng cho người học, thử thách bản thân. Bạn sẽ có rất
              nhiều Động lực bởi vì bạn được tặng Huy Chương, Huy hiệu, Level,
              Giải thưởng với rất nhiều thách thức để bạn tiếp tục tiến lên, bạn
              có động lực để cải thiện đánh bại đối thủ cạnh tranh trong bảng
              xếp hạng học tập. Hệ thống kích thích não bộ của bạn để bạn học
              tập tập trung và phát triển tốt nhất.
            </p>
          </div>

          <div className="w-2/5 lg:w-1/2 flex justify-center items-center flex-shrink-0 ">
            <Lottie loop={false} animationData={img5} style={{ width: "100%", height: 400 }} />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-center  h-full   overflow-hidden relative rounded-xl ">
        <div
          className="div w-full h-60 lg:h-90 flex rounded-xl   overflow-hidden"
          style={{ background: arrBackgoundCarousel[0], height: "500px" }}
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
            <Lottie
              animationData={coder_bg2}
              style={{ width: 700, height: 700 }}
            />
          </div>
        </div>
      </div> */}
      <div className="w-full flex justify-center  h-full   overflow-hidden relative rounded-xl ">
        <div
          className="div w-full flex h-60 lg:h-90"
          style={{ background: arrBackgoundCarousel[1] }}
        >
          <div className="w-1/2 p-5 lg:p-7 space-y-2 lg:space-y-7">
            <p className="text-blue-theme text-xl lg:text-2xl font-medium">
              Tương tác thảo luận cùng Mentor và Giảng viên
            </p>
            <p className="text-dark text-sm lg:text-base">
              Tương tác học tập qua phần thảo luận cùng Mentor và giảng viên. Hệ
              thống sẽ chấm điểm tương tác để giúp các học viên tăng cường kỹ
              năng hỗ trợ lẫn nhau.
            </p>
          </div>

          <div className="w-1/2 flex justify-center items-center ">
            <img src={img3} className="w-full" />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center  h-full   overflow-hidden relative rounded-xl ">
        <div
          className="div w-full flex h-60 lg:h-90"
          style={{ background: arrBackgoundCarousel[2] }}
        >
          <div className="w-1/2 p-5 lg:p-7 space-y-2 lg:space-y-7">
            <p className="text-blue-theme text-xl lg:text-2xl font-medium">
              Cung cấp chứng nhận và bảng điểm
            </p>
            <p className="text-dark text-sm lg:text-base">
              Đối với các lộ trình nghề chuyên sâu, sau khi bạn hoàn thành tất
              cả bài tập và dự án, chúng tôi sẽ chấm bài và có thể vấn đáp trực
              tuyến để review các phần bạn đã thực hiện, nếu đạt các tiêu chí
              chúng tôi đưa ra, bạn sẽ được cấp chứng nhận trực tuyến.
            </p>
          </div>

          <div className="w-1/2 flex justify-center items-center ">
            <img src={img4} className="w-full" />

          </div>
        </div>
      </div>
    </Slider>
  );
}
export default CarouselLoTrinh = memo(CarouselLoTrinh)
