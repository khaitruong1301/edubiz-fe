import React from "react";
import { Pagination } from "antd";
import "./Pagination.css";
export default function PaginationBar() {
  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a className="text-blue-theme">Trang trước</a>;
    }
    if (type === "next") {
      return <a className="text-blue-theme">Trang sau</a>;
    }
    return originalElement;
  }
  return (
    <div className="h-16 w-full flex items-center justify-center">
      <Pagination
        total={50}
        pageSize={10}
      // itemRender={itemRender}
      />
    </div>
  );
}
