import React, { memo } from "react";
import { useSelector } from "react-redux";
import backGrountTemplate from "../../assets/img/background.png";
import { DARK_MODE } from "../../constants/theme";

let Curved_Button = ({ collapsed }) => {
  const theme = useSelector(state => state.theme.theme)
  let css_bg_theme = {
  }
  if (theme === DARK_MODE) {
    css_bg_theme.background = `#222736`

  } else {
    css_bg_theme.background = `url(${backGrountTemplate})`

  }

  return (
    <div className="  w-16 h-16 flex justify-center z-10  items-center bg-over bg-fixed  rounded-full overflow-hidden relative">
      <div
        style={css_bg_theme}
        className="  w-16 h-8 top-0 left-0 flex bg-over bg-fixed border-b-0 rounded-t-full overflow-hidden border-1 border-none absolute z-20"
      ></div>
      <button
        style={{ transform: collapsed ? "rotate(0deg)" : "rotate(180deg)" }}
        className="card_theme_rounded_none card_theme_item rounded-4xl z-30 w-12 h-12 transition duration-150"
      >
        <i className="mt-2 text-color-title animate-bounce fa fa-angle-down "></i>
      </button>
    </div>
  );
};
export default Curved_Button = memo(Curved_Button);
