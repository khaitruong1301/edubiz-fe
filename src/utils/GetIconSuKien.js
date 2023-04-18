import Lottie from "lottie-react";
import { iconTichCuc, iconVatPham, iconXp } from "../assets/icons";
import coin_lottie from "../assets/lottie_json/18089-gold-coin.json";

export const getIconThongBao = (loai) => {
  switch (loai) {
    case "TICHCUC":
      return iconTichCuc;
    case "COIN":
      return (
        <Lottie
          loop={false}
          animationData={coin_lottie}
          style={{ width: 50, height: 50 }}
        />
      );
    case "KINHNGHIEM":
      return iconXp;
    case "ITEM":
      return <div className="text-blue-theme flex justify-center">{iconVatPham}</div>;

    default:
      return (
        <i
          className={"fa fa-check  text-sm flex-shrink-0 text-green-600"}
        ></i>
      );
  }
};
