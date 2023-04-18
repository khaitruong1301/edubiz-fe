import React, { memo } from "react";
import { Progress } from "antd";
function CircleProgress({ strokeColor, trailColor, width = 132 }) {
  if (!trailColor) trailColor = "rgba(68, 66, 178, 0.1)";
  return (
    <Progress
      type="circle"
      percent={Math.floor(Math.random() * 25) + 60}
      strokeColor={strokeColor}
      trailColor={trailColor}
      width={width}
    />
  );
}

export default memo(CircleProgress);
