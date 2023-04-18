import React from "react";
import User_Top_Ranking from "../List_Top_User/User_Top_Ranking";
import User_Top_Week from "./User_Top_Week";
let data_user = [
  {
    name: "Đình Sang",

    title: "Coder siêu cấp",
    coin: 200,
  },
  {
    title: "Coder siêu cấp",
    name: "Khải Trương",

    coin: 200,
  },
  {
    title: "Bé code 2 tháng",
    name: "Quang Sĩ",
    coin: 200,
  },
  {
    title: "Bé code 2 tháng",
    name: "Quang Sĩ",
    coin: 200,
  },
  {
    title: "Bé code 2 tháng",
    name: "Quang Sĩ",
    coin: 200,
  },
];
export default function List_Top_User_Week({ listUser }) {
  const render_List_Top_User = () => {
    return listUser?.map((user, index) => {
      return <User_Top_Ranking user={user} index={index} key={index} />;
    });
  };
  return (
    <div className="w-full  rounded-t-lg rounded-lg">
      <div className=" p-2 flex flex-col-reverse ">
        {render_List_Top_User()}
      </div>
    </div>
  );
}
