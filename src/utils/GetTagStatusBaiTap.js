import { Tag } from "antd";

export default function GetTagStatusBaiTap(item) {
  switch (item.trangThai) {
    case 0:
      return (
        <Tag className="w-20 text-center" color="blue">
          Chưa làm
        </Tag>
      );
    case 1:
      return (
        <Tag className="w-20 text-center" color="purple">
          Đang chấm
        </Tag>
      );
    case 2:
      return (
        <Tag className="w-20 text-center" color="volcano">
          Hết hạn
        </Tag>
      );
    case 3:
      return (
        <Tag className="w-20 text-center" color="green">
          <i className="fa fa-check mr-1"></i> Đã chấm
        </Tag>
      );

    default:
      break;
  }
}
