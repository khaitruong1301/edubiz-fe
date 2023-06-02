import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentTabLoTrinh } from "../redux/reducer/layoutReducer";
import { LO_TRINH_CUA_BAN_TAB, TAT_CA_LO_TRINH_TAB, LO_TRINH_DA_HOAN_THANH_TAB } from "../utils/Constant";
import { checkDemoUser } from "../utils/HocDemoUtils";
export default function MenuLoTrinh({ setIsAllLoTrinh }) {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    checkDemoUser() && setActiveIndex(1);
    checkDemoUser() && setActiveIndex(1);
  }, []);

  return (
    <div className=" h-max-content w-full overflow-hidden">
      <div className="relative flex space-x-0 text-white w-max rounded-l-3xl rounded-r-3xl  bottom-0 left-0 border-b-0 border-r-0 border-l-0  border-0 overflow-hidden ">
        {
          !checkDemoUser() ? (
            <div
              className={
                activeIndex == 0
                  ? "hover:text-current w-36 lg:w-40 text-white block"
                  : "hover:text-current w-36 lg:w-40 te block"
              }
              style={{ width: '13rem !important'}}
            >
              <button
                onClick={() => {
                  setActiveIndex(0);
                  dispatch(setCurrentTabLoTrinh(LO_TRINH_CUA_BAN_TAB));
                }}
                className="w-full text-base font-medium text-center  px-2 lg:px-3 py-2"
              >
                Đang thực hiện
              </button>
            </div>
          ) : (
            ""
          )
        }

        <div
          className={
            activeIndex == 1
              ? "hover:text-current w-36 lg:w-40 text-white block"
              : "hover:text-current w-36 lg:w-40 te block"
          }
          style={{ width: '13rem !important'}}
        >
          <button
            onClick={() => {
              setActiveIndex(1);
              dispatch(setCurrentTabLoTrinh(TAT_CA_LO_TRINH_TAB));
            }}
            className="w-full text-base font-medium  px-2 lg:px-3 py-2 text-center"
          >
            Tất cả lộ trình
          </button>
        </div>

        <div
          className={
            activeIndex == 1
              ? "hover:text-current w-36 lg:w-40 text-white block"
              : "hover:text-current w-36 lg:w-40 te block"
          }
          style={{ width: '13rem !important'}}
        >
          <button
            onClick={() => {
              setActiveIndex(2);
              dispatch(setCurrentTabLoTrinh(LO_TRINH_DA_HOAN_THANH_TAB));
            }}
            className="w-full text-base font-medium  px-2 lg:px-3 py-2 text-center"
          >
            Đã hoàn thành
          </button>
        </div>

        {
          !checkDemoUser() ?
            (
              <div
                style={{
                  zIndex: -1,
                  transform: `translateX(${activeIndex * 100}%)`,
                }}
                className="absolute left-0 top-0 w-36 lg:w-40 h-full  btn-theme rounded-l-3xl rounded-r-3xl  transition ease-out duration-200"
              ></div>
            ) :
            (
              <div
                style={{
                  zIndex: -1,
                }}
                className="absolute left-0 top-0 w-36 lg:w-40 h-full  btn-theme rounded-l-3xl rounded-r-3xl  transition ease-out duration-200"
              ></div>
            )
        }
        <div
          style={{ zIndex: -2 }}
          className="absolute left-0 top-0 w-full h-full  btn-theme opacity-50"
        ></div>
      </div>
    </div>
  );
}
