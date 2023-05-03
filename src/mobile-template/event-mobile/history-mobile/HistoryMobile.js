import React, { useEffect, useState } from "react";
import { List } from "antd";
import httpServ from "../../../services/http.service";
import HistoryMobileItem from './history-mobile-item/HistoryMobileItem'
import './HistoryMobile.css'

function HistoryMobile({ userId }) {
    const [lichSuHoatDong, setLichSuHoatDong] = useState([]);

    useEffect(() => {
        httpServ
            .getLichSuHoatDong(userId)
            .then((res) => {
                setLichSuHoatDong(res.data.content)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='history-mobile'>
            <List
                itemLayout="vertical"
                size="large"
                className="p-0"
                pagination={{
                    pageSize: 7,
                    showSizeChanger: false,
                }}
                dataSource={lichSuHoatDong}
                renderItem={(item) => (
                    <HistoryMobileItem typeThongBao={false} data={item} />
                )}
            />
        </div>
    )
}

export default HistoryMobile;