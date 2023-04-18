import React from "react";
import Lottie from "lottie-react";
import calendar from "../assets/lottie_json/5066-meeting-and-stuff.json";
export default function Testing() {
  // const options = {
  //   animationData: calendar,
  //   loop: true,
  //   autoplay: true,
  // };
  // style =;

  // const { View } = useLottie(options);

  return (
    <div className="cursor-pointer">
      <Lottie animationData={calendar} style={{ width: 200, height: 200 }} />
    </div>
  );
}
