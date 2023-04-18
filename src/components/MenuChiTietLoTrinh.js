import React from "react";
import { NavLink } from "react-router-dom";

const MenuChiTietLoTrinh = () => {
  return (
    <div>
      <div className=" flex space-x-0 text-gray-500 w-full ">
        <NavLink
          to="/chi-tiet-lo-trinh"
          activeClassName="text-color-title hover:text-gray-900 border-b-5 border-secondary"
          className="hover:text-current "
        >
          <button
            className="w-full text-lg font-medium hover:bg-gray-200 px-3 py-2
    "
          >
            BOOTCAMP
          </button>
        </NavLink>
        <NavLink
          to="/thao-luan-lo-trinh"
          activeClassName="text-color-title hover:text-gray-900 border-b-5 border-secondary"
          className="hover:text-current "
        >
          <button
            className="w-full text-lg font-medium hover:bg-gray-200 px-3 py-2
       "
          >
            Thảo luận
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default MenuChiTietLoTrinh;
