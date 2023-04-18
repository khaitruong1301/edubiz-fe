import dayjs from "dayjs";

export const getDayName = (days, idFilter) => {
  let daysDate = [];
  switch (idFilter) {
    case 0: {
      for (let i = 0; i < days; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let tempt1 = date.toISOString().split("T")[0];
        let tempt2 = new Date(tempt1);
        let dayName = tempt2.toLocaleString("vi-VN", { weekday: "short" });
        dayName = dayName.replace("Th", "Thứ");
        daysDate.push(dayName);
      }
      return daysDate;
    }
    case 1: {
      for (let i = 0; i < days; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let tempt1 = date.toISOString().split("T")[0];
        let tempt2 = new Date(tempt1);
        let tempt3 = dayjs(tempt2).format("DD/MM");
        daysDate.push(tempt3);
      }
      return daysDate.reverse();
    }
    case 2: {
      for (let i = 0; i < days; i++) {
        let date = new Date();
        date.setDate(date.getDate() - i);
        let tempt1 = date.toISOString().split("T")[0];
        let tempt2 = new Date(tempt1);
        let tempt3 = dayjs(tempt2).format("DD/MM");
        tempt3 = tempt3.split("/");
        tempt3 = tempt3[0] + "/" + tempt3[1];

        daysDate.push(tempt3);
      }
      return daysDate.reverse();
    }

    default:
      break;
  }
};
