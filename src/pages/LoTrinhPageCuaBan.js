import React, { useRef, useState } from "react";
import CardLoTrinh from "../components/CardLoTrinh/CardLoTrinh";
import CardLoTrinh_Gridview from "../components/CardLoTrinh/CardLoTrinh_Gridview";
import { useSelector } from "react-redux";
export default function LoTrinhPageCuaBan({ isGridView }) {
  const refs = useRef([]);
  let loTrinhDaDangKi = useSelector((state) => state.loTrinh.loTrinhDaDangKi);
  loTrinhDaDangKi = loTrinhDaDangKi.filter(x => !x.daHoanThanh);
  loTrinhDaDangKi = loTrinhDaDangKi.filter(x => x.choDuyet);
  
  return (
    <>
      {isGridView ? (
        <div className=" lg:w-5/6    mx-auto text-color-title mt-10 flex items-centers justify-center">
          <div className="flex justify-center gap-20 w-max h-max-content flex-wrap ">
            {loTrinhDaDangKi?.map((item, index) => {
              return (
                <CardLoTrinh_Gridview
                  ref_Props={(element) => {
                    refs.current[index] = element;
                  }}
                  btn_tuVan={!item.daDangKy}

                  title={item.title}
                  key={index}
                  loTrinh={item}
                ></CardLoTrinh_Gridview>
              );
            })}
          </div>
        </div>
      ) : (
        <div className=" lg:w-full  xl:container mx-auto text-color-title mt-10">
          <div className="flex justify-center flex-wrap ">
            {loTrinhDaDangKi?.map((item, index) => {
              return (
                <CardLoTrinh
                  ref_Props={(element) => {
                    refs.current[index] = element;
                  }}

                  title={item.title}
                  key={index}
                  loTrinh={item}
                ></CardLoTrinh>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
