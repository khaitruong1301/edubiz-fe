import React from "react";

const Card_Task_Deadline = React.memo(({ deadline, color }) => {
  return (
    <div
      style={{ backgroundColor: color?.bg }}
      className="w-full  p-2 pl-6 h-max-content justify-between flex flex-col relative rounded-lg"
    >
      <p className="text-gray-600">{deadline.tenKhoaHoc}</p>
      <p className="text-color-title text-base ">{deadline.tenBaiTap}</p>
      <p className="text-gray-600 font-normal">
        Deadline <span className="text-gray-800">{deadline.ngayHetHan}</span>
      </p>
      <div
        style={{ backgroundColor: color?.line }}
        className="h-4/5 w-1 left-2 top-1/2 transform absolute rounded-lg -translate-y-1/2"
      ></div>
    </div>
  );
});
export default Card_Task_Deadline;
