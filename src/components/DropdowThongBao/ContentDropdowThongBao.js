import { Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ThongBaoItem = ({ thongBao, key }) => {
  let cssText = thongBao.daXem ? "text-gray-500" : "text-gray-800";

  const renderThongBao = (noiDung) => {
    const objNoiDung = JSON.parse(noiDung);
    if (objNoiDung.SuKien == 'TIENTRINH') {
      return <Link to="/lo-trinh">Bạn đã được ghi danh vào lộ trình {objNoiDung.NoiDung}</Link>
    }
  }

  return (
    <div
      key={key}
      className="text-gray-500 space-y-5 items-center h-max-content "
    >
      <p className={" " + cssText}>
        {
          thongBao.loaiThongBao == 'HOCTAP' ? renderThongBao(thongBao.noiDung) : thongBao.noiDung
        }
      </p>
      <p className="">{thongBao.ngayThang}</p>
    </div>
  );
};

export default function ContentDropdowThongBao({ data }) {
  return (
    <Menu className="rounded-lg bg-transparent card_theme  shadow-lg">
      <div className="space-y-8 h-max-content card_theme p-5">
        {data?.map((thongBao, index) => {
          return <ThongBaoItem thongBao={thongBao} key={index} />;
        })}
      </div>
    </Menu>
  );
}
