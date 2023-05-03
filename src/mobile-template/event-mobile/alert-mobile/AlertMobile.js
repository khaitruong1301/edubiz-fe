import React, { useEffect, useState } from "react";
import { List } from "antd";
import httpServ from "../../../services/http.service";
import AlertMobileItem from './alert-mobile-item/AlertMobileItem'
import './AlertMobile.css'

function AlertMobile({ userId }) {
    const [allThongBao, setAllThongBao] = useState([]);

    useEffect(() => {
        httpServ
            .getAllThongBao(userId)
            .then((res) => {
                setAllThongBao(res.data.content)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className='alert-mobile'>
            <List
                itemLayout="vertical"
                size="large"
                className="p-0"
                pagination={{
                    pageSize: 7,
                    showSizeChanger: false,
                }}
                dataSource={allThongBao}
                renderItem={(item) => (
                    <AlertMobileItem typeThongBao={true} data={item} />
                )}
            />
        </div>
    )
}

export default AlertMobile;