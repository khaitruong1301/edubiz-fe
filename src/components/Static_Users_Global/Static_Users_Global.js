import Lottie from "lottie-react";
import React from "react";
import roket from "../../assets/lottie_json/69164-marketing-rocket.json";
export default function Static_Users_Global() {
  return (
    <div className="w-full flex space-x-2 relative">
      <div className="flex flex-col items-center space-x-2 rounded-lg card_theme w-22 h-22 justify-center py-1">
        <span className="font-medium">231</span>
        <p className="w-full text-center">Active Users </p>
      </div>
      <div className="flex flex-col items-center space-x-2 rounded-lg card_theme w-22 h-22 justify-center py-1">
        <span className="font-medium ">4121</span>
        <p className="w-full text-center">Total Users </p>
      </div>
      <div className="cursor-pointer absolute -top-5 -right-4 z-10">
        <Lottie animationData={roket} style={{ width: 150, height: 150 }} />
      </div>
    </div>
  );
}
