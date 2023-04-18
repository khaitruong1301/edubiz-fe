import React from "react";

export default function BtnHelp({ onShowHelp }) {
  return (
    <i
      className="fa fa-question-circle text-lg cursor-pointer text-color-blue-white "
      onClick={onShowHelp}
    ></i>
  );
}
