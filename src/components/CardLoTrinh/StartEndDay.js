import React, { memo } from 'react'
var dayjs = require("dayjs");

export default memo(function StartEndDay({ loTrinh }) {
    return (
        <div className="text-base flex flex-col items-center">
            <div className="flex items-start justify-center  flex-col flex-shrink-0 h-max-content">
                <div className="flex space-x-1 ">
                    <p className="  w-max text-color-content text-center  text-sm font-medium lg:hidden xl:block  ">
                        Ngày bắt đầu:
                    </p>
                    <p className="font-medium text-sm lg:text-base">
                        {dayjs(loTrinh.ngayBatDau).format("DD/MM/YYYY")}
                    </p>
                </div>
                <div className="flex space-x-1 ">
                    <p className="  w-max text-color-content text-center  text-sm font-medium   lg:hidden xl:block">
                        Ngày kết thúc:
                    </p>
                    <p className="font-medium text-sm lg:text-base">
                        {dayjs(loTrinh.ngayKetThuc).format("DD/MM/YYYY")}
                    </p>
                </div>
            </div>
        </div>
    )
})
