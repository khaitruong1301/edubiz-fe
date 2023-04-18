import React from 'react'
import Lottie from "lottie-react";
import upgradeLottie from '../assets/lottie_json/76555-update-app.json'
export default function Upgrade_Notify_Page() {
    return (
        <div className="w-full h-full  flex flex-col justify-center items-center space-y-10">
            <div className="w-full     md:w-4/6  ">
                <Lottie
                    loop={false}
                    animationData={upgradeLottie}
                    style={{ width: "100%", height: '100%' }}
                />
            </div>
            <p className="text-gray-900 text-center w-2/3">
                Hiện tại phiên bản này chưa hỗ trợ trên mobie, bạn hãy đăng nhập bằng máy tính hoặc tablet để sử dụng nhé
            </p>
        </div>
    )
}
