import React, { useRef, useEffect } from "react";

export default function CertificateReport({ toggle, handleDownloadChungNhan, handlePrintBangDiem, setToggleReport }) {

    return (
        <>
            <div className={`certificateseries-item_viewall ${toggle ? 'show' : 'hide'}`}>
                <div
                    className='certificateseries-item_viewll--item'
                    onClick={() => {
                        handleDownloadChungNhan();
                        setToggleReport(false);
                    }}
                >
                    Xem chứng nhận
                </div>
                <div
                    className='certificateseries-item_viewll--item'
                    onClick={() => {
                        handlePrintBangDiem();
                        setToggleReport(false);
                    }}
                >
                    Xem bảng điểm
                </div>

            </div>
        </>
    )
}