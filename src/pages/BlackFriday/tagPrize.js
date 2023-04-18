import React from 'react'
import bgCount from '../../assets/img/bg-countdown.webp'

export default function TagPrize({ stt, value }) {
    return (
        <div style={{ backgroundImage: `url(${bgCount})` }} className=" bg-no-repeat  h-10  bg-center  bg-cover w-max px-3 items-center    text-white text-center transform -skew-x-12 my-1 md:my-2 uppercase text-base flex space-x-1  "> <span className="font-medium text-base ">
            {stt}
        </span>
            <span className="font-medium text-sm ">
                {value}
            </span>
        </div>
    )
}
