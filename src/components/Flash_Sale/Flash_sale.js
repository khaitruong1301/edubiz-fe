import React from "react";
import "./Flash_sale.css";
import Countdown from "react-countdown";
export default function Flash_sale() {
  const rendererTimer = ({ days, hours, minutes, seconds }) => {
    return (
      <span>
        {/* {days} ngày {hours} giờ {minutes} phút {seconds} giây */}
        {days} ngày {hours} giờ {minutes} phút
      </span>
    );
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div
        style={{
          background: "linear-gradient(105.48deg, #f8de8e 1.36%, #ffc40a 100%)",
        }}
        className="w-full h-full relative flex justify-center overflow-hidden"
      >
        <div className=" ">
          <div className="absolute left-1/3 -translate-x-1/2  top-1/2 transform -translate-y-1/2  flash_sale_line_left h-3  w-96 ">
            <div className="w-6 h-60 bg-yellow-500 absolute bottom-48 -left-2"></div>
            <div className="w-3 h-60  bg-yellow-600 absolute bottom-12 -left-10 "></div>
          </div>

          <div className="h-full flex flex-col justify-center space-y-1 lg:space-y-1 bg-transparent relative z-10 ">
            {/* <p className="text-color-title-theme text-center text font-medium text-sm lg:text-base xl:text-lg bg-transparent">
              TẤT NIÊN 2021 - DEAL SIÊU XỊN * Giảm đến 60% tất cả khóa học tại
              CyberLearn.vn * Giảm đến 4TR cho các khóa học tại CyberSoft -
              CyberLab
              <button>
                <a
                  target="_blank"
                  className="text-blue-theme  hover:text-red-500  font-medium"
                  href="https://login.cyberlearn.vn/blackfriday"
                >
                  TẠI ĐÂY
                </a>
              </button>
            </p> */}
            <a
              target="_blank"
              className="text-color-title-theme
              text-center text font-medium text-sm lg:text-base xl:text-base hover:text-blue-theme
              bg-transparent"
              href="https://login.cyberlearn.vn/blackfriday"
            >
              <p>TẤT NIÊN 2021 - DEAL SIÊU XỊN </p>
              <p>
                * Giảm đến 60% tất cả khóa học tại CyberLearn.vn * Giảm đến 4TR
                cho các khóa học tại CyberSoft - CyberLab
              </p>
            </a>
            <div className="text-white flex items-center justify-center  space-x-2 h-5 xl:h-6">
              <span className="font-mediumn text-color-title-theme">
                {" "}
                Ưu đãi sẽ kết thúc trong
              </span>{" "}
              <div className="rounded-lg bg-white text-color-title-theme flex items-center  px-2  h-full cursor-pointer hover:text-blue-theme transition duration-100 ">
                <a
                  target="_blank"
                  className="text-blue-theme cursor-pointer space-x-2 "
                  href="https://login.cyberlearn.vn/blackfriday"
                >
                  <span className=" font-medium md:text-base xl:text-lg">
                    {" "}
                    <Countdown date={1641045600000} renderer={rendererTimer} />
                  </span>{" "}
                  <i className="fa fa-chevron-right hover:text-blue-theme "></i>{" "}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute right-1/3 top-1/2 transform -translate-y-1/2 translate-x-1/2   flash_sale_line_right   h-3 w-96">
            <div className="w-3 h-60 bg-yellow-500 absolute top-12 -right-2"></div>
            <div className="w-6 h-60  bg-yellow-600 absolute top-36 -right-12 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}
