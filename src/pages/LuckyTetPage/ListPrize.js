import React from "react";
import { segments } from "./segmentArr";
import TagPrize from "./tagPrize";

export default function ListPrize() {
  return (
    <div>
      <div className="flex justify-center space-x-2 flex-wrap ">
        {segments.map((item) => {
          return <TagPrize stt={item.label} value={item.value} />;
        })}
      </div>
      <p className="text-center font-medium text-red-600 md:text-xl ">
        EXTRA: GIẢM THÊM 1.100.000 đ nếu đăng kí từ 2 người hoặc 2 combo trở lên
      </p>
    </div>
  );
}
