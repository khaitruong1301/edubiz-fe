import React, { useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselShopItem.css";
import Item_Game from "../Item_Game/Item_Game";
import { useContainerDimensions } from "../../hook/useContainerDemension";
function chunk(array, size) {
  const chunkedArray = [];
  for (let i = 0; i < array.length; i++) {
    const last = chunkedArray[chunkedArray.length - 1];
    if (!last || last.length === size) {
      chunkedArray.push([array[i]]);
    } else {
      last.push(array[i]);
    }
  }
  return chunkedArray;
}

export default function CarouselAllItems({ allItems }) {
  const componentRef = useRef();
  const demensions = useContainerDimensions(componentRef);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  let ArrSide = chunk(allItems, demensions.width > 430 ? 6 : 4);
  return (
    <div
      ref={componentRef}
      className="w-full h-full rounded-lg overflow-hidden shopItemCarousel  "
    >
      <Slider {...settings} className="w-full h-full ">
        {ArrSide.map((slide) => {
          return (
            <div className=" grid grid-rows-2   grid-flow-col gap-4 h-full flex-wrap  border-none my-auto w-full flex-grow gap-y-2 ">
              {slide.map((item) => {
                return <Item_Game item={item} canBuyItem={true} />;
              })}
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
