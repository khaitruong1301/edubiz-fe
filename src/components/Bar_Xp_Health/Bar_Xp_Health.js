import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import ToolTipHp from "../ToolTipHp/ToolTipHp";
import ToolTipXP from "../ToolTipXP/ToolTipXP";
import { useEffect } from "react";

export default function Bar_Xp_Health() {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };
  let { userInfor } = useSelector((state) => {
    return state.authUser;
  });
  const containerRef = useRef();
  return (
    <div
      ref={containerRef}
      className="h-full hidden lg:flex flex-col font-medium items-start text-color-navigate  justify-center "
    >
      <ToolTipHp
        userInfor={userInfor}
        width={windowWidth < 1135 ? "w-24" : "w-40"}
      />
      <ToolTipXP
        userInfor={userInfor}
        width={windowWidth < 1135 ? "w-24" : "w-40"}
      />
    </div>
  );
}
