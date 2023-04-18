import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentActiveTypeFilter } from "../../redux/reducer/loTrinhReducer";

const TagFilterArr = [
  "Tất cả",
  "Tư duy lập trình",
  "Front-End từ Zero",
  "Full-Stack từ Zero",
  "Front-End chuyên nghiệp",
  "Back-End chuyên nghiệp",
  "Mobile từ Zero",
  // "Data Science",
];
export default function Menu_Filter_LoTrinh() {
  const dispatch = useDispatch();
  let TagFilterArr = [{ id: "all", tenLoai: "Tất cả" }];

  let TagFilterArrRedux = useSelector((state) => state.loTrinh.typeFilters);
  let currentActiveTypeFilter = useSelector(
    (state) => state.loTrinh.currentActiveTypeFilter
  );
  TagFilterArr = [...TagFilterArr, ...TagFilterArrRedux];
  return (
    <div
      data-tour="loTrinh-step1"
      className="flex items-center  content-start xl:justify-between md:space-x-2  bg-white max flex-wrap mt-5 rounded-xl p-1  xl:rounded-l-full xl:rounded-r-full overflow-hidden mb-10"
    >
      {TagFilterArr.map((tag) => {
        if (tag.id == currentActiveTypeFilter)
          return (
            <button
              style={{ minWidth: 80 }}
              className="transition duration-500  w-max rounded-l-full rounded-r-full  btn-theme h-10 leading-10 px-2 text-base   text-white"
            >
              {tag.tenLoai}
            </button>
          );
        return (
          <button
            onClick={() => {
              dispatch(setCurrentActiveTypeFilter(tag.id));
            }}
            style={{ minWidth: 80 }}
            className="w-max text-blue-theme h-10 leading-10 px-2 text-base   bg-white"
          >
            {tag.tenLoai}
          </button>
        );
      })}
    </div>
  );
}
