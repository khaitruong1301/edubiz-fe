import { Tooltip } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import Item_Game from "../components/Item_Game/Item_Game";
import { getHinhAnh } from "./GetHinhanh";

export default function GetGameItem({ types, size }) {
  const { yourItems } = useSelector((state) => state.dashboard);

  const filterItem = yourItems.filter((item) => {
    return types.includes(item.giaTri);
  });

  let width = "w-" + size;
  let height = "h-" + size;
  return (
    <div className="w-max flex space-x-3 h-max-content items-center">
      {filterItem.map((item) => {
        return (
          <Tooltip
            mouseEnterDelay={0.1}
            mouseLeaveDelay={0.1}
            trigger={["click", "hover"]}
            placement="top"
            animation="zoom"
            overlayClassName=" w-max "
            overlayStyle={{ maxWidth: "900px" }}
            color="white"
            title={
              <div className="flex items-center space-x-2 w-max p-0 justify-center">
                <div
                  className="flex-shrink-0 w-max h-max-content
                  "
                >
                  <Item_Game item={item} canOpenDialog={false} />
                </div>

                <div className="font-medium text-base  w-64 space-y-3 text-gray-800">
                  <p>Công dụng: {item.tenVatPham}</p>
                  <div className="space-y-2">
                    <p className="font-normal">{item.moTa}</p>
                    <p className="font-normal text-gray-600">
                      Thời hạn sử dụng: {item.ngayHetHan}
                    </p>
                  </div>
                </div>
              </div>
            }
          >
            <LazyLoad once={true} >
              <img
                src={getHinhAnh(item.hinhAnh)}
                className={
                  "m-0 inline-block p-0 cursor-pointer  " + width + " " + height
                }
              />
            </LazyLoad>

          </Tooltip>
        );
      })}
    </div>
  );
}
