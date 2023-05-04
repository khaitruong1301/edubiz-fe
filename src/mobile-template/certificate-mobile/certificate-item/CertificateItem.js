import { useState } from "react";
import CertificateCourses from "./certificate-courses/CertificateCourses";
import CertificateSeriesItem from "./certificate-series/CertificateSeriesItem";
import './CertificateItem.css'

export default function CertificateItem({ loTrinh, userInfo }) {
    const [isShow, setIsShow] = useState(false);

    const onToggle = () => {
        setIsShow(!isShow);
    }

    return (
        <div className="certificateitem">
            <div className="certificateitem-series">
                <CertificateSeriesItem loTrinh={loTrinh} userInfo={userInfo} isShow={isShow} onToggle={onToggle}/>
            </div>
            <div className={`certificateitem-courses ${isShow ? 'show' : 'hide'}`}>
                {
                    loTrinh.danhSachKhoaHoc.map((khoaHoc, index) => {
                        return (
                            <CertificateCourses
                                khoaHoc={khoaHoc}
                                key={index}
                            ></CertificateCourses>
                        );
                    })
                }
            </div>
        </div>
    )
}