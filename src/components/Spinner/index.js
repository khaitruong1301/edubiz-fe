import "./style.css";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";

export default function SpinnerComponent() {
  const { isLoading } = useSelector(state => state.spinner)
  return isLoading ? (
    <div className="page-overlay-wrapper">
      <div class="mask">
        <div class="loader"></div>
      </div>
    </div>
  ) : (
    <Fragment></Fragment>
  );
}


