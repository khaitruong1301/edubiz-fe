import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CarouselShopItem.css";
import Item_Game from "../Item_Game/Item_Game";
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

export default function CarouselYourtems({ yourItems }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };

  let ArrSide = chunk(yourItems, 4);
  return (
    <div className="w-full h-full rounded-lg overflow-hidden   flex items-center shopItemCarousel border-none ">
      <Slider
        {...settings}
        className="w-full h-full flex items-center justify-items-center  "
      >
        {yourItems.length > 0 ? (
          ArrSide.map((slide) => {
            return (
              <div className=" flex justify-center items-center h-full flex-wrap  border-none my-auto w-full flex-grow gap-2 gap-x-2 ">
                {slide.map((item) => {
                  return <Item_Game item={item} canBuyItem={false} />;
                })}
              </div>
            );
          })
        ) : (
          <p className="p-3 text-color-content text-base mt-5">
            Bạn chưa có vật phẩm nào, hãy học tập thật tốt & rèn luyện thật
            nhiều để đổi lấy các vật phẩm bạn nhé! Hoặc tham khảo các Vật Phẩm
            bên Cửa Hàng nè!
          </p>
        )}
      </Slider>
    </div>
  );
}
