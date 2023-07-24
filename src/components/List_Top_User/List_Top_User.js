import React from "react";
import User_Top_Ranking from "./User_Top_Ranking";
import "./UserTop.css";

export default function List_Top_UserTicCuc({ listUser, tab }) {
  const render_List_Top_User = () => {
    return listUser.map((user, index) => {
      return <User_Top_Ranking tab={tab} user={user} index={index} key={index} />;
    });
  };
  return (
    <div className="w-full h-full  rounded-t-lg rounded-lg ">
      <div className=" py-1 rounded-lg hidden-scroll  overflow-scroll h-full  ">
        {render_List_Top_User()}
      </div>
    </div>
  );
}
