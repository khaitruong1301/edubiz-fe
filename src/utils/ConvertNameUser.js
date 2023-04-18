export const ConvertNameUser = (string) => {
  let arrName = string.split(" ");
  if (arrName.length > 2) {
    arrName = [
      arrName[0],
      arrName[arrName.length - 2],
      arrName[arrName.length - 1],
    ];
  }
  return arrName.join(" ");
};
