import React, { useEffect, useMemo, useState } from "react";
import MenuLoTrinh from "../components/MenuLoTrinh";
import { icons } from "../assets/icons";
import MessengerCustomerChat from "react-messenger-customer-chat";
import LoTrinhPageCuaBan from "./LoTrinhPageCuaBan";
import TatCaLoTrinhPage from "./TatCaLoTrinhPage";
import Menu_Filter_LoTrinh from "../components/Menu/Menu_Filter_LoTrinh";
import httpServ from "../services/http.service";
import localStorageServ from "../services/locaStorage.service";
import { useDispatch, useSelector } from "react-redux";
import {
  setTypeFiltersLoTrinh,
  getLoTrinhDaDangKiAciton,
  getTatCaLoTrinhAciton,
} from "../redux/reducer/loTrinhReducer";
import { checkDemoUser } from "../utils/HocDemoUtils";
import Tour from "reactour";
import {
  stepLoTrinhCuaBanConfig,
  stepTatCaLoTrinhConfig,
} from "../tourConfig/tourConfig";
import { setUserTour } from "../redux/reducer/tourReducer";
import CarouselLoTrinh from "../components/CarouselLoTrinh/CarouselLoTrinh";
import { TAT_CA_LO_TRINH_TAB } from "../utils/Constant";
import { setCurrentTabLoTrinh } from "../redux/reducer/layoutReducer";
export default function LoTrinhPage() {
  const [isGridView, setIsGridView] = useState(false);
  let userInfor = useSelector((state) => state.authUser.userInfor);
  let { currentTabLoTrinh } = useSelector((state) => state.layout);
  let userTour = useSelector((state) => state.tour.userTour);
  let isDemoUser = useMemo(() => checkDemoUser(), [])
  useEffect(() => {
    isDemoUser && dispatch(setCurrentTabLoTrinh(TAT_CA_LO_TRINH_TAB));
    return () => {
      !isDemoUser && dispatch(setCurrentTabLoTrinh(""));
    };
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    !isDemoUser && dispatch(getLoTrinhDaDangKiAciton(userInfor?.id));
    dispatch(getTatCaLoTrinhAciton(userInfor?.id));
    httpServ.getAllTypeLoTrinh().then((res) => {
      dispatch(setTypeFiltersLoTrinh(res.data.content));
    });
  }, []);
  const renderContent = () => {
    // console.log('render')

    return (
      <div className="w-full p-3 transform translate-y-2 lg:p-5  2xl:container">
        <div className=" mx-auto text-color-title card_theme_wrapper_lotrinh card_theme_item  2xl:w-full lg:w-full">
          <div className="py-3 lg:py-5  w-full  transform px-5 h-full relative">
            <MenuLoTrinh></MenuLoTrinh>
            {/* {currentTabLoTrinh === TAT_CA_LO_TRINH_TAB ? (
              <Menu_Filter_LoTrinh />
            ) : 
            (
              ""
            )} */}
            <div className="absolute top-7 transform   right-8 flex items-center">
              <button
                className="w-16 text-color-title text-lg"
                onClick={() => {
                  setIsGridView(!isGridView);
                }}
              >
                {isGridView ? icons.listView : icons.gridView}
              </button>
            </div>
          </div>
        </div>
        <div className="w-full mt-14  ">
          {currentTabLoTrinh === TAT_CA_LO_TRINH_TAB ? (
            <TatCaLoTrinhPage isGridView={isGridView} />
          ) : (
            <LoTrinhPageCuaBan isGridView={isGridView} />
          )}
        </div>
      </div>
    );
  };
  return (
    <>
      <Tour
        onRequestClose={() => {
          let newUserTour = { ...userTour };
          if (currentTabLoTrinh === TAT_CA_LO_TRINH_TAB) {
            newUserTour.isShowLoTrinh = false;
          } else {
            newUserTour.isShowLoTrinhCuaBan = false;
          }
          localStorageServ.userTour.set(newUserTour);


          dispatch(setUserTour(newUserTour));
        }}
        steps={
          currentTabLoTrinh === TAT_CA_LO_TRINH_TAB
            ? stepTatCaLoTrinhConfig
            : stepLoTrinhCuaBanConfig
        }
        isOpen={
          currentTabLoTrinh === TAT_CA_LO_TRINH_TAB
            ? userTour?.isShowLoTrinh
            : userTour?.isShowLoTrinhCuaBan
        }
        className="rounded-lg p-8"
        rounded={5}
        accentColor={"#222260"}
        beforeClose={() => { }}
      />

      <div className="overflow-hidden w-full relative flex flex-col items-center ">
        <div className="w-full  overflow-hidden p-5 h-max-content  ">
          <div className="w-full  h-64 lg:h-96 ">
            <CarouselLoTrinh />
          </div>
        </div>
        {renderContent()}
        <MessengerCustomerChat
          pageId="231169113737422"
          appId="130543658347826"
        />
      </div>
    </>
  );
}