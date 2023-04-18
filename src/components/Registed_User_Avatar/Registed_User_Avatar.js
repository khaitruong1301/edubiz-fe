import React from "react";
import LazyLoad from "react-lazyload";
export default function Registed_User_Avatar({ src_img }) {
  return (
    <LazyLoad once={true} >
      <div className="h-7 lg:h-8 w-7 lg:w-8 rounded-full  border-2 border-green-theme">
        <img
          src={src_img}
          alt=""
          className="w-full h-full m-0 block rounded-full object-cover border-1 border-white"
        />
      </div>
    </LazyLoad>
  );
}
