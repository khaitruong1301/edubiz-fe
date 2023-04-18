import React from "react";
import List_Card_Task_Deadline from "../List_Card_Task_Deadline/List_Card_Task_Deadline";

import Tab_Top_Users from "../Tab_Top_Users/Tab_Top_Users";

export default function Global_Dashboard() {
  return (
    <div className="w-full h-full overflow-auto hidden-scroll  space-y-5 relative mb-28 pb-2">
      <div data-tour="db-step-3">
        <List_Card_Task_Deadline />
      </div>
      <div data-tour="db-step-6">
        <Tab_Top_Users />
      </div>
    </div>
  );
}
