import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { iconVatPham } from "../../assets/icons";
import {
  getYoursItemAciton,
  setAllItem,
} from "../../redux/reducer/dashboardReducer";
import httpServ from "../../services/http.service";
import Dialog_Item from "../Dialog_Item/Dialog_Item";
import CarouselAllItems from "./CarouselAllItems";
import CarouselYourtems from "./CarouselYourItems";

export default function Shop_Item() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [canBuyItem, setCanBuyItem] = useState();
  const btnClass = {
    btn_AllItems: activeIndex === 0 ? "text-blue-theme" : "text-white",
    btn_yourItems: activeIndex === 1 ? "text-blue-theme" : "text-white",
  };
  const dispatch = useDispatch();
  const { allItems } = useSelector((state) => state.dashboard);
  const { yourItems } = useSelector((state) => state.dashboard);
  const { userInfor } = useSelector((state) => state.authUser);
  const handleCloseDialog = () => {
    setIsModalVisible(false);
  };
  const handleFetchAllItems = () => {
    httpServ
      .getAllItems(false)
      .then((res) => {
        dispatch(setAllItem(res.data.content));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFetchYourItems = () => {
    dispatch(getYoursItemAciton(userInfor.id));
  };

  useEffect(() => {
    handleFetchYourItems();
  }, []);
  return (
    <div
      className={`flex flex-col h-full w-full card_theme_mobile card_theme items-center`}
      data-tour="db-step-2"
    >
      <Dialog_Item
        isModalVisible={isModalVisible}
        handleCloseDialog={handleCloseDialog}
        canBuyItem={canBuyItem}
      />
      <div className="flex w-max my-1  flex-shrink-0  p-1 btn-theme rounded-xl ">
        <div className="flex w-max   flex-shrink-0  btn-theme rounded-xl relative">
          <button
            onClick={() => {
              setActiveIndex(0);
              handleFetchYourItems();
            }}
            className={
              "p-1 w-24 lg:w-32 rounded-xl font-medium   z-10 relative duration-500 " +
              btnClass.btn_AllItems
            }
          >
            {iconVatPham} Vật phẩm{" "}
          </button>
          <button
            onClick={() => {
              setActiveIndex(1);
              handleFetchAllItems();
            }}
            className={
              "p-1 w-24 lg:w-32 rounded-xl font-medium   z-10 relative duration-500 " +
              btnClass.btn_yourItems
            }
          >
            <i className="fa fa-shopping-cart"></i> Cửa hàng{" "}
          </button>
          <span
            style={{
              zIndex: 1,
              transform: `translateX(${activeIndex * 100}%)`,
            }}
            className="absolute left-0 top-0 w-24 lg:w-32 h-full  bg-white rounded-xl  transition ease-out duration-500 "
          ></span>
        </div>
      </div>
      <div className="  flex justify-center items-center flex-wrap  border-none h-full w-full p-1 ">
        {activeIndex === 0 ? (
          <CarouselYourtems yourItems={yourItems} />
        ) : (
          <CarouselAllItems allItems={allItems} />
        )}
      </div>
    </div>
  );
}
