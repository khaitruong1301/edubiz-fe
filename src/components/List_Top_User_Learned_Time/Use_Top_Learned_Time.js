import React from "react";
import User_Top_Ranking from "../List_Top_User/User_Top_Ranking";

export default function List_Top_User_Learned_Time({ listUser }) {
  const render_List_Top_User = () => {
    return listUser?.map((user, index) => {
      return <User_Top_Ranking user={user} index={index} key={index} />;
    });
  };
  return (
    <div className="w-full h-full  rounded-t-lg rounded-lg ">
      <div className=" py-1 rounded-lg hidden-scroll    h-full  ">
        {render_List_Top_User()}
      </div>
    </div>
  );
}
