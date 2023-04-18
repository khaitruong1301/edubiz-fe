import { Button } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export default function HoanThanh() {
    return (
        <div className="w-full flex flex-col space-y-10 justify-center items-center p-5">

            <>
                <p className="text-lg lg:text-2xl">ĐĂNG KÝ THÀNH CÔNG</p>
                <p className="text-base md:text-lg lg:text-2xl">
                    Cảm ơn bạn đã đăng ký! CyberLearn sẽ xét duyệt hồ sơ và liên hệ sớm nhất
                    đến các hồ sơ đạt yêu cầu! Các hồ sơ đạt yêu cầu sẽ được gởi email và
                    liên lạc qua điện thoại/zalo để hướng dẫn trực tiếp cho bạn!
                </p>

                <Button
                    className={
                        "  text-white duration-150 font-bold px-8 rounded  flex items-center h-10 flex-shrink-0 border-none  focus:border-blue-theme hover:border-transparent hover:shadow-lg  btn-theme"
                    }
                // type="primary"
                >
                    <a href="https://cyberlearn.vn/"> Về trang chủ</a>
                </Button>
            </>

        </div >
    );
}
