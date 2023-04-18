import { ConvertNameUser } from "./ConvertNameUser";
export const gerateDataSetChart = (arrData, canvas, userInfor) => {
  const ctx = canvas.getContext("2d");

  const gradient_bg_1 = ctx.createLinearGradient(0, 0, 0, 250);
  gradient_bg_1.addColorStop(0, "rgba(251, 128, 133,0.3)");
  gradient_bg_1.addColorStop(1, "rgba(251, 128, 133,0)");

  const arrColor = [
    gradient_bg_1,
    "rgb( 117, 95, 211,0.8)",
    "rgb( 70, 220, 216)",
    "rgb(106, 201, 119,0.9)",
    "rgb(253, 206, 0,0.8)",
  ];

  let userIndex = arrData.findIndex((item) => {
    return item?.hoTen === userInfor?.hoTen;
  });
  if (userIndex !== -1) {
    let temp = arrData[0];
    arrData[0] = arrData[userIndex];
    arrData[userIndex] = temp;
  }

  return arrData.map((dataUser, index) => {
    let newDataUser = { ...dataUser };
    let dataShow = [...newDataUser.lstSoPhut];

    let nameUser =
      dataUser?.hoTen === userInfor?.hoTen
        ? "Của bạn"
        : ConvertNameUser(dataUser?.hoTen);
    return {
      label: arrData.length === 1 ? "Tốc độ xem video (phút)" : nameUser,
      fill: "start",
      backgroundColor: index === 0 ? arrColor[index] : "transparent",
      borderColor: index === 0 ? "#FF6384" : arrColor[index],
      pointBackgroundColor: index === 0 ? "#FF6384" : arrColor[index],
      lineTension: 0.4,
      cubicInterpolationMode: "monotone",
      pointStyle: "circle",
      pointRadius: 0,
      pointHoverRadius: 6,
      borderWidth: 4,
      data: dataShow,
      fontColor: "#ffffff"
    };
  });
};
