import React from "react";
import { checkDemoUser } from "../../utils/HocDemoUtils";
import StaticDemo_Tablet from "./StaticDemo_Tablet";
import StaticUser_Tablet from "./StaticUser_Tablet";


function Static_PublicTablet({ loTrinhPublic, isBlackFridayDay = false }) {

  if (isBlackFridayDay) {
    return <StaticDemo_Tablet isBlackFridayDay={isBlackFridayDay} loTrinhPublic={loTrinhPublic} />
  }

  return checkDemoUser() ? <StaticDemo_Tablet loTrinhPublic={loTrinhPublic} /> : <StaticUser_Tablet loTrinhPublic={loTrinhPublic} />;
}

export default Static_PublicTablet = React.memo(Static_PublicTablet);
