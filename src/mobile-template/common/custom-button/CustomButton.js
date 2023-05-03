import React from "react";
import { Tooltip } from "antd";
import { checkDemoUser } from "../../../utils/HocDemoUtils";
import './CustomButton.css'

export default function CustomButton({ children, onClick, className }) {

    return checkDemoUser() ? (
        <Tooltip
            mouseEnterDelay={0}
            mouseLeaveDelay={0.3}
            trigger={["click", "hover"]}
            placement="right"
            animation="zoom"
            overlayClassName="  "
            color="white"
            title={
                <p className="text-blue-theme  p-1  text-center">
                    Bạn cần đăng kí lộ trình để sử dụng được tính năng này
                </p>
            }
        >
            <button
                style={{ backgroundColor: "rgb(106, 201, 119)" }}
                className="cutomlink-button text-white text-sm rounded-lg py-1 px-1.5 w-max shadow-lg btn-theme "
            >
                {children}
            </button>
        </Tooltip>
    ) : (
        <button
            onClick={(onClick)}
            style={{ backgroundColor: "rgb(106, 201, 119)" }}
            className={`cutomlink-button text-white text-sm rounded-lg py-1 px-1.5 w-max shadow-lg btn-theme ${className}`}
        >
            {children}
        </button>
    );
}