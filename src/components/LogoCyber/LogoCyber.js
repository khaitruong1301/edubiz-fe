import React from 'react'
import { useSelector } from "react-redux";
import logoLight from "../../assets/img/logo.png";
import logoDark from "../../assets/img/logoCyberDarkTheme.png";

import { DARK_MODE } from "../../constants/theme";
export default function LogoCyber() {
    const { theme } = useSelector((state) => state.theme);

    return (
        <img
            src={theme == DARK_MODE ? logoDark : logoLight}

            alt=""
            className="h-16 object-contain  inline-block p-2 rounded m-0"
        />
    )
}
