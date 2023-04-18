import React, { useState } from "react";
import ThongTinChinh from "./ThongTinChinh";
import { useSelector } from "react-redux";
import ThongTinChiTiet from "./ThongTinChiTiet";
import HoanThanh from "./HoanThanh";
import StepSignup from "./StepSignup";
export default function ContainerSigupDesktop() {
  const { currentStep } = useSelector((state) => state.signUp);

  const renderConTentStep = () => {
    switch (currentStep) {
      case 0:
        return <ThongTinChinh />;
      case 1:
        return <ThongTinChiTiet />;

      case 2:
        return <HoanThanh />;
      default:
        break;
    }
  };
  return (
    <div className="w-full h-full  p-3 lg:p-5 space-y-10  flex-grow card_theme  border-none ">
      <StepSignup />
      {renderConTentStep()}
    </div>
  );
}
