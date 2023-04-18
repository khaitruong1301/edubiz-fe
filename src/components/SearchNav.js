import React from "react";
// import { Input, Space } from "antd";

export default function SearchNav() {
  return (
    // <Search
    //   placeholder=""
    //   allowClear
    //   onSearch={onSearch}
    //   style={{ width: 200 }}
    // />
    <div className="relative h-10 p-0 m-0 w-56 ">
      <i className="fa fa-search absolute left-3 top-1/2 transform -translate-y-1/2 z-10 "></i>
      <input
        className=" pl-8 absolute left-0 top-0 h-full w-full rounded-2xl outline-none border-2 grayscale"
        type="text"
        placeholder="Tìm kiếm khóa học"
      />
    </div>
  );
}
