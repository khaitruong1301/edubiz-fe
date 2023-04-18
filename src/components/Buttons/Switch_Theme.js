import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DARK_MODE, LIGHT_MODE } from "../../constants/theme";
import { usePrefersDarkMode } from "../../hook/usePrefersDakmode";
import { useSafeLocalStorage } from "../../hook/useSafeLocalStorage";
import { setModeTheme } from "../../redux/reducer/themeReducer";
import localStorageServ from "../../services/locaStorage.service";
let dark = {
  wrapper_dark: {
    // position: "fixed",
    // bottom: "50px",
    // right: " 30px",
    backgroundColor: "#f7f7f7",
    boxShadow: "-1px 3px 8px -1px rgb(0 0 0 / 20%)",
    padding: " 8px",
    borderRadius: " 50%",
    zIndex: 3,
    cursor: "pointer",
  },
  svg: {
    fill: "transparent",
    stroke: " #3c3a3a",
    width: "24px",
    flexShrink: 0,
    transition: "0.5s",
  },
};
let light = {
  wrapper_light: {
    backgroundColor: "#21242d",
    // position: "fixed",
    // bottom: "50px",
    // right: " 30px",
    boxShadow: "-1px 3px 8px -1px rgb(0 0 0 / 20%)",
    padding: " 8px",
    borderRadius: " 50%",
    zIndex: 3,
    cursor: "pointer",
  },
  svg: {
    fill: " #ffce45",
    stroke: "#ffce45",
    transition: "0.5s",
    width: "24px",
    flexShrink: 0,
    transition: "0.5s",
  },
};

export default function Switch_Theme() {

  const root = window.document.documentElement;


  const theme = useSelector(state => state.theme.theme)
  const dispatch = useDispatch()
  const toggleDarkMode = () => {

    const nextTheme = theme === DARK_MODE ? LIGHT_MODE : DARK_MODE
    dispatch(setModeTheme(nextTheme))
    localStorageServ.modeTheme.set(nextTheme)
    if (nextTheme === DARK_MODE) {

      root.classList.add(DARK_MODE)
      root.classList.remove(LIGHT_MODE)
    } else {
      root.classList.add(LIGHT_MODE)
      root.classList.remove(DARK_MODE);
    }
  }
  return (
    <div
      onClick={toggleDarkMode}
      style={theme !== "dark" ? dark.wrapper_dark : light.wrapper_light}
      className="dark-light"
    >
      <svg
        style={theme !== "dark" ? dark.svg : light.svg}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
      </svg>
    </div>
  );
}
