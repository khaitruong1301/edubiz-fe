import { Tag } from "antd";

const getRandomColor = () => {
  let randomIndex = Math.floor(Math.random() * 7);
  let arrColors = [
    "magenta",
    "volcano",
    "orange",
    "gold",
    "lime",
    "green",
    "cyan",
    "blue",
    "geekblue",
  ];
  return arrColors[randomIndex];
};

export function GetTagQA(arr) {
  // console.log("yesss");
  // console.log("arr", arr);
  return arr.map((tag) => {
    return <Tag color={getRandomColor()}>{tag}</Tag>;
  });
}
