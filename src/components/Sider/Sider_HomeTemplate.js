import { useMediaQuery } from "react-responsive";
import React from "react";
import Sider_HomeTemplate_Destop from "./Sider_HomeTemplate_Destop";
// import Sider_HomeTemplate_Mobie from "./Sider_HomeTemplate_Mobie";
import Sider_HomeTemplate_Tablet from "./Sider_HomeTemplate_Tablet";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};



export default function Sider_HomeTemplate({
  collapsed,
  isOpenFlashSale,
}) {
  return (
    <>
      <Desktop>
        <Sider_HomeTemplate_Destop
          collapsed={collapsed}
          isOpenFlashSale={isOpenFlashSale}
        />
      </Desktop>
      <Tablet>
        <Sider_HomeTemplate_Tablet
          collapsed={collapsed}
          isOpenFlashSale={isOpenFlashSale}
        />
      </Tablet>

    </>
  );
}
