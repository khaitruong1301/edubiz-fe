import React from "react";
import { Tooltip } from "antd";
import { HashLink } from "react-router-hash-link";
import { checkDemoUser } from "../../../utils/HocDemoUtils";
import './CustomLink.css'

export default function CustomLink({ children, onClick, to, className }) {

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
              { children }
            </button>
        </Tooltip>
    ) : (
        <HashLink onClick={(onClick)} to={to}>
            <button
              style={{ backgroundColor: "rgb(106, 201, 119)" }}
              className={`cutomlink-button text-white text-sm rounded-lg py-1 px-1.5 w-max shadow-lg btn-theme ${className}`}
            >
              { children }
            </button>
        </HashLink>
    );
}