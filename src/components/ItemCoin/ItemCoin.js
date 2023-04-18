import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import coin_jump from "../../assets/lottie_json/coin_jump.json";
import { useSelector, useDispatch } from "react-redux";
import usePrevious from "../../HOC/usePrevious";
import ToolTipCoin from "../ToolTipCoin/ToolTipCoin";

export default function ItemCoin({ loop = true }) {
  const { coin } = useSelector((state) => state.authUser.userInfor);
  const [isShowEffect, setIsShowEffect] = useState(false);
  const prevAmountCoin = usePrevious(coin);

  const [fistRender, setFistRender] = useState(true);
  useEffect(() => {
    // console.log("yes render coin");
    // audioEl.play();
    setFistRender(false);
    if (!fistRender) {
      if (prevAmountCoin !== coin) {

        setIsShowEffect(true);
        setTimeout(() => {
          setIsShowEffect(false);
        }, 300);
      }
    }
  }, [coin]);

  return (
    <div
      className="flex items-center relative w-max h-max-content "
      data-tour="detail-coin"
    >
      {isShowEffect ? (
        <div className="absolute -left-8 -top-4 ">
          <Lottie
            loop={false}
            animationData={coin_jump}
            style={{ width: 120, height: 120 }}
          />
        </div>
      ) : (
        ""
      )}
      <ToolTipCoin loop={loop} />
      <span className="text-base lg:text-lg text-color-blue-white  transform -translate-x-2 font-medium ">
        {coin}
      </span>
    </div>
  );
}
