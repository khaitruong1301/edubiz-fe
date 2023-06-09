import React, { useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import CardLoTrinh from "./CardLoTrinh";
import CardLoTrinh_Gridview from "./CardLoTrinh_Gridview";
import { getYoursItemAciton } from "../../redux/reducer/dashboardReducer";
export default function TatCaLoTrinh({ isGridView }) {
  const refs = useRef([]);
  const dispatch = useDispatch();
  const { userInfor } = useSelector((state) => state.authUser);

  const { tatCaLoTrinh, currentActiveTypeFilter } = useSelector(
    (state) => state.loTrinh
  );
  useEffect(() => {
    dispatch(getYoursItemAciton(userInfor.id));
  }, []);
  let listLoTrinh =
    currentActiveTypeFilter === "all"
      ? tatCaLoTrinh
      : tatCaLoTrinh.filter((loTrinh) => {
        return loTrinh.loaiLoTrinh.includes(currentActiveTypeFilter);
      });
  return (
    <>
      {isGridView ? (
        <div className="container mx-auto text-color-title mt-10 flex items-centers justify-center">
          <div className="flex justify-center gap-20 w-max h-max-content flex-wrap ">
            {listLoTrinh?.map((item, index) => {
              return (
                <CardLoTrinh_Gridview
                  ref_Props={(element) => {
                    refs.current[index] = element;
                  }}
                  btn_tuVan={!item.daDangKy}

                  title={item.title}
                  key={index}
                  loTrinh={item}
                  isBlackFridayDay={true}

                ></CardLoTrinh_Gridview>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="lg:w-full xl:container xl:px-10  mx-auto text-color-title mt-10 ">
          <div className="flex justify-center flex-wrap  w-full ">
            {listLoTrinh?.map((item, index) => {
              return (
                <CardLoTrinh
                  ref_Props={(element) => {
                    refs.current[index] = element;
                  }}
                  btn_tuVan={true}

                  title={item.title}
                  key={index}
                  loTrinh={item}
                  isBlackFridayDay={true}
                ></CardLoTrinh>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
