import React, { useRef, useEffect } from "react";

export default function CertificateReport({ toggle, handleDownloadChungNhan }) {

    return (
        <div className={`certificateseries-item_viewall ${toggle ? 'show' : 'hide'}`}>
            <div 
                className='certificateseries-item_viewll--item' 
                onClick={() => handleDownloadChungNhan()}
            >
                Xem chứng nhận
            </div>
            <div 
                className='certificateseries-item_viewll--item'
            >
                Xem bảng điểm
            </div>
        </div>
    )
}