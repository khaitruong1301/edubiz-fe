import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import backGrountTemplate from "../../../assets/img/background.png";
import BtnGoogleCapcha from "../../../components/BtnGoogleCapcha/BtnGoogleCapcha";
import { DARK_MODE, LIGHT_MODE } from "../../../constants/theme";
import { setModeTheme } from "../../../redux/reducer/themeReducer";
import localStorageServ from "../../../services/locaStorage.service";
import ContainerSigupDesktop from "./ContainerSigupDesktop";

export default function SignUpDesktop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const root = window.document.documentElement;

    if (root.classList.remove(DARK_MODE)) {
      root.classList.remove(DARK_MODE);
      root.classList.remove(LIGHT_MODE);
    }
    localStorageServ.modeTheme.set(LIGHT_MODE);
    dispatch(setModeTheme(LIGHT_MODE));
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${backGrountTemplate})`,
      }}
      className="w-full  min-h-screen  card_theme overflow-y-auto bg-cover  flex-col  bg-fixed p-3 md:p-7 lg:p-10 flex  "
    >
      <BtnGoogleCapcha />

      <div className=" h-full w-full flex-grow flex flex-col relative overflow-y-auto overflow-x-hidden 2xl:container mx-auto">
        <div className="w-full flex-grow flex flex-col card_theme">
          <ContainerSigupDesktop />
        </div>
      </div>
    </div>
  );
}
