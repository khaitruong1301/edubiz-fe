import React from 'react'
import { Steps } from "antd";
import { useMediaQuery } from "react-responsive";

import { useSelector } from "react-redux";
export default function StepSignup() {

    const { currentStep } = useSelector((state) => state.signUp);
    const Desktop = ({ children }) => {

        const isDesktop = useMediaQuery({ minWidth: 992 });
        return isDesktop ? children : null;
    };
    const Tablet = ({ children }) => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
        return isTablet ? children : null;
    };
    const Mobile = ({ children }) => {
        const isMobile = useMediaQuery({ maxWidth: 767 });
        return isMobile ? children : null;
    };
    const { Step } = Steps;

    return (
        <>
            <Desktop>
                <Steps className="px-5" current={currentStep}>
                    <Step title="Thông tin chính" />
                    <Step title="Thông tin chi tiết" />
                    <Step title="Hoàn thành" />
                </Steps>
            </Desktop>
            <isTablet>
            </isTablet>
            <Mobile>
                <Steps current={currentStep}>
                    <Step />
                    <Step />
                    <Step />

                </Steps>
            </Mobile>
        </>
    )
}
