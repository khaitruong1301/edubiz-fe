import React, { useEffect, useState } from "react";
import ThaoLuanQ_A from "../ThaoLuanQ_A/ThaoLuanQ_A";
import { Select } from "antd";
import httpServ from "../../services/http.service";
import { disableSetLoading } from '../../constants/httpServContant'
const { Option } = Select;
export default function CardThaoLuanQ_A({ idLoTrinh }) {
  const [QandA_data, setQandA_data] = useState([]);
  useEffect(() => {
    httpServ
      .getQandA_KhoacHoc(idLoTrinh, disableSetLoading)
      .then((res) => {
        const QandA = res.data.content;
        setQandA_data(QandA);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  const [filterId, setFilterId] = useState("all");

  let dataFilterArr = filterId === "all"
    ? QandA_data
    : QandA_data.filter((item) => {
      return (item.id === filterId);
    });
  return (
    <div className="CardThaoLuanQ_A w-full space-y-5 p-3 overflow-hidden">
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Tìm câu hỏi"
        optionFilterProp="children"
        className="w-full rounded-lg"
        // onChange={onChange}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onSearch={onSearch}
        onSelect={(option, optionTAg) => {
          setFilterId(option);
        }}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Option value="all">Tất cả</Option>
        {QandA_data.map((item) => {
          return <Option value={item.id}>{item.tieuDe}</Option>;
        })}
      </Select>

      <p className="text-color-content">Tất cả câu hỏi ({QandA_data.length})</p>
      {dataFilterArr.map((item) => {
        return <ThaoLuanQ_A data={item}></ThaoLuanQ_A>;
      })}
    </div>
  );
}
