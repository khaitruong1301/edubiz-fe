import React from "react";
import CircleProgress from "../Progress/CircleProgress";
export default function Static_User_Dashboard() {
  return (
    <div className="w-full flex justify-between space-x-3">
      <div className="flex h-28 w-1/3 card_theme p-2 items-centerspace-x-5">
        <CircleProgress width={90} strokeColor="#035397" />
        <div className="flex flex-col justify-center space-y-3 pl-3 ">
          <p className="text-lg">Số lượng phút đã học</p>
          <p>87/234</p>
        </div>
      </div>
      <div className="flex h-28 w-1/3 card_theme p-2 items-centerspace-x-5">
        <CircleProgress width={90} strokeColor="#7C83FD" />
        <div className="flex flex-col justify-center space-y-3 pl-3 ">
          <p className="text-lg">Số lượng bài tập đã làm</p>
          <p>17/34</p>
        </div>
      </div>
      <div className="flex h-28 w-1/3 card_theme p-2 items-centerspace-x-5">
        <CircleProgress width={90} strokeColor="#54E346" />
        <div className="flex flex-col justify-center space-y-3 pl-3">
          <p className="text-lg">Số câu trắc nghiệm đã làm</p>
          <p>47/231</p>
        </div>
      </div>
    </div>
  );
}
