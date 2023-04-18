import Lottie from "lottie-react";
import React from "react";
import calendar from "../../assets/lottie_json/recommended_01.json";
export default function Icon_Animation() {
  return (
    <div className="cursor-pointer relative w-16 h-16 ">
      <div className="absolute -top-3 -left-3">
        <Lottie loop={false} animationData={calendar} style={{ width: 100, height: 100 }} />
      </div>
    </div>
  );
}
